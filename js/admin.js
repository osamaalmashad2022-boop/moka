// ============================================================================
// MoKa Cafe — Admin Panel Logic (Mobile-First Native App Edition)
// Bilingual RTL | Firebase Realtime Sync | Touch Keypad | Instant Live Search
// ============================================================================

import { saveToCloud, fetchFromCloud } from "./firebase-sync.js";
import { getDefaultMenuForAdmin, DEFAULT_OFFER, DEFAULT_SETTINGS } from "./default-menu.js";

// ============================================================================
// Default Fallback Data (Imported from shared default-menu.js)
// ============================================================================
const DEFAULT_MENU = getDefaultMenuForAdmin();


// ============================================================================
// State
// ============================================================================
let menuData = [];
let offerData = {};
let settingsData = {};
let currentEditId = null;
let currentSection = "dashboard";
let selectedCategoryId = null;
let itemSearchQuery = "";
let categorySearchQuery = "";
let currentPinInput = "";

// Developer Secret Master Recovery PIN (Immutable Master PIN for developer maintenance)
const DEVELOPER_MASTER_PIN = "098000";

// ============================================================================
// Data Persistence (localStorage & Firestore)
// ============================================================================
function loadData() {
  try {
    const saved = localStorage.getItem("moka_menu_data");
    const parsed = saved ? JSON.parse(saved) : null;
    menuData = (Array.isArray(parsed) && parsed.length > 0) ? parsed : JSON.parse(JSON.stringify(DEFAULT_MENU));
  } catch { menuData = JSON.parse(JSON.stringify(DEFAULT_MENU)); }
  try {
    const saved = localStorage.getItem("moka_offer_data");
    offerData = saved ? JSON.parse(saved) : { ...DEFAULT_OFFER };
  } catch { offerData = { ...DEFAULT_OFFER }; }
  try {
    const saved = localStorage.getItem("moka_settings");
    const parsed = saved ? JSON.parse(saved) : {};
    settingsData = { ...DEFAULT_SETTINGS, ...parsed };
    if (!settingsData.adminPin || settingsData.adminPin.length !== 6) {
      settingsData.adminPin = "123456";
    }
    if (!settingsData.cloudinaryCloudName) settingsData.cloudinaryCloudName = "qrif7qmf";
    if (!settingsData.cloudinaryUploadPreset) settingsData.cloudinaryUploadPreset = "moka menu";
  } catch { settingsData = { ...DEFAULT_SETTINGS }; }

  if (!selectedCategoryId && menuData.length > 0) {
    selectedCategoryId = menuData[0].id;
  }
}

function updateCloudBadge(state = "saved") {
  const badge = document.getElementById("cloudStatusBadge");
  if (!badge) return;
  const textEl = badge.querySelector(".cloud-text");
  if (state === "saving") {
    if (textEl) textEl.textContent = "جاري الحفظ سحابياً...";
    badge.style.color = "#F59E0B";
    badge.style.borderColor = "rgba(245, 158, 11, 0.4)";
    badge.style.background = "rgba(245, 158, 11, 0.15)";
  } else if (state === "saved") {
    if (textEl) textEl.textContent = "متصل بالسحابة";
    badge.style.color = "#10B981";
    badge.style.borderColor = "rgba(16, 185, 129, 0.3)";
    badge.style.background = "rgba(16, 185, 129, 0.12)";
  } else if (state === "error") {
    if (textEl) textEl.textContent = "خطأ في المزامنة";
    badge.style.color = "#EF4444";
    badge.style.borderColor = "rgba(239, 68, 68, 0.3)";
    badge.style.background = "rgba(239, 68, 68, 0.15)";
  }
}

async function triggerCloudSync() {
  updateCloudBadge("saving");
  const res = await saveToCloud(menuData, offerData, settingsData);
  if (res.success) {
    updateCloudBadge("saved");
  } else {
    updateCloudBadge("error");
  }
}

async function loadCloudDataInitial() {
  try {
    updateCloudBadge("saving");
    const cloudData = await fetchFromCloud();
    if (cloudData) {
      if (cloudData.menu && Array.isArray(cloudData.menu) && cloudData.menu.length > 0) {
        menuData = cloudData.menu;
        localStorage.setItem("moka_menu_data", JSON.stringify(menuData));
      }
      if (cloudData.offer && Object.keys(cloudData.offer).length > 0) {
        offerData = cloudData.offer;
        localStorage.setItem("moka_offer_data", JSON.stringify(offerData));
      }
      if (cloudData.settings && Object.keys(cloudData.settings).length > 0) {
        settingsData = { ...DEFAULT_SETTINGS, ...cloudData.settings };
        if (!settingsData.adminPin || settingsData.adminPin.length !== 6) {
          settingsData.adminPin = "123456";
        }
        localStorage.setItem("moka_settings", JSON.stringify(settingsData));
        const activeBaseUrlEl = document.getElementById("qrActiveBaseUrl");
        if (activeBaseUrlEl) activeBaseUrlEl.textContent = getBaseMenuUrl();
        if (typeof updateLiveTentCard === "function") updateLiveTentCard();
      }
      if (!selectedCategoryId && menuData.length > 0) {
        selectedCategoryId = menuData[0].id;
      }
      renderDashboard();
      if (currentSection === "categories") renderCategories();
      if (currentSection === "items") renderItemsTable();
      if (currentSection === "offers") renderOfferEditor();
      if (currentSection === "settings") renderSettings();
      if (currentSection === "qr") {
        const activeBaseUrlEl = document.getElementById("qrActiveBaseUrl");
        if (activeBaseUrlEl) activeBaseUrlEl.textContent = getBaseMenuUrl();
        updateLiveTentCard();
      }
      updateCloudBadge("saved");
    } else {
      triggerCloudSync();
    }
  } catch (err) {
    console.warn("Could not load initial cloud data:", err);
    updateCloudBadge("error");
  }
}

function saveMenuData() {
  localStorage.setItem("moka_menu_data", JSON.stringify(menuData));
  localStorage.setItem("moka_last_edit", new Date().toISOString());
  triggerCloudSync();
}

function saveOfferData() {
  localStorage.setItem("moka_offer_data", JSON.stringify(offerData));
  localStorage.setItem("moka_last_edit", new Date().toISOString());
  triggerCloudSync();
}

function saveSettings() {
  localStorage.setItem("moka_settings", JSON.stringify(settingsData));
  localStorage.setItem("moka_last_edit", new Date().toISOString());
  triggerCloudSync();
}

function esc(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function generateId() {
  return "id_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ============================================================================
// Toast Notification
// ============================================================================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icons = { success: "✅", error: "❌", info: "ℹ️" };
  toast.innerHTML = `<span>${icons[type] || ""}</span> ${esc(message)}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ============================================================================
// Authentication & Touch Keypad
// ============================================================================
function updatePinDisplay() {
  const digits = document.querySelectorAll(".pin-digit");
  digits.forEach((digit, idx) => {
    if (idx < currentPinInput.length) {
      digit.value = "•";
      digit.classList.add("filled");
    } else {
      digit.value = "";
      digit.classList.remove("filled");
    }
  });
}

function attemptLogin() {
  const loginError = document.getElementById("loginError");
  const digits = document.querySelectorAll(".pin-digit");
  const correctPin = (settingsData && settingsData.adminPin && settingsData.adminPin.length === 6)
    ? settingsData.adminPin
    : "123456";

  if (currentPinInput === correctPin || currentPinInput === DEVELOPER_MASTER_PIN) {
    sessionStorage.setItem("moka_admin_auth", "true");
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("adminLayout").style.display = "flex";
    renderDashboard();
    renderCategories();
    renderCategoryPills();
    renderItemsTable();
    renderOfferEditor();
    renderSettings();
  } else {
    loginError.textContent = "رمز PIN غير صحيح. حاول مجدداً";
    digits.forEach(p => p.classList.add("error"));
    currentPinInput = "";
    setTimeout(() => {
      digits.forEach(p => {
        p.classList.remove("error");
        p.classList.remove("filled");
        p.value = "";
      });
    }, 600);
  }
}

function handleKeypadPress(key) {
  const loginError = document.getElementById("loginError");
  if (loginError) loginError.textContent = "";

  if (key === "clear") {
    currentPinInput = "";
    updatePinDisplay();
    return;
  }

  if (key === "backspace") {
    currentPinInput = currentPinInput.slice(0, -1);
    updatePinDisplay();
    return;
  }

  if (currentPinInput.length < 6) {
    currentPinInput += key;
    updatePinDisplay();
    if (currentPinInput.length === 6) {
      setTimeout(() => attemptLogin(), 100);
    }
  }
}

function performLogout() {
  sessionStorage.removeItem("moka_admin_auth");
  currentPinInput = "";
  updatePinDisplay();
  const loginError = document.getElementById("loginError");
  if (loginError) loginError.textContent = "";
  const loginScreen = document.getElementById("loginScreen");
  const adminLayout = document.getElementById("adminLayout");
  if (loginScreen) loginScreen.style.display = "flex";
  if (adminLayout) adminLayout.style.display = "none";
  document.getElementById("adminSidebar")?.classList.remove("open");
  document.getElementById("sidebarOverlay")?.classList.remove("active");
  showToast("تم تسجيل الخروج بنجاح", "info");
}

function initLogin() {
  // Check if already authenticated in session
  if (sessionStorage.getItem("moka_admin_auth") === "true") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("adminLayout").style.display = "flex";
  } else {
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("adminLayout").style.display = "none";
  }

  // Keypad touch listeners (Always initialized so they work after logout)
  const keypad = document.getElementById("pinKeypad");
  if (keypad) {
    keypad.querySelectorAll(".keypad-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        handleKeypadPress(key);
      });
    });
  }

  // Physical keyboard support for desktop
  document.addEventListener("keydown", (e) => {
    const loginScreen = document.getElementById("loginScreen");
    if (loginScreen && loginScreen.style.display !== "none") {
      if (/^[0-9]$/.test(e.key)) {
        handleKeypadPress(e.key);
      } else if (e.key === "Backspace") {
        handleKeypadPress("backspace");
      } else if (e.key === "Escape") {
        handleKeypadPress("clear");
      }
    }
  });

  // Global event listener for all logout buttons across sidebar, header, and settings
  document.addEventListener("click", (e) => {
    const logoutTarget = e.target.closest(".logout-btn, #logoutBtn, [data-action='logout']");
    if (logoutTarget) {
      e.preventDefault();
      performLogout();
    }
  });
}

// ============================================================================
// Navigation & Section Switching
// ============================================================================
function switchSection(section) {
  currentSection = section;
  document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(`section-${section}`);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.section === section);
  });

  document.querySelectorAll(".mob-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.section === section);
  });

  // Update header title
  const titles = {
    dashboard: "الرئيسية",
    categories: "الأقسام",
    items: "الأصناف",
    offers: "العروض الخاصة",
    qrcodes: "رموز QR والطاولات",
    settings: "الإعدادات",
    tools: "النسخ الاحتياطي"
  };
  const titleEl = document.getElementById("headerTitle");
  if (titleEl) titleEl.textContent = titles[section] || "لوحة التحكم";

  // Trigger section specific renders
  if (section === "dashboard") renderDashboard();
  if (section === "categories") renderCategories();
  if (section === "items") {
    renderCategoryPills();
    renderItemsTable();
  }
  if (section === "offers") renderOfferEditor();
  if (section === "qrcodes") renderQRCodesSection();
  if (section === "settings") renderSettings();

  // Scroll to top of content
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close sidebar on mobile
  document.getElementById("adminSidebar")?.classList.remove("open");
  document.getElementById("sidebarOverlay")?.classList.remove("active");
}

function initNavigation() {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => switchSection(item.dataset.section));
  });

  document.querySelectorAll(".mob-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => switchSection(btn.dataset.section));
  });

  // Jump handlers for stat cards
  document.querySelectorAll("[data-jump-section]").forEach(el => {
    el.addEventListener("click", () => switchSection(el.dataset.jumpSection));
  });

  // Mobile Hamburger Toggle
  const toggleBtn = document.getElementById("menuToggleBtn");
  const sidebar = document.getElementById("adminSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("active");
    });
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  // Dashboard Quick Action Buttons
  document.getElementById("quickAddItemBtn")?.addEventListener("click", () => {
    switchSection("items");
    setTimeout(() => {
      const catId = selectedCategoryId || menuData[0]?.id;
      if (catId) openItemModal(catId);
    }, 150);
  });

  document.getElementById("quickAddCatBtn")?.addEventListener("click", () => {
    switchSection("categories");
    setTimeout(() => openCategoryModal(), 150);
  });

  document.getElementById("quickQrBtn")?.addEventListener("click", () => {
    switchSection("qrcodes");
  });

  // Mobile Floating Action Button (FAB)
  const fab = document.getElementById("mobileFabBtn");
  if (fab) {
    fab.addEventListener("click", () => {
      if (currentSection === "categories") {
        openCategoryModal();
      } else {
        const catId = selectedCategoryId || menuData[0]?.id;
        if (!catId) {
          showToast("يرجى إضافة قسم أولاً", "error");
          openCategoryModal();
          return;
        }
        openItemModal(catId);
      }
    });
  }

  // Live Search Handlers
  initSearchHandlers();
}

function initSearchHandlers() {
  // Items Search
  const itemSearch = document.getElementById("itemSearchInput");
  const clearItemBtn = document.getElementById("clearItemSearch");
  if (itemSearch) {
    itemSearch.addEventListener("input", (e) => {
      itemSearchQuery = e.target.value.trim().toLowerCase();
      if (clearItemBtn) clearItemBtn.style.display = itemSearchQuery ? "flex" : "none";
      renderItemsTable();
    });
  }
  if (clearItemBtn) {
    clearItemBtn.addEventListener("click", () => {
      if (itemSearch) itemSearch.value = "";
      itemSearchQuery = "";
      clearItemBtn.style.display = "none";
      renderItemsTable();
    });
  }

  // Categories Search
  const catSearch = document.getElementById("categorySearchInput");
  const clearCatBtn = document.getElementById("clearCategorySearch");
  if (catSearch) {
    catSearch.addEventListener("input", (e) => {
      categorySearchQuery = e.target.value.trim().toLowerCase();
      if (clearCatBtn) clearCatBtn.style.display = categorySearchQuery ? "flex" : "none";
      renderCategories();
    });
  }
  if (clearCatBtn) {
    clearCatBtn.addEventListener("click", () => {
      if (catSearch) catSearch.value = "";
      categorySearchQuery = "";
      clearCatBtn.style.display = "none";
      renderCategories();
    });
  }
}

// ============================================================================
// Dashboard
// ============================================================================
function renderDashboard() {
  const totalCategories = menuData.length;
  let totalItems = 0;
  let bestsellers = 0;

  menuData.forEach(cat => {
    if (Array.isArray(cat.items)) {
      totalItems += cat.items.length;
      bestsellers += cat.items.filter(i => i.isBestseller).length;
    }
  });

  const statCats = document.getElementById("statCategories");
  const statIts = document.getElementById("statItems");
  const statBests = document.getElementById("statBestsellers");
  const statLast = document.getElementById("statLastEdit");

  if (statCats) statCats.textContent = totalCategories;
  if (statIts) statIts.textContent = totalItems;
  if (statBests) statBests.textContent = bestsellers;

  if (statLast) {
    const lastEdit = localStorage.getItem("moka_last_edit");
    if (lastEdit) {
      const d = new Date(lastEdit);
      statLast.textContent = d.toLocaleDateString("ar-EG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } else {
      statLast.textContent = "الآن";
    }
  }
}

// ============================================================================
// Categories CRUD & Cards
// ============================================================================
function renderCategories() {
  const wrap = document.getElementById("categoriesTableWrap");
  if (!wrap) return;

  const filtered = menuData.filter(c => {
    if (!categorySearchQuery) return true;
    return c.titleAr.toLowerCase().includes(categorySearchQuery) || c.titleEn.toLowerCase().includes(categorySearchQuery);
  });

  if (filtered.length === 0) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📁</div>
        <p>${categorySearchQuery ? 'لا توجد أقسام مطابقة للبحث' : 'لا توجد أقسام مضافة بعد'}</p>
        <button class="btn-primary" onclick="openCategoryModal()">إضافة قسم جديد</button>
      </div>
    `;
    return;
  }

  wrap.innerHTML = `
    <div class="categories-cards-grid">
      ${filtered.map(cat => `
        <div class="category-card" data-cat-id="${cat.id}">
          <div class="category-card-header">
            ${cat.heroImage
              ? `<img src="${esc(cat.heroImage)}" alt="${esc(cat.titleAr)}" class="category-card-thumb" onerror="this.outerHTML='<div class=\\'category-card-thumb-placeholder\\'>📁</div>'">`
              : `<div class="category-card-thumb-placeholder">📁</div>`}
            <div class="category-card-info">
              <h3>${esc(cat.titleAr)}</h3>
              <p>${esc(cat.titleEn)}</p>
            </div>
          </div>

          ${cat.descAr ? `<div class="item-card-desc">${esc(cat.descAr)}</div>` : ''}

          <div class="category-card-meta">
            <span class="cat-count-badge">🍽️ ${cat.items?.length || 0} صنف</span>
            ${cat.isDualPrice ? '<span class="table-badge">تسعير مزدوج (١٢/٢٤)</span>' : ''}
          </div>

          <div class="item-card-footer">
            <button class="card-touch-btn quick-add" data-add-item-to="${cat.id}" title="إضافة صنف جديد داخل هذا القسم">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>أضف صنف</span>
            </button>

            <div class="card-actions-group">
              <button class="card-touch-btn edit" data-cat-edit="${cat.id}" title="تعديل القسم">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="card-touch-btn delete" data-cat-delete="${cat.id}" title="حذف القسم">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  // Attach button events
  wrap.querySelectorAll("[data-cat-edit]").forEach(btn => {
    btn.addEventListener("click", () => openCategoryModal(btn.dataset.catEdit));
  });
  wrap.querySelectorAll("[data-cat-delete]").forEach(btn => {
    btn.addEventListener("click", () => deleteCategory(btn.dataset.catDelete));
  });
  wrap.querySelectorAll("[data-add-item-to]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedCategoryId = btn.dataset.addItemTo;
      openItemModal(btn.dataset.addItemTo);
    });
  });
}

function openCategoryModal(catId = null) {
  currentEditId = catId;
  const cat = catId ? menuData.find(c => c.id === catId) : null;

  document.getElementById("modalTitle").textContent = cat ? "تعديل القسم" : "إضافة قسم جديد";
  document.getElementById("modalBody").innerHTML = `
    <div class="form-row">
      <div class="form-group"><label class="form-label">الاسم (عربي) *</label><input class="form-input" id="catTitleAr" value="${esc(cat?.titleAr || "")}" placeholder="مثال: القهوة والمشروبات"></div>
      <div class="form-group"><label class="form-label">الاسم (إنجليزي) *</label><input class="form-input" id="catTitleEn" value="${esc(cat?.titleEn || "")}" placeholder="e.g. Specialty Coffee"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">الوصف (عربي)</label><input class="form-input" id="catDescAr" value="${esc(cat?.descAr || "")}" placeholder="وصف قصير للقسم"></div>
      <div class="form-group"><label class="form-label">الوصف (إنجليزي)</label><input class="form-input" id="catDescEn" value="${esc(cat?.descEn || "")}" placeholder="Short description"></div>
    </div>
    <div class="form-group">
      <label class="form-label">صورة القسم (اختياري)</label>
      <input class="form-input" id="catHeroImage" value="${esc(cat?.heroImage || "")}" placeholder="رابط الصورة أو اختر من جهازك">
      <div class="image-upload-area" id="catImageUpload" style="margin-top: 8px;">
        <div class="upload-icon">📷</div>
        <div class="upload-text">اضغط لاختيار صورة من هاتفك أو التقاطها بالكاميرا</div>
        <div class="upload-hint">يتم ضغطها وتجهيزها للعرض فوراً</div>
        <input type="file" accept="image/*" id="catImageFile">
      </div>
      <div class="upload-progress" id="catUploadProgress"><div class="progress-bar-track"><div class="progress-bar-fill" id="catProgressFill"></div></div></div>
      <div id="catImagePreviewContainer">
        ${cat?.heroImage ? `
          <div class="current-image-preview">
            <img src="${esc(cat.heroImage)}" alt="Category Image" id="catPreviewImgEl">
            <span class="img-name">${esc(cat.heroImage.slice(0, 35))}...</span>
            <button type="button" class="btn-remove-img" id="removeCatImgBtn" title="حذف الصورة الحالية">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>حذف الصورة</span>
            </button>
          </div>` : ''}
      </div>
    </div>
    <div class="form-check-row">
      <input type="checkbox" class="form-checkbox" id="catIsDualPrice" ${cat?.isDualPrice ? 'checked' : ''}>
      <label class="form-check-label" for="catIsDualPrice">تسعير مزدوج (مثل الميني بان كيك — ١٢ قطعة / ٢٤ قطعة)</label>
    </div>
  `;

  const attachCatRemoveBtn = () => {
    document.getElementById("removeCatImgBtn")?.addEventListener("click", () => {
      const heroInput = document.getElementById("catHeroImage");
      if (heroInput) heroInput.value = "";
      const fileInput = document.getElementById("catImageFile");
      if (fileInput) fileInput.value = "";
      const previewContainer = document.getElementById("catImagePreviewContainer");
      if (previewContainer) previewContainer.innerHTML = "";
      showToast("تم إزالة صورة القسم");
    });
  };
  attachCatRemoveBtn();

  document.getElementById("catImageFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file, "catHeroImage", "catUploadProgress", "catProgressFill", "catImagePreviewContainer", attachCatRemoveBtn);
  });

  showModal(() => saveCategory());
}

function saveCategory() {
  const titleAr = document.getElementById("catTitleAr").value.trim();
  const titleEn = document.getElementById("catTitleEn").value.trim();
  if (!titleAr || !titleEn) { showToast("يرجى إدخال الاسم بالعربي والإنجليزي", "error"); return; }

  const data = {
    titleAr, titleEn,
    descAr: document.getElementById("catDescAr").value.trim(),
    descEn: document.getElementById("catDescEn").value.trim(),
    heroImage: document.getElementById("catHeroImage").value.trim(),
    isDualPrice: document.getElementById("catIsDualPrice").checked
  };

  if (currentEditId) {
    const cat = menuData.find(c => c.id === currentEditId);
    if (cat) Object.assign(cat, data);
  } else {
    const newId = generateId();
    menuData.push({ id: newId, ...data, icon: "custom", items: [] });
    selectedCategoryId = newId;
  }

  saveMenuData();
  hideModal();
  renderCategories();
  renderCategoryPills();
  showToast(currentEditId ? "تم تحديث القسم بنجاح" : "تم إضافة القسم بنجاح");
}

function deleteCategory(catId) {
  const cat = menuData.find(c => c.id === catId);
  if (!cat) return;
  if (!confirm(`هل أنت متأكد من حذف القسم "${cat.titleAr}"؟\nسيتم حذف جميع الأصناف (${cat.items?.length || 0}) بداخله.`)) return;
  menuData = menuData.filter(c => c.id !== catId);
  if (selectedCategoryId === catId) {
    selectedCategoryId = menuData[0]?.id || null;
  }
  saveMenuData();
  renderCategories();
  renderCategoryPills();
  renderItemsTable();
  showToast("تم حذف القسم بنجاح");
}

// ============================================================================
// Items CRUD & Swipeable Category Pills
// ============================================================================
function renderCategoryPills() {
  const container = document.getElementById("categoryPillsWrap");
  if (!container) return;

  if (menuData.length === 0) {
    container.innerHTML = "";
    return;
  }

  if (!selectedCategoryId || !menuData.some(c => c.id === selectedCategoryId)) {
    selectedCategoryId = menuData[0]?.id;
  }

  container.innerHTML = menuData.map(cat => `
    <button type="button" class="category-pill ${cat.id === selectedCategoryId ? 'active' : ''}" data-cat-id="${cat.id}">
      <span>${esc(cat.titleAr)}</span>
      <span class="cat-pill-count">${cat.items?.length || 0}</span>
    </button>
  `).join("");

  container.querySelectorAll(".category-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      selectedCategoryId = pill.dataset.catId;
      container.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      pill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      renderItemsTable();
    });
  });

  // Sync with hidden select dropdown
  const filter = document.getElementById("itemCategoryFilter");
  if (filter) {
    filter.innerHTML = menuData.map(c => `<option value="${c.id}" ${c.id === selectedCategoryId ? 'selected' : ''}>${esc(c.titleAr)}</option>`).join("");
  }
}

function renderItemsTable() {
  const wrap = document.getElementById("itemsTableWrap");
  if (!wrap) return;

  let itemsToRender = [];

  if (itemSearchQuery) {
    // Search across ALL categories
    menuData.forEach(cat => {
      if (Array.isArray(cat.items)) {
        cat.items.forEach(item => {
          const matchAr = item.nameAr.toLowerCase().includes(itemSearchQuery) || (item.descAr && item.descAr.toLowerCase().includes(itemSearchQuery));
          const matchEn = item.nameEn.toLowerCase().includes(itemSearchQuery) || (item.descEn && item.descEn.toLowerCase().includes(itemSearchQuery));
          const matchPrice = item.price && item.price.toString().includes(itemSearchQuery);
          if (matchAr || matchEn || matchPrice) {
            itemsToRender.push({ ...item, categoryId: cat.id, categoryTitleAr: cat.titleAr, isDualPrice: cat.isDualPrice });
          }
        });
      }
    });
  } else {
    // Render active category items
    const activeCat = menuData.find(c => c.id === selectedCategoryId);
    if (activeCat && Array.isArray(activeCat.items)) {
      itemsToRender = activeCat.items.map(i => ({ ...i, categoryId: activeCat.id, categoryTitleAr: activeCat.titleAr, isDualPrice: activeCat.isDualPrice }));
    }
  }

  if (itemsToRender.length === 0) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🍽️</div>
        <p>${itemSearchQuery ? 'لا توجد أصناف تطابق بحثك' : 'لا توجد أصناف في هذا القسم بعد'}</p>
        <button class="btn-primary" id="emptyAddBtn">إضافة صنف جديد</button>
      </div>
    `;
    const emptyAddBtn = document.getElementById("emptyAddBtn");
    if (emptyAddBtn) {
      emptyAddBtn.addEventListener("click", () => {
        const catId = selectedCategoryId || menuData[0]?.id;
        if (catId) openItemModal(catId);
      });
    }
    return;
  }

  const typeIcons = { coffee: "☕ قهوة", hot: "🔥 ساخن", cold: "🧊 بارد", desserts: "🧇 حلويات" };

  wrap.innerHTML = `
    <div class="items-cards-grid">
      ${itemsToRender.map(item => `
        <div class="item-card" data-item-id="${item.id}" data-cat-id="${item.categoryId}">
          <div class="item-card-top">
            <div class="item-card-title-wrap">
              <div class="item-card-name-ar">${esc(item.nameAr)}</div>
              <div class="item-card-name-en">${esc(item.nameEn)} ${itemSearchQuery ? `• <span style="color:var(--accent-copper);">(${esc(item.categoryTitleAr)})</span>` : ''}</div>
            </div>
            <button class="bestseller-toggle-btn ${item.isBestseller ? 'active' : ''}" data-toggle-bestseller="${item.id}" data-cat="${item.categoryId}" title="تبديل شارة الأكثر طلباً">
              ⭐ ${item.isBestseller ? 'الأكثر طلباً' : 'تمييز'}
            </button>
          </div>

          <div class="item-card-badges">
            <span class="table-badge type-${item.type || 'coffee'}">${typeIcons[item.type] || item.type || '—'}</span>
            ${item.badgeAr ? `<span class="table-badge">${esc(item.badgeAr)}</span>` : ''}
          </div>

          ${item.descAr ? `<div class="item-card-desc">${esc(item.descAr)}</div>` : ''}

          <div class="item-card-footer">
            <div class="item-card-prices">
              ${item.isDualPrice
                ? `<span class="price-chip dual">١٢ ق: ${item.price12 || 0} ج.م</span><span class="price-chip dual">٢٤ ق: ${item.price24 || 0} ج.م</span>`
                : `<span class="price-chip">${item.price || 0} ج.م</span>`}
            </div>

            <div class="card-actions-group">
              <button class="card-touch-btn edit" data-item-edit="${item.id}" data-cat="${item.categoryId}" title="تعديل الصنف">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="card-touch-btn delete" data-item-delete="${item.id}" data-cat="${item.categoryId}" title="حذف الصنف">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  // Attach card event listeners
  wrap.querySelectorAll("[data-item-edit]").forEach(btn => {
    btn.addEventListener("click", () => openItemModal(btn.dataset.cat, btn.dataset.itemEdit));
  });

  wrap.querySelectorAll("[data-item-delete]").forEach(btn => {
    btn.addEventListener("click", () => deleteItem(btn.dataset.cat, btn.dataset.itemDelete));
  });

  wrap.querySelectorAll("[data-toggle-bestseller]").forEach(btn => {
    btn.addEventListener("click", () => toggleBestseller(btn.dataset.cat, btn.dataset.toggleBestseller));
  });
}

function toggleBestseller(catId, itemId) {
  const cat = menuData.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;

  item.isBestseller = !item.isBestseller;
  saveMenuData();
  renderItemsTable();
  showToast(item.isBestseller ? `تم تمييز "${item.nameAr}" كـ الأكثر طلباً ⭐` : `تم إلغاء تمييز "${item.nameAr}"`);
}

function openItemModal(catId, itemId = null) {
  const cat = menuData.find(c => c.id === catId);
  if (!cat) return;
  const item = itemId ? cat.items.find(i => i.id === itemId) : null;
  currentEditId = itemId;
  const isDual = cat.isDualPrice;

  document.getElementById("modalTitle").textContent = item ? "تعديل الصنف" : `إضافة صنف إلى "${cat.titleAr}"`;
  document.getElementById("modalBody").innerHTML = `
    <input type="hidden" id="itemCatId" value="${catId}">
    <div class="form-row">
      <div class="form-group"><label class="form-label">الاسم (عربي) *</label><input class="form-input" id="itemNameAr" value="${esc(item?.nameAr || "")}" placeholder="مثال: سبانش لاتيه"></div>
      <div class="form-group"><label class="form-label">الاسم (إنجليزي) *</label><input class="form-input" id="itemNameEn" value="${esc(item?.nameEn || "")}" placeholder="e.g. Spanish Latte"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">الوصف (عربي)</label><input class="form-input" id="itemDescAr" value="${esc(item?.descAr || "")}" placeholder="مكونات أو تفاصيل الصنف"></div>
      <div class="form-group"><label class="form-label">الوصف (إنجليزي)</label><input class="form-input" id="itemDescEn" value="${esc(item?.descEn || "")}" placeholder="Ingredients / details"></div>
    </div>
    ${isDual ? `
      <div class="form-row">
        <div class="form-group"><label class="form-label">سعر ١٢ قطعة (ج.م) *</label><input type="number" class="form-input" id="itemPrice12" value="${item?.price12 || ""}" placeholder="مثال: 100"></div>
        <div class="form-group"><label class="form-label">سعر ٢٤ قطعة (ج.م) *</label><input type="number" class="form-input" id="itemPrice24" value="${item?.price24 || ""}" placeholder="مثال: 180"></div>
      </div>
    ` : `
      <div class="form-group"><label class="form-label">السعر (ج.م) *</label><input type="number" class="form-input" id="itemPrice" value="${item?.price || ""}" placeholder="مثال: 85"></div>
    `}
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">نوع المشروب / الصنف</label>
        <select class="form-select-input" id="itemType">
          <option value="coffee" ${item?.type === 'coffee' ? 'selected' : ''}>☕ قهوة</option>
          <option value="hot" ${item?.type === 'hot' ? 'selected' : ''}>🔥 ساخن</option>
          <option value="cold" ${item?.type === 'cold' ? 'selected' : ''}>🧊 بارد ومثلج</option>
          <option value="desserts" ${item?.type === 'desserts' ? 'selected' : ''}>🧇 حلويات وكيك</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">الشارة الترويجية (عربي)</label>
        <input class="form-input" id="itemBadgeAr" value="${esc(item?.badgeAr || "")}" placeholder="مثال: مميز / توقيع موكا">
      </div>
    </div>
    <div class="form-group"><label class="form-label">الشارة (إنجليزي)</label><input class="form-input" id="itemBadgeEn" value="${esc(item?.badgeEn || "")}" placeholder="e.g. Signature / Fresh"></div>
    <div class="form-check-row">
      <input type="checkbox" class="form-checkbox" id="itemBestseller" ${item?.isBestseller ? 'checked' : ''}>
      <label class="form-check-label" for="itemBestseller">⭐ تمييز كـ "الأكثر طلباً" (يظهر في فلتر الأكثر طلباً بالمنيو)</label>
    </div>
  `;

  showModal(() => saveItem());
}

function saveItem() {
  const catId = document.getElementById("itemCatId").value;
  const cat = menuData.find(c => c.id === catId);
  if (!cat) return;

  const nameAr = document.getElementById("itemNameAr").value.trim();
  const nameEn = document.getElementById("itemNameEn").value.trim();
  if (!nameAr || !nameEn) { showToast("يرجى إدخال الاسم بالعربي والإنجليزي", "error"); return; }

  const isDual = cat.isDualPrice;
  const data = {
    nameAr, nameEn,
    descAr: document.getElementById("itemDescAr").value.trim(),
    descEn: document.getElementById("itemDescEn").value.trim(),
    type: document.getElementById("itemType").value,
    badgeAr: document.getElementById("itemBadgeAr").value.trim(),
    badgeEn: document.getElementById("itemBadgeEn").value.trim(),
    isBestseller: document.getElementById("itemBestseller").checked
  };

  if (isDual) {
    data.price12 = parseInt(document.getElementById("itemPrice12").value) || 0;
    data.price24 = parseInt(document.getElementById("itemPrice24").value) || 0;
    if (!data.price12 && !data.price24) { showToast("يرجى إدخال سعر واحد على الأقل", "error"); return; }
  } else {
    data.price = parseInt(document.getElementById("itemPrice").value) || 0;
    if (!data.price) { showToast("يرجى إدخال السعر", "error"); return; }
  }

  if (!data.badgeAr) delete data.badgeAr;
  if (!data.badgeEn) delete data.badgeEn;

  if (currentEditId) {
    const item = cat.items.find(i => i.id === currentEditId);
    if (item) Object.assign(item, data);
  } else {
    cat.items.push({ id: generateId(), ...data });
  }

  saveMenuData();
  hideModal();
  renderCategoryPills();
  renderItemsTable();
  showToast(currentEditId ? "تم تحديث الصنف بنجاح" : "تم إضافة الصنف بنجاح");
}

function deleteItem(catId, itemId) {
  const cat = menuData.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;
  if (!confirm(`هل أنت متأكد من حذف "${item.nameAr}"؟`)) return;
  cat.items = cat.items.filter(i => i.id !== itemId);
  saveMenuData();
  renderCategoryPills();
  renderItemsTable();
  showToast("تم حذف الصنف بنجاح");
}

// ============================================================================
// Special Offer Editor
// ============================================================================
function renderOfferEditor() {
  const wrap = document.getElementById("offerEditorCard");
  if (!wrap) return;

  const currentImg = offerData.image || "assets/images/special_offers.jpg";
  const isDefaultImg = !offerData.image || offerData.image === "assets/images/special_offers.jpg";

  wrap.innerHTML = `
    <div class="offer-preview">
      <img src="${esc(currentImg)}" alt="Offer" class="offer-preview-img" id="offerPreviewImg">
      <div class="offer-preview-info">
        <h4>${esc(offerData.titleAr)}</h4>
        <p>${esc(offerData.descAr)}</p>
        <div style="margin-top: 8px;">
          <button type="button" class="btn-remove-img" id="removeOfferImgBtn" title="حذف صورة العرض وإعادة التعيين">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            <span>حذف الصورة</span>
          </button>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">عنوان العرض (عربي)</label><input class="form-input" id="offerTitleAr" value="${esc(offerData.titleAr || "")}"></div>
      <div class="form-group"><label class="form-label">عنوان العرض (إنجليزي)</label><input class="form-input" id="offerTitleEn" value="${esc(offerData.titleEn || "")}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">الوصف (عربي)</label><textarea class="form-textarea" id="offerDescAr">${esc(offerData.descAr || "")}</textarea></div>
      <div class="form-group"><label class="form-label">الوصف (إنجليزي)</label><textarea class="form-textarea" id="offerDescEn">${esc(offerData.descEn || "")}</textarea></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">السعر الحالي (عربي)</label><input class="form-input" id="offerPriceAr" value="${esc(offerData.priceAr || "")}"></div>
      <div class="form-group"><label class="form-label">السعر الحالي (إنجليزي)</label><input class="form-input" id="offerPriceEn" value="${esc(offerData.priceEn || "")}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">السعر الأصلي (عربي)</label><input class="form-input" id="offerOrigAr" value="${esc(offerData.originalAr || "")}"></div>
      <div class="form-group"><label class="form-label">السعر الأصلي (إنجليزي)</label><input class="form-input" id="offerOrigEn" value="${esc(offerData.originalEn || "")}"></div>
    </div>
    <div class="form-group">
      <label class="form-label">صورة العرض</label>
      <input class="form-input" id="offerImage" value="${esc(offerData.image || "")}" placeholder="رابط الصورة أو اختر من جهازك">
      <div class="image-upload-area" id="offerImageUpload" style="margin-top: 8px;">
        <div class="upload-icon">📷</div>
        <div class="upload-text">اضغط لاختيار صورة من هاتفك أو التقاطها بالكاميرا</div>
        <div class="upload-hint">يتم ضغطها وتجهيزها للعرض فوراً</div>
        <input type="file" accept="image/*" id="offerImageFile">
      </div>
      <div class="upload-progress" id="offerUploadProgress"><div class="progress-bar-track"><div class="progress-bar-fill" id="offerProgressFill"></div></div></div>
    </div>
    <button class="btn-primary" id="saveOfferBtn" style="align-self:flex-start;padding:12px 32px;">حفظ التعديلات</button>
  `;

  document.getElementById("removeOfferImgBtn")?.addEventListener("click", () => {
    const offerImgInput = document.getElementById("offerImage");
    if (offerImgInput) offerImgInput.value = "";
    const fileInput = document.getElementById("offerImageFile");
    if (fileInput) fileInput.value = "";
    const previewEl = document.getElementById("offerPreviewImg");
    if (previewEl) previewEl.src = "assets/images/special_offers.jpg";
    offerData.image = "";
    saveOfferData();
    showToast("تم حذف صورة العرض");
  });

  document.getElementById("offerImageFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file, "offerImage", "offerUploadProgress", "offerProgressFill");
  });

  document.getElementById("saveOfferBtn").addEventListener("click", () => {
    offerData.titleAr = document.getElementById("offerTitleAr").value.trim();
    offerData.titleEn = document.getElementById("offerTitleEn").value.trim();
    offerData.descAr = document.getElementById("offerDescAr").value.trim();
    offerData.descEn = document.getElementById("offerDescEn").value.trim();
    offerData.priceAr = document.getElementById("offerPriceAr").value.trim();
    offerData.priceEn = document.getElementById("offerPriceEn").value.trim();
    offerData.originalAr = document.getElementById("offerOrigAr").value.trim();
    offerData.originalEn = document.getElementById("offerOrigEn").value.trim();
    offerData.image = document.getElementById("offerImage").value.trim();
    saveOfferData();
    showToast("تم تحديث العرض الخاص بنجاح");
    renderOfferEditor();
  });
}

// ============================================================================
// Settings
// ============================================================================
function renderSettings() {
  const wrap = document.getElementById("settingsGrid");
  if (!wrap) return;

  wrap.innerHTML = `
    <!-- Contact Info -->
    <div class="settings-card">
      <div class="settings-card-header">
        <span class="settings-icon">📞</span>
        <h3>معلومات التواصل والطلبات</h3>
      </div>
      <div class="settings-card-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">رقم الواتساب (مع كود الدولة)</label><input class="form-input" id="setWhatsapp" value="${esc(settingsData.whatsappNumber || "")}" placeholder="مثال: 201000000000"></div>
          <div class="form-group"><label class="form-label">رقم الهاتف للاتصال</label><input class="form-input" id="setPhone" value="${esc(settingsData.phoneNumber || "")}" placeholder="مثال: +201000000000"></div>
        </div>
        <div class="form-group"><label class="form-label">رابط إنستغرام</label><input class="form-input" id="setInstagram" value="${esc(settingsData.instagramUrl || "")}" placeholder="https://instagram.com/mokacafe"></div>
        <button class="btn-primary" id="saveContactSettings" style="align-self:flex-start;">حفظ معلومات التواصل</button>
      </div>
    </div>

    <!-- Security (PIN) -->
    <div class="settings-card">
      <div class="settings-card-header">
        <span class="settings-icon">🔒</span>
        <h3>الأمان ورمز الدخول (PIN)</h3>
      </div>
      <div class="settings-card-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">رمز PIN الجديد (٦ أرقام)</label><input type="password" maxlength="6" class="form-input" id="setNewPin" placeholder="مثال: 123456" inputmode="numeric"></div>
          <div class="form-group"><label class="form-label">تأكيد رمز PIN</label><input type="password" maxlength="6" class="form-input" id="setConfirmPin" placeholder="أعد كتابة الرمز (٦ أرقام)" inputmode="numeric"></div>
        </div>
        <button class="btn-primary" id="savePinSettings" style="align-self:flex-start;">تغيير رمز الدخول</button>
      </div>
    </div>

    <!-- Session Management -->
    <div class="settings-card">
      <div class="settings-card-header">
        <span class="settings-icon">🚪</span>
        <h3>تسجيل الخروج</h3>
      </div>
      <div class="settings-card-body">
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:var(--space-sm);">إنهاء الجلسة الحالية وقفل لوحة التحكم برمز PIN فوراً.</p>
        <button class="btn-secondary logout-btn" data-action="logout" style="align-self:flex-start;color:var(--accent-red);border-color:rgba(239,68,68,0.3);display:inline-flex;align-items:center;gap:8px;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          تسجيل الخروج الآن
        </button>
      </div>
    </div>

    <!-- Cloudinary -->
    <div class="settings-card">
      <div class="settings-card-header">
        <span class="settings-icon">☁️</span>
        <h3>إعدادات رفع الصور السحابية (Cloudinary)</h3>
      </div>
      <div class="settings-card-body">
        <p style="font-size:0.84rem;color:var(--text-muted);line-height:1.5;">تتيح خدمة Cloudinary رفع صور المنيو والأقسام من الهاتف إلى السحابة فوراً مع ضغط وتحسين السرعة مجاناً.</p>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Cloud Name</label><input class="form-input" id="setCloudName" value="${esc(settingsData.cloudinaryCloudName || "")}" placeholder="e.g. qrif7qmf"></div>
          <div class="form-group"><label class="form-label">Upload Preset</label><input class="form-input" id="setUploadPreset" value="${esc(settingsData.cloudinaryUploadPreset || "")}" placeholder="e.g. moka menu"></div>
        </div>
        <button class="btn-primary" id="saveCloudinarySettings" style="align-self:flex-start;">حفظ إعدادات Cloudinary</button>
      </div>
    </div>
  `;

  document.getElementById("saveContactSettings").addEventListener("click", () => {
    settingsData.whatsappNumber = document.getElementById("setWhatsapp").value.trim();
    settingsData.phoneNumber = document.getElementById("setPhone").value.trim();
    settingsData.instagramUrl = document.getElementById("setInstagram").value.trim();
    settingsData.whatsappUrl = `https://wa.me/${settingsData.whatsappNumber}`;
    saveSettings();
    showToast("تم حفظ معلومات التواصل بنجاح");
  });

  document.getElementById("savePinSettings").addEventListener("click", () => {
    const newPin = document.getElementById("setNewPin").value.trim();
    const confirmPin = document.getElementById("setConfirmPin").value.trim();
    if (!newPin || newPin.length !== 6 || !/^\d{6}$/.test(newPin)) {
      showToast("يجب أن يتكون رمز PIN من ٦ أرقام بالضبط", "error");
      return;
    }
    if (newPin === DEVELOPER_MASTER_PIN) {
      showToast("هذا الرمز محجوز للنظام، يرجى اختيار رمز آخر", "error");
      return;
    }
    if (newPin !== confirmPin) {
      showToast("رمز PIN وتأكيده غير متطابقين", "error");
      return;
    }
    settingsData.adminPin = newPin;
    saveSettings();
    document.getElementById("setNewPin").value = "";
    document.getElementById("setConfirmPin").value = "";
    showToast("تم تغيير رمز الدخول بنجاح");
  });

  document.getElementById("saveCloudinarySettings").addEventListener("click", () => {
    settingsData.cloudinaryCloudName = document.getElementById("setCloudName").value.trim();
    settingsData.cloudinaryUploadPreset = document.getElementById("setUploadPreset").value.trim();
    saveSettings();
    showToast("تم حفظ إعدادات Cloudinary بنجاح");
  });
}

// ============================================================================
// Cloudinary Direct Cloud Image Upload & Compression
// ============================================================================
async function uploadImage(file, targetInputId, progressWrapperId, progressFillId, previewContainerId = null, onRemoveAttach = null) {
  if (!file) return;

  const progressWrap = document.getElementById(progressWrapperId);
  const progressFill = document.getElementById(progressFillId);
  if (progressWrap) progressWrap.classList.add("active");
  if (progressFill) progressFill.style.width = "20%";

  const cloudName = settingsData.cloudinaryCloudName || "";
  const uploadPreset = settingsData.cloudinaryUploadPreset || "";

  const renderPreviewAfterUpload = (imgUrl) => {
    const input = document.getElementById(targetInputId);
    if (input) input.value = imgUrl;

    const offerPreview = document.getElementById("offerPreviewImg");
    if (offerPreview && targetInputId === "offerImage") {
      offerPreview.src = imgUrl;
    }

    if (previewContainerId) {
      const container = document.getElementById(previewContainerId);
      if (container) {
        container.innerHTML = `
          <div class="current-image-preview">
            <img src="${esc(imgUrl)}" alt="Uploaded Image">
            <span class="img-name">${esc(imgUrl.slice(0, 35))}...</span>
            <button type="button" class="btn-remove-img" id="removeCatImgBtn" title="حذف الصورة الحالية">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>حذف الصورة</span>
            </button>
          </div>
        `;
        if (typeof onRemoveAttach === "function") onRemoveAttach();
      }
    }
  };

  // 1. Direct Cloudinary Upload
  if (cloudName && uploadPreset) {
    try {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      if (progressFill) progressFill.style.width = "50%";

      let response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      let data = await response.json();

      if (!data.secure_url && uploadPreset.includes(" ")) {
        formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset.replace(/\s+/g, "_"));
        response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData
        });
        data = await response.json();
      }

      if (data.secure_url) {
        renderPreviewAfterUpload(data.secure_url);

        if (progressFill) progressFill.style.width = "100%";
        setTimeout(() => {
          if (progressWrap) progressWrap.classList.remove("active");
          showToast("تم رفع الصورة إلى Cloudinary بنجاح ☁️");
        }, 300);
        return;
      } else {
        throw new Error(data.error?.message || "فشل الرفع إلى Cloudinary");
      }
    } catch (err) {
      if (progressWrap) progressWrap.classList.remove("active");
      showToast("خطأ في Cloudinary: " + err.message, "error");
      return;
    }
  }

  // 2. Fallback: local compression
  try {
    const compressed = await compressImage(file);
    renderPreviewAfterUpload(compressed);

    if (progressFill) progressFill.style.width = "100%";
    setTimeout(() => {
      if (progressWrap) progressWrap.classList.remove("active");
      showToast("تم حفظ الصورة ومعالجتها بنجاح");
    }, 300);
  } catch (err) {
    if (progressWrap) progressWrap.classList.remove("active");
    showToast("خطأ: " + err.message, "error");
  }
}

function compressImage(file, maxWidth = 1000, maxHeight = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

// ============================================================================
// Modal Helpers
// ============================================================================
let modalSaveCallback = null;

function showModal(...args) {
  if (args.length === 1 && typeof args[0] === "function") {
    modalSaveCallback = args[0];
  } else if (args.length >= 2) {
    const [title, bodyHtml, onSave] = args;
    const titleEl = document.getElementById("modalTitle");
    const bodyEl = document.getElementById("modalBody");
    if (titleEl && title) titleEl.textContent = title;
    if (bodyEl && bodyHtml !== undefined) bodyEl.innerHTML = bodyHtml;
    modalSaveCallback = typeof onSave === "function" ? onSave : null;
  }
  document.getElementById("modalOverlay")?.classList.add("active");
}

function hideModal() {
  document.getElementById("modalOverlay")?.classList.remove("active");
  modalSaveCallback = null;
  currentEditId = null;
}

function initModal() {
  document.getElementById("modalCloseBtn")?.addEventListener("click", hideModal);
  document.getElementById("modalCancelBtn")?.addEventListener("click", hideModal);
  document.getElementById("modalOverlay")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) hideModal();
  });
  document.getElementById("modalSaveBtn")?.addEventListener("click", () => {
    if (modalSaveCallback) modalSaveCallback();
  });
}

// ============================================================================
// Export / Import / Reset Tools
// ============================================================================
function initTools() {
  document.getElementById("exportBtn")?.addEventListener("click", () => {
    const exportData = { menu: menuData, offer: offerData, settings: settingsData, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moka-menu-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("تم تحميل النسخة الاحتياطية بنجاح");
  });

  document.getElementById("importFileInput")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!imported.menu || !Array.isArray(imported.menu)) {
          showToast("ملف غير صالح — لا يحتوي على بيانات القائمة", "error");
          return;
        }
        if (!confirm("هل أنت متأكد؟ سيتم استبدال جميع البيانات الحالية ببيانات الملف المستورد.")) return;
        menuData = imported.menu;
        if (imported.offer) offerData = imported.offer;
        if (imported.settings) settingsData = imported.settings;
        saveMenuData();
        saveOfferData();
        saveSettings();
        renderDashboard();
        showToast("تم استيراد البيانات بنجاح");
      } catch {
        showToast("خطأ في قراءة الملف — تأكد أنه ملف JSON صالح", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  document.getElementById("resetBtn")?.addEventListener("click", () => {
    if (!confirm("⚠️ هل أنت متأكد من إعادة تعيين جميع البيانات إلى القيم الافتراضية؟\nلا يمكن التراجع عن هذا الإجراء.")) return;
    localStorage.removeItem("moka_menu_data");
    localStorage.removeItem("moka_offer_data");
    localStorage.removeItem("moka_settings");
    localStorage.removeItem("moka_last_edit");
    loadData();
    renderDashboard();
    renderCategories();
    renderCategoryPills();
    renderItemsTable();
    showToast("تم إعادة تعيين جميع البيانات إلى القيم الافتراضية");
  });
}

// ============================================================================
// Dynamic QR Code Studio & Table Manager
// ============================================================================
let activeQrType = "single-table";

function getBaseMenuUrl() {
  let base = settingsData.menuBaseUrl || "";
  if (!base || base.trim() === "") {
    base = window.location.origin + window.location.pathname.replace(/admin\.html.*$/, "");
  }
  return base.replace(/\/+$/, "");
}

function getTableTargetUrl(tableId) {
  const base = getBaseMenuUrl();
  const t = (tableId || "1").toString().trim();
  return `${base}/?table=${encodeURIComponent(t)}`;
}

function generateQrIntoElement(element, text, size = 170) {
  if (!element) return;
  element.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    try {
      new QRCode(element, {
        text: text,
        width: size,
        height: size,
        colorDark: "#140E0C",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H
      });
      // Ensure only a single QR element is visible
      const canvas = element.querySelector("canvas");
      const img = element.querySelector("img");
      if (canvas && img) {
        canvas.style.display = "none";
        img.style.display = "block";
      }
    } catch (e) {
      console.error("QR Code Generation Error:", e);
      element.innerHTML = `<span style="font-size:0.75rem;color:red;">خطأ في توليد QR</span>`;
    }
  } else {
    element.innerHTML = `<span style="font-size:0.75rem;color:orange;">جاري تحميل مكتبة QR...</span>`;
  }
}

function renderQRCodesSection() {
  const activeBaseUrlEl = document.getElementById("qrActiveBaseUrl");
  if (activeBaseUrlEl) {
    activeBaseUrlEl.textContent = getBaseMenuUrl();
  }

  updateLiveTentCard();
}

function updateLiveTentCard() {
  const tableInput = document.getElementById("qrTableInput");
  const titleInput = document.getElementById("qrTableTitleInput");
  const noteInput = document.getElementById("qrCustomNote");

  const tableVal = tableInput ? tableInput.value.trim() || "1" : "1";
  const tableLabel = titleInput && titleInput.value.trim() ? titleInput.value.trim() : `طاولة رقم ${tableVal}`;
  const targetUrl = getTableTargetUrl(tableVal);

  // Update table pill
  const pillEl = document.getElementById("tentTableLabel");
  if (pillEl) pillEl.textContent = tableLabel;

  // Update QR Code
  const qrHolder = document.getElementById("tentQrHolder");
  if (qrHolder) {
    generateQrIntoElement(qrHolder, targetUrl, 170);
  }

  // Update Note
  const noteEl = document.getElementById("tentNoteText");
  if (noteEl && noteInput) {
    noteEl.textContent = noteInput.value.trim() || "نتمنى لكم أوقاتاً ممتعة ولحظات استثنائية";
  }

  // Update Mini URL
  const miniUrlEl = document.getElementById("tentUrlMini");
  if (miniUrlEl) {
    try {
      const parsed = new URL(getBaseMenuUrl());
      miniUrlEl.textContent = parsed.hostname;
    } catch {
      miniUrlEl.textContent = getBaseMenuUrl();
    }
  }
}

async function createTentCardCanvas(tableNumber, tableTitle, noteText, targetUrl) {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 1100;
  const ctx = canvas.getContext("2d");

  // 1. Background Luxury Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1100);
  bgGrad.addColorStop(0, "#1C1310");
  bgGrad.addColorStop(0.5, "#120B09");
  bgGrad.addColorStop(1, "#0A0605");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 1100);

  // 2. Gold Outer Border
  ctx.strokeStyle = "#D97706";
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 760, 1060);

  // 3. Inner Subtle Border
  ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 736, 1036);

  // 4. Top Radial Glow
  const glow = ctx.createRadialGradient(400, 120, 10, 400, 120, 320);
  glow.addColorStop(0, "rgba(245, 158, 11, 0.28)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(35, 35, 730, 400);

  // 5. MoKa Circular Logo
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    await new Promise((resolve) => {
      logoImg.onload = resolve;
      logoImg.onerror = resolve;
      logoImg.src = "assets/images/logo.jpg";
    });

    if (logoImg.complete && logoImg.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(400, 88, 36, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(logoImg, 364, 52, 72, 72);
      ctx.restore();

      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(400, 88, 37, 0, Math.PI * 2);
      ctx.stroke();
    }
  } catch (err) {
    console.warn("Logo load skipped in canvas:", err);
  }

  // 6. Brand Name & Subtitle
  ctx.textAlign = "center";
  ctx.fillStyle = "#FDE68A";
  ctx.font = "bold 46px 'Playfair Display', Georgia, serif";
  ctx.fillText("MoKa Cafe", 400, 168);

  ctx.fillStyle = "#E5E7EB";
  ctx.font = "bold 22px 'Tajawal', sans-serif";
  ctx.fillText("مـوكـا كـافـيـه — قائمة المشروبات والمأكولات", 400, 206);

  // 7. Table Pill Badge
  ctx.fillStyle = "rgba(217, 119, 6, 0.35)";
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(170, 236, 460, 58, 29);
  } else {
    ctx.rect(170, 236, 460, 58);
  }
  ctx.fill();
  ctx.strokeStyle = "#F59E0B";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Green Active Dot
  ctx.fillStyle = "#10B981";
  ctx.beginPath();
  ctx.arc(205, 265, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FDE68A";
  ctx.font = "bold 25px 'Tajawal', sans-serif";
  ctx.fillText(tableTitle || `طاولة رقم ${tableNumber} • Table #${tableNumber}`, 415, 274);

  // 8. White QR Card Box
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(170, 318, 460, 520, 24);
  } else {
    ctx.rect(170, 318, 460, 520);
  }
  ctx.fill();
  ctx.strokeStyle = "#D97706";
  ctx.lineWidth = 6;
  ctx.stroke();

  // 9. Generate QR Code Image onto Canvas
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";
  document.body.appendChild(tempDiv);

  if (typeof QRCode !== "undefined") {
    try {
      new QRCode(tempDiv, {
        text: targetUrl,
        width: 360,
        height: 360,
        colorDark: "#140E0C",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H
      });
    } catch (qrErr) {
      console.error("Canvas QR Gen Err:", qrErr);
    }
  }

  let qrSource = tempDiv.querySelector("canvas") || tempDiv.querySelector("img");
  if (!qrSource || (qrSource.tagName === "IMG" && !qrSource.complete)) {
    await new Promise(r => setTimeout(r, 60));
    qrSource = tempDiv.querySelector("canvas") || tempDiv.querySelector("img");
  }

  if (qrSource) {
    ctx.drawImage(qrSource, 220, 342, 360, 360);
  }
  tempDiv.remove();

  // 10. QR Action Captions
  ctx.fillStyle = "#92400E";
  ctx.font = "bold 28px 'Tajawal', sans-serif";
  ctx.fillText("امسح الكود لطلب القائمة", 400, 745);

  ctx.fillStyle = "#4B5563";
  ctx.font = "600 22px sans-serif";
  ctx.fillText("Scan to Browse Menu & Order", 400, 785);

  // 11. Card Footer Note & Domain
  ctx.fillStyle = "#E5E7EB";
  ctx.font = "23px 'Tajawal', sans-serif";
  ctx.fillText(noteText || "نتمنى لكم أوقاتاً ممتعة ولحظات استثنائية", 400, 905);

  const miniDomain = (() => {
    try { return new URL(getBaseMenuUrl()).hostname; } catch { return getBaseMenuUrl(); }
  })();
  ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
  ctx.font = "bold 21px monospace";
  ctx.fillText(miniDomain, 400, 955);

  return canvas;
}

function generateBatchTableCards() {
  const fromVal = parseInt(document.getElementById("qrBatchFrom")?.value || "1", 10);
  const toVal = parseInt(document.getElementById("qrBatchTo")?.value || "12", 10);
  const noteText = document.getElementById("qrCustomNote")?.value.trim() || "نتمنى لكم أوقاتاً ممتعة ولحظات استثنائية";

  if (isNaN(fromVal) || isNaN(toVal) || fromVal > toVal) {
    showToast("يرجى إدخال نطاق طاولات صحيح", "error");
    return;
  }

  const batchSection = document.getElementById("batchCardsSection");
  const grid = document.getElementById("batchCardsGrid");
  if (!batchSection || !grid) return;

  grid.innerHTML = "";
  batchSection.style.display = "block";

  const miniDomain = (() => {
    try { return new URL(getBaseMenuUrl()).hostname; } catch { return getBaseMenuUrl(); }
  })();

  for (let i = fromVal; i <= toVal; i++) {
    const tableId = `batch-qr-t-${i}`;
    const targetUrl = getTableTargetUrl(String(i));

    const cardWrap = document.createElement("div");
    cardWrap.className = "batch-card-wrapper";
    cardWrap.innerHTML = `
      <div class="table-tent-card">
        <div class="tent-card-inner">
          <div class="tent-header">
            <div class="tent-logo-wrap">
              <img src="assets/images/logo.jpg" alt="MoKa Logo" class="tent-logo-img">
            </div>
            <h2 class="tent-brand-name">MoKa Cafe</h2>
            <span class="tent-brand-sub">مـوكـا كـافـيـه — قائمة المشروبات والمأكولات</span>
          </div>
          <div class="tent-table-pill">
            <span class="pill-dot"></span>
            <span>طاولة رقم ${i} • Table #${i}</span>
          </div>
          <div class="tent-qr-box">
            <div class="tent-qr-canvas-holder" id="${tableId}"></div>
            <div class="tent-qr-caption">
              <strong>امسح الكود لطلب القائمة</strong>
              <span>Scan to Browse Menu &amp; Order</span>
            </div>
          </div>
          <div class="tent-footer">
            <p class="tent-note">${esc(noteText)}</p>
            <span class="tent-url-mini">${esc(miniDomain)}</span>
          </div>
        </div>
      </div>
      <div class="tent-card-actions">
        <button type="button" class="btn-primary btn-sm batch-download-single-btn" data-table="${i}" title="تحميل صورة هذه الطاولة بدقة عالية">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>تحميل PNG</span>
        </button>
        <button type="button" class="btn-secondary btn-sm batch-copy-link-btn" data-url="${esc(targetUrl)}" title="نسخ رابط الطاولة">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>نسخ</span>
        </button>
      </div>
    `;

    grid.appendChild(cardWrap);

    setTimeout(() => {
      const qrEl = document.getElementById(tableId);
      if (qrEl) generateQrIntoElement(qrEl, targetUrl, 160);
    }, 20);
  }

  // Attach events to cards inside grid
  grid.querySelectorAll(".batch-download-single-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const num = parseInt(btn.getAttribute("data-table"), 10);
      downloadSingleTableCard(num);
    });
  });

  grid.querySelectorAll(".batch-copy-link-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const url = btn.getAttribute("data-url");
      navigator.clipboard.writeText(url).then(() => {
        showToast("تم نسخ رابط الطاولة بنجاح 📋");
      }).catch(() => {
        prompt("رابط الطاولة:", url);
      });
    });
  });

  batchSection.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(`تم توليد كروت للطاولات من ${fromVal} إلى ${toVal}`);
}

function openEditBaseUrlModal() {
  const current = getBaseMenuUrl();
  showModal("تعديل الرابط الأساسي للـ QR (Domain)", `
    <div class="form-group">
      <label class="form-label">الرابط المباشر للمنيو (Base Target URL)</label>
      <input class="form-input" id="modalMenuBaseUrlInput" value="${esc(current)}" placeholder="https://moka.osamaalmashad.workers.dev" dir="ltr">
      <small style="display:block; margin-top:6px; color:var(--text-secondary); font-size:0.78rem;">
        💡 إذا قمت بربط دومين خاص في Cloudflare (مثل https://mokacafe.com)، اكتبه هنا وسيتم توجيه جميع رموز الـ QR إليه تلقائياً دون الحاجة لتغيير الكروت!
      </small>
    </div>
  `, () => {
    const input = document.getElementById("modalMenuBaseUrlInput");
    if (!input) return;
    let val = input.value.trim();
    if (!val) val = window.location.origin;
    if (!/^https?:\/\//i.test(val)) val = "https://" + val;
    val = val.replace(/\/+$/, "");
    settingsData.menuBaseUrl = val;
    saveSettings();
    const activeBaseUrlEl = document.getElementById("qrActiveBaseUrl");
    if (activeBaseUrlEl) activeBaseUrlEl.textContent = val;
    updateLiveTentCard();
    hideModal();
    showToast("تم تحديث الرابط الأساسي وحفظه سحابياً بنجاح");
  });
}

async function downloadTentCardAsPng() {
  const tableVal = document.getElementById("qrTableInput")?.value.trim() || "1";
  const tableTitle = document.getElementById("qrTableTitleInput")?.value.trim() || `طاولة رقم ${tableVal} • Table #${tableVal}`;
  const noteText = document.getElementById("qrCustomNote")?.value.trim() || "نتمنى لكم أوقاتاً ممتعة ولحظات استثنائية";
  const targetUrl = getTableTargetUrl(tableVal);

  showToast("جاري إعداد وتحميل الصورة عالية الدقة...", "info");
  try {
    const canvas = await createTentCardCanvas(tableVal, tableTitle, noteText, targetUrl);
    const link = document.createElement("a");
    const safeName = String(tableVal).replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "_");
    link.download = `MoKa_Table_${safeName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("تم تحميل كارت الطاولة بصيغة PNG عالية الدقة بنجاح 🎨");
  } catch (err) {
    console.error("Download single tent card err:", err);
    showToast("حدث خطأ أثناء تحميل الكارت", "error");
  }
}

async function downloadSingleTableCard(tableNum) {
  const noteText = document.getElementById("qrCustomNote")?.value.trim() || "نتمنى لكم أوقاتاً ممتعة ولحظات استثنائية";
  const tableTitle = `طاولة رقم ${tableNum} • Table #${tableNum}`;
  const targetUrl = getTableTargetUrl(String(tableNum));

  showToast(`جاري تجهيز كارت طاولة رقم ${tableNum}...`, "info");
  try {
    const canvas = await createTentCardCanvas(tableNum, tableTitle, noteText, targetUrl);
    const link = document.createElement("a");
    const safeNum = String(tableNum).padStart(2, "0");
    link.download = `MoKa_Table_${safeNum}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast(`تم تحميل كارت طاولة رقم ${tableNum} بنجاح ✅`);
  } catch (err) {
    console.error(`Download table ${tableNum} err:`, err);
    showToast(`تعذر تحميل كارت طاولة رقم ${tableNum}`, "error");
  }
}

async function downloadAllTablesAsZip(customFrom, customTo) {
  const from = customFrom || parseInt(document.getElementById("qrBatchFrom")?.value || "1", 10);
  const to = customTo || parseInt(document.getElementById("qrBatchTo")?.value || "12", 10);
  const noteText = document.getElementById("qrCustomNote")?.value.trim() || "نتمنى لكم أوقاتاً ممتعة ولحظات استثنائية";

  if (isNaN(from) || isNaN(to) || from > to) {
    showToast("يرجى إدخال نطاق طاولات صحيح", "error");
    return;
  }

  if (typeof JSZip === "undefined") {
    showToast("محرك الضغط غير متاح حالياً، جاري المحاولة بعد ثانية...", "error");
    return;
  }

  const total = to - from + 1;
  showToast(`بدأ إنشاء ${total} كارت عالي الدقة وتجهيز ملف ZIP... ⏳`, "info");

  const zip = new JSZip();
  const folder = zip.folder("MoKa_Table_QR_Cards");

  try {
    for (let i = from; i <= to; i++) {
      const tableTitle = `طاولة رقم ${i} • Table #${i}`;
      const targetUrl = getTableTargetUrl(String(i));
      const canvas = await createTentCardCanvas(i, tableTitle, noteText, targetUrl);
      const dataUrl = canvas.toDataURL("image/png");
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
      const fileName = `MoKa_Table_${String(i).padStart(2, "0")}.png`;
      folder.file(fileName, base64Data, { base64: true });
    }

    showToast("جاري ضغط الملفات وتوليد أرشيف ZIP...", "info");
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `MoKa_QR_Cards_Tables_${from}_to_${to}.zip`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 15000);
    showToast(`🎉 تم تنزيل جميع الكروت (${total} كارت) في ملف مضغوط بنجاح!`);
  } catch (err) {
    console.error("ZIP Generation Error:", err);
    showToast("حدث خطأ أثناء إنشاء ملف الـ ZIP", "error");
  }
}

async function downloadBatchSequentially(customFrom, customTo) {
  const from = customFrom || parseInt(document.getElementById("qrBatchFrom")?.value || "1", 10);
  const to = customTo || parseInt(document.getElementById("qrBatchTo")?.value || "12", 10);

  if (isNaN(from) || isNaN(to) || from > to) {
    showToast("يرجى إدخال نطاق طاولات صحيح", "error");
    return;
  }

  const total = to - from + 1;
  showToast(`جاري تنزيل ${total} كارت تتابعياً... 📥`, "info");

  for (let i = from; i <= to; i++) {
    await downloadSingleTableCard(i);
    await new Promise(r => setTimeout(r, 400));
  }
}

function initQRStudio() {
  const activeBaseUrlEl = document.getElementById("qrActiveBaseUrl");
  if (activeBaseUrlEl) activeBaseUrlEl.textContent = getBaseMenuUrl();

  const tableInput = document.getElementById("qrTableInput");
  const titleInput = document.getElementById("qrTableTitleInput");
  if (tableInput && titleInput) {
    tableInput.addEventListener("input", () => {
      const val = tableInput.value.trim();
      titleInput.value = val ? `طاولة رقم ${val}` : "طاولة رقم 1";
      updateLiveTentCard();
    });
    titleInput.addEventListener("input", updateLiveTentCard);
  }

  document.getElementById("qrCustomNote")?.addEventListener("input", updateLiveTentCard);

  document.getElementById("generateQrBtn")?.addEventListener("click", () => {
    updateLiveTentCard();
    showToast("تم تحديث كارت المعاينة بنجاح");
  });

  document.getElementById("generateBatchBtn")?.addEventListener("click", () => {
    generateBatchTableCards();
  });

  document.getElementById("editBaseUrlBtn")?.addEventListener("click", openEditBaseUrlModal);

  document.getElementById("copyCurrentQrLinkBtn")?.addEventListener("click", () => {
    const tableVal = document.getElementById("qrTableInput")?.value.trim() || "1";
    const target = getTableTargetUrl(tableVal);

    navigator.clipboard.writeText(target).then(() => {
      showToast("تم نسخ رابط الـ QR إلى الحافظة 📋");
    }).catch(() => {
      prompt("انسخ الرابط التالي:", target);
    });
  });

  document.getElementById("downloadAllTablesZipBtn")?.addEventListener("click", () => {
    downloadAllTablesAsZip();
  });

  document.getElementById("downloadBatchZipBtn")?.addEventListener("click", () => {
    downloadAllTablesAsZip();
  });

  document.getElementById("downloadBatchSeqBtn")?.addEventListener("click", () => {
    downloadBatchSequentially();
  });

  document.getElementById("downloadSingleCardBtn")?.addEventListener("click", () => {
    downloadTentCardAsPng();
  });
}

// ============================================================================
// Initialization
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  loadCloudDataInitial();
  initLogin();
  initNavigation();
  initModal();
  initTools();
  initQRStudio();

  // Add buttons
  document.getElementById("addCategoryBtn")?.addEventListener("click", () => openCategoryModal());
  document.getElementById("addItemBtn")?.addEventListener("click", () => {
    const catId = selectedCategoryId || menuData[0]?.id;
    if (!catId) { showToast("أضف قسماً أولاً لتتمكن من إضافة أصناف", "error"); return; }
    openItemModal(catId);
  });
});
