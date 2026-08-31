// MoKa Cafe — Customer Digital Menu Application
import { subscribeToCloud, fetchFromCloud } from "./firebase-sync.js";
import { getDefaultMenuWithIcons, CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from "./default-menu.js";
import { escapeHTML } from "./utils.js";

/**
 * Inject SVG icons into menu categories that may lack them (e.g. from cloud sync).
 */
function injectCategoryIcons(categories) {
  return categories.map(cat => {
    if (!cat.icon || !cat.icon.startsWith('<svg')) {
      cat.icon = CATEGORY_ICONS[cat.id] || DEFAULT_CATEGORY_ICON;
    }
    return cat;
  });
}

// Default menu data (imported from shared module)
const DEFAULT_MENU_CATEGORIES = getDefaultMenuWithIcons();

/**
 * Load menu data from localStorage (set by admin panel), fallback to hardcoded defaults.
 */
function loadMenuData() {
  try {
    const saved = localStorage.getItem("moka_menu_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return injectCategoryIcons(parsed);
    }
  } catch (e) { /* fallback to defaults */ }
  return JSON.parse(JSON.stringify(DEFAULT_MENU_CATEGORIES));
}

function loadOfferData() {
  try {
    const saved = localStorage.getItem("moka_offer_data");
    if (saved) return JSON.parse(saved);
  } catch (e) { /* fallback */ }
  return null;
}

function loadSettingsData() {
  try {
    const saved = localStorage.getItem("moka_settings");
    if (saved) return JSON.parse(saved);
  } catch (e) { /* fallback */ }
  return null;
}

// App State
let menuCategories = loadMenuData();
let currentLang = "ar"; // "ar" | "en"
let currentTheme = localStorage.getItem("moka_theme") || "dark";
let activeSearchQuery = "";
let activeQuickFilter = "all"; // "all" | "bestseller" | "coffee" | "cold" | "desserts"
let orderItems = []; // Array of { id, nameAr, nameEn, price, qty, customOption, notes, isSpecialOffer }
let currentModalItem = null;
let modalSelectedSize = "12"; // "12" | "24"
let modalSelectedSugar = "مضبوط";
let modalQty = 1;
let scrollSpyObserver = null;

// UI Text Dictionary for UI labels
const uiText = {
  ar: {
    heroBadge: "قهوة وحلويات فاخرة",
    cafeName: "MoKa Cafe",
    cafeSub: "MoKa Cafe",
    tagline: "قهوة مميزة • عصائر طازجة • وافل وحلويات فاخرة",
    openNow: "مفتوح الآن",
    cashVisa: "كاش وفيزا",
    specialOfferBadge: "عرض خاص",
    specialOfferTitle: "كومبو موكا المميز",
    specialOfferDesc: "",
    specialOfferPrice: "245 ج.م",
    specialOfferOriginal: "295 ج.م",
    addToOrder: "إضافة للطلب",
    searchPlaceholder: "ابحث في قائمة المشروبات والحلويات...",
    trendingLabel: "الأكثر بحثاً:",
    filterAll: "الكل",
    filterBestseller: "🔥 الأكثر طلباً",
    filterCoffee: "☕ القهوة والمشروبات الساخنة",
    filterCold: "🧊 المثلجات والعصائر",
    filterDesserts: "🧇 الوافل والحلويات",
    currency: "ج.م",
    p12Label: "١٢ قطعة",
    p24Label: "٢٤ قطعة",
    noResults: "عفواً، لا توجد عناصر تطابق بحثك.",
    noResultsSuggestion: "جرب البحث عن أحد الأصناف الأكثر طلباً:",
    orderTotalLabel: "إجمالي طلبك",
    viewOrderBtn: "عرض الطلب",
    orderDrawerTitle: "طلبك الحالي",
    clearOrderBtn: "مسح الكل",
    tableNumLabel: "رقم الطاولة / ملاحظاتك:",
    finalTotalLabel: "المجموع الكلي:",
    whatsappOrderBtn: "إرسال الطلب عبر واتساب",
    showWaiterBtn: "عرض الكارت للويتر",
    waiterStatusText: "طلب جاهز للتسجيل والتنفيذ",
    waiterTableLabel: "رقم الطاولة / الموقع:",
    waiterHintText: "يرجى إبراز الشاشة للويتر لتأكيد وتسجيل طلبك",
    waiterItemsTitle: "الأصناف المطلوبة",
    waiterGeneralNotesTitle: "ملاحظات إضافية:",
    waiterTotalLabel: "المجموع الكلي للحساب:",
    waiterDoneBtn: "تم تسجيل الطلب من الويتر",
    waiterEditBtn: "تعديل الطلب",
    waiterCopyBtn: "نسخ الملخص",
    waiterDoneSuccess: "تم تأكيد طلبك بنجاح! نتمنى لك وقتاً ممتعاً في موكا كافيه ❤️",
    sizeLabel: "اختر الحجم / الكمية:",
    sugarLabel: "مستوى السكر:",
    notesLabel: "ملاحظات إضافية:",
    qtyLabel: "العدد:",
    confirmAddBtn: "إضافة إلى الطلب",
    rightsReserved: "جميع الحقوق محفوظة © موكا كافيه",
    craftedWith: "صُنع بـ ❤️ لزبائن موكا كافيه",
    developedBy: "تطوير وبرمجة:",
    emptyOrderText: "سلة طلبك فارغة حالياً. اضغط على أي صنف لإضافته!",
    copiedAlert: "تم نسخ ملخص الطلب بنجاح!"
  },
  en: {
    heroBadge: "Artisanal Coffee & Sweets",
    cafeName: "MoKa Cafe",
    cafeSub: "موكا كافيه",
    tagline: "Artisanal Coffee • Fresh Juices • Belgian Waffles & Fine Desserts",
    openNow: "Open Now",
    freeWifi: "Free High-Speed Wi-Fi",
    cashVisa: "Cash & Visa",
    specialOfferBadge: "Special Offer",
    specialOfferTitle: "MoKa Signature Combo",
    specialOfferDesc: "Spanish Latte (Hot/Iced) + Four Seasons Belgian Waffle with Nutella & Lotus",
    specialOfferPrice: "245 EGP",
    specialOfferOriginal: "295 EGP",
    addToOrder: "Add to Order",
    searchPlaceholder: "Search drinks, desserts, waffles...",
    trendingLabel: "Trending:",
    filterAll: "All",
    filterBestseller: "🔥 Bestsellers",
    filterCoffee: "☕ Hot & Coffee",
    filterCold: "🧊 Cold & Juices",
    filterDesserts: "🧇 Waffles & Desserts",
    currency: "EGP",
    p12Label: "12 Pcs",
    p24Label: "24 Pcs",
    noResults: "Sorry, no items matched your search.",
    noResultsSuggestion: "Try searching for our bestsellers:",
    orderTotalLabel: "Your Order Total",
    viewOrderBtn: "View Order",
    orderDrawerTitle: "Your Order",
    clearOrderBtn: "Clear All",
    tableNumLabel: "Table # / Special Notes:",
    finalTotalLabel: "Grand Total:",
    showWaiterBtn: "Show Card to Waiter",
    waiterStatusText: "Order Ready to Serve",
    waiterTableLabel: "Table # / Location:",
    waiterHintText: "Please show this screen to the waiter",
    waiterItemsTitle: "Items Ordered",
    waiterGeneralNotesTitle: "Special Notes:",
    waiterTotalLabel: "Grand Total:",
    waiterDoneBtn: "Order Confirmed by Waiter",
    waiterEditBtn: "Edit Order",
    waiterCopyBtn: "Copy Summary",
    waiterDoneSuccess: "Your order is confirmed! Enjoy your time at MoKa Cafe ❤️",
    sizeLabel: "Select Portion / Size:",
    sugarLabel: "Sugar Level:",
    notesLabel: "Additional Notes:",
    qtyLabel: "Quantity:",
    confirmAddBtn: "Add to Order",
    rightsReserved: "All rights reserved © MoKa Cafe",
    craftedWith: "Crafted with ❤️ for MoKa Cafe guests",
    developedBy: "Developed by:",
    emptyOrderText: "Your order is empty. Tap on any item to add it!",
    copiedAlert: "Order summary copied to clipboard!"
  }
};

/**
 * Initialize Application
 */
document.addEventListener("DOMContentLoaded", () => {
  // Load initial local data for 0ms instant display
  menuCategories = loadMenuData();
  applyAdminData();

  applyTheme(currentTheme);
  renderCategoryNav();
  renderMenu();
  initSearch();
  initSearchSuggestions();
  initQuickFilters();
  initThemeToggle();
  initLanguageToggle();
  initOrderSystem();
  initBackToTop();
  initTableDetector();
  initSpecialOfferAction();
  initItemModalEvents();
  updateStaticTexts();

  // Listen to Firebase Cloud for real-time updates from admin
  initCloudSync();
});

/**
 * Realtime live synchronization with Firebase Firestore
 */
function initCloudSync() {
  subscribeToCloud((cloudData) => {
    if (!cloudData) return;
    let changed = false;
    if (cloudData.menu && Array.isArray(cloudData.menu) && cloudData.menu.length > 0) {
      menuCategories = injectCategoryIcons(cloudData.menu);
      localStorage.setItem("moka_menu_data", JSON.stringify(menuCategories));
      changed = true;
    }
    if (cloudData.offer && Object.keys(cloudData.offer).length > 0) {
      localStorage.setItem("moka_offer_data", JSON.stringify(cloudData.offer));
      changed = true;
    }
    if (cloudData.settings && Object.keys(cloudData.settings).length > 0) {
      localStorage.setItem("moka_settings", JSON.stringify(cloudData.settings));
      changed = true;
    }
    if (changed) {
      applyAdminData();
      renderCategoryNav();
      renderMenu();
      updateStaticTexts();
    }
  });
}

/**
 * Apply admin-edited offer data, settings (WhatsApp, socials) to the page.
 */
function applyAdminData() {
  // Apply special offer edits
  const offer = loadOfferData();
  if (offer) {
    const offerTitle = document.querySelector('[data-i18n="specialOfferTitle"]');
    const offerDesc = document.querySelector('[data-i18n="specialOfferDesc"]');
    const offerPrice = document.querySelector('[data-i18n="specialOfferPrice"]');
    const offerOrig = document.querySelector('[data-i18n="specialOfferOriginal"]');
    const offerImg = document.querySelector('.offer-img');
    if (offerTitle) offerTitle.textContent = offer.titleAr || offerTitle.textContent;
    if (offerDesc) offerDesc.textContent = offer.descAr || offerDesc.textContent;
    if (offerPrice) offerPrice.textContent = offer.priceAr || offerPrice.textContent;
    if (offerOrig) offerOrig.textContent = offer.originalAr || offerOrig.textContent;
    if (offerImg && offer.image) offerImg.src = offer.image;

    // Also update the English text in uiText
    if (offer.titleEn) uiText.en.specialOfferTitle = offer.titleEn;
    if (offer.descEn) uiText.en.specialOfferDesc = offer.descEn;
    if (offer.priceEn) uiText.en.specialOfferPrice = offer.priceEn;
    if (offer.originalEn) uiText.en.specialOfferOriginal = offer.originalEn;
    if (offer.titleAr) uiText.ar.specialOfferTitle = offer.titleAr;
    if (offer.descAr) uiText.ar.specialOfferDesc = offer.descAr;
    if (offer.priceAr) uiText.ar.specialOfferPrice = offer.priceAr;
    if (offer.originalAr) uiText.ar.specialOfferOriginal = offer.originalAr;
  }

  // Apply settings (social links, WhatsApp)
  const settings = loadSettingsData();
  if (settings) {
    const waLink = document.getElementById('cafeWhatsAppLink') || document.querySelector('.social-links-row a[aria-label="WhatsApp"]');
    if (waLink && settings.whatsappNumber) waLink.href = `https://wa.me/${settings.whatsappNumber}`;
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink && settings.phoneNumber) phoneLink.href = `tel:${settings.phoneNumber}`;
    const igLink = document.querySelector('a[href*="instagram"]');
    if (igLink && settings.instagramUrl) igLink.href = settings.instagramUrl;
  }
}

/**
 * Apply Dark / Light Theme
 */
function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("moka_theme", theme);
  if (theme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
}

/**
 * Setup Theme Toggle Button
 */
function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggleBtn");
  if (!themeBtn) return;

  themeBtn.addEventListener("click", () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });
}

/**
 * Render Horizontal Category Navigation Pills
 */
function renderCategoryNav() {
  const navContainer = document.getElementById("categoryNavTrack");
  if (!navContainer) return;

  const isAr = currentLang === "ar";
  navContainer.innerHTML = menuCategories.map((cat, idx) => {
    const title = isAr ? cat.titleAr : cat.titleEn;
    return `
      <button type="button" 
              class="nav-tab ${idx === 0 ? 'active' : ''}" 
              data-target="${cat.id}"
              id="tab-${cat.id}"
              aria-current="${idx === 0 ? 'true' : 'false'}"
              aria-label="${escapeHTML(title)}">
        <span class="nav-tab-icon" aria-hidden="true">${cat.icon}</span>
        <span class="nav-tab-text">${escapeHTML(title)}</span>
      </button>
    `;
  }).join("");

  // Attach click events
  navContainer.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const headerOffset = 140;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        navContainer.querySelectorAll(".nav-tab").forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-current", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-current", "true");
        tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    });
  });
}

/**
 * Filter items based on active search and active quick filter chip
 */
function filterCategoryItems(cat) {
  return cat.items.filter(item => {
    // 1. Quick Tag Filter
    if (activeQuickFilter === "bestseller" && !item.isBestseller) return false;
    if (activeQuickFilter === "coffee" && item.type !== "coffee" && item.type !== "hot") return false;
    if (activeQuickFilter === "cold" && item.type !== "cold") return false;
    if (activeQuickFilter === "desserts" && item.type !== "desserts") return false;

    // 2. Search Text Query
    if (activeSearchQuery) {
      const q = activeSearchQuery.toLowerCase().trim();
      const matchAr = item.nameAr.toLowerCase().includes(q) || (item.descAr && item.descAr.toLowerCase().includes(q));
      const matchEn = item.nameEn.toLowerCase().includes(q) || (item.descEn && item.descEn.toLowerCase().includes(q));
      return matchAr || matchEn;
    }

    return true;
  });
}

/**
 * Render Complete Menu Sections & Items
 */
function renderMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  const isAr = currentLang === "ar";
  const currency = isAr ? uiText.ar.currency : uiText.en.currency;
  const p12Label = isAr ? uiText.ar.p12Label : uiText.en.p12Label;
  const p24Label = isAr ? uiText.ar.p24Label : uiText.en.p24Label;

  let totalVisibleItems = 0;

  const sectionsHtml = menuCategories.map(cat => {
    const filteredItems = filterCategoryItems(cat);

    if (filteredItems.length === 0) return "";

    totalVisibleItems += filteredItems.length;

    const title = isAr ? cat.titleAr : cat.titleEn;
    const desc = isAr ? cat.descAr : cat.descEn;

    // Category hero banner if present
    const heroBannerHtml = cat.heroImage ? `
      <div class="category-hero">
        <img src="${cat.heroImage}" alt="${escapeHTML(title)}" class="category-hero-bg" loading="lazy" onerror="this.parentElement.style.display='none'">
        <div class="category-hero-overlay"></div>
        <div class="category-hero-content">
          <h3 class="category-hero-pill">${escapeHTML(title)}</h3>
          <p class="category-hero-desc">${escapeHTML(desc)}</p>
        </div>
      </div>
    ` : "";

    // Items list
    const itemsHtml = filteredItems.map(item => {
      const name = isAr ? item.nameAr : item.nameEn;
      const subName = isAr ? item.nameEn : item.nameAr;
      const itemDesc = isAr ? item.descAr : item.descEn;
      const badge = isAr ? item.badgeAr : item.badgeEn;

      if (cat.isDualPrice) {
        // Dual pricing format for mini pancakes (12 pcs / 24 pcs)
        return `
          <div class="menu-item dual-price-item" data-item-id="${item.id}" tabindex="0" role="button" aria-label="${escapeHTML(name)}">
            <div class="item-info">
              <div class="item-header-line">
                <h4 class="item-name">${escapeHTML(name)}</h4>
                ${badge ? `<span class="item-badge">${escapeHTML(badge)}</span>` : ''}
              </div>
              <span class="item-subname">${escapeHTML(subName)}</span>
              ${itemDesc ? `<p class="item-description">${escapeHTML(itemDesc)}</p>` : ''}
            </div>
            <div class="dual-prices">
              <button type="button" class="price-chip quick-portion-btn" data-portion="12" data-price="${item.price12}">
                <span class="chip-qty">${escapeHTML(p12Label)}</span>
                <span class="chip-cost">${item.price12} <small>${escapeHTML(currency)}</small></span>
              </button>
              <button type="button" class="price-chip featured-chip quick-portion-btn" data-portion="24" data-price="${item.price24}">
                <span class="chip-qty">${escapeHTML(p24Label)}</span>
                <span class="chip-cost">${item.price24} <small>${escapeHTML(currency)}</small></span>
              </button>
            </div>
          </div>
        `;
      }

      // Standard item
      return `
        <div class="menu-item" data-item-id="${item.id}" tabindex="0" role="button" aria-label="${escapeHTML(name)}">
          <div class="item-info">
            <div class="item-header-line">
              <h4 class="item-name">${escapeHTML(name)}</h4>
              ${badge ? `<span class="item-badge">${escapeHTML(badge)}</span>` : ''}
            </div>
            <span class="item-subname">${escapeHTML(subName)}</span>
            ${itemDesc ? `<p class="item-description">${escapeHTML(itemDesc)}</p>` : ''}
          </div>
          <div class="item-actions-box">
            <div class="item-price">
              <span class="price-val">${item.price}</span>
              <span class="price-curr">${escapeHTML(currency)}</span>
            </div>
            <button type="button" class="item-quick-add-btn" aria-label="Add ${escapeHTML(name)}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join("");

    return `
      <section class="menu-section" id="${cat.id}">
        ${heroBannerHtml}
        ${!cat.heroImage ? `
          <div class="section-title-wrap">
            <div class="section-badge-icon" aria-hidden="true">${cat.icon}</div>
            <div class="section-title-text">
              <h3 class="section-title">${escapeHTML(title)}</h3>
              <p class="section-desc">${escapeHTML(desc)}</p>
            </div>
          </div>
        ` : ''}
        <div class="menu-items-grid">
          ${itemsHtml}
        </div>
      </section>
    `;
  }).join("");

  if (totalVisibleItems === 0) {
    container.innerHTML = `
      <div class="empty-results">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p>${isAr ? escapeHTML(uiText.ar.noResults) : escapeHTML(uiText.en.noResults)}</p>
        <p class="suggestion-label">${isAr ? escapeHTML(uiText.ar.noResultsSuggestion) : escapeHTML(uiText.en.noResultsSuggestion)}</p>
        <div class="empty-recommendations">
          <button type="button" class="suggestion-tag" data-query="سبانش لاتيه">سبانش لاتيه</button>
          <button type="button" class="suggestion-tag" data-query="وافل فور سيزون">وافل فور سيزون</button>
          <button type="button" class="suggestion-tag" data-query="موكا">موكا</button>
        </div>
      </div>
    `;

    // Reattach event listeners to empty state suggestions
    container.querySelectorAll(".suggestion-tag").forEach(tag => {
      tag.addEventListener("click", () => {
        const query = tag.getAttribute("data-query");
        const searchInput = document.getElementById("menuSearchInput");
        if (searchInput) {
          searchInput.value = query;
          activeSearchQuery = query;
          const clearBtn = document.getElementById("searchClearBtn");
          if (clearBtn) clearBtn.style.display = "flex";
          renderMenu();
        }
      });
    });
  } else {
    container.innerHTML = sectionsHtml;
  }

  // Attach card click & quick add listeners
  attachMenuItemEvents();

  // Update screen reader live announcer
  const announcer = document.getElementById("searchAnnouncer");
  if (announcer) {
    if (activeSearchQuery || activeQuickFilter !== "all") {
      announcer.textContent = isAr
        ? `تم العثور على ${totalVisibleItems} عنصر`
        : `Found ${totalVisibleItems} items matching criteria`;
    } else {
      announcer.textContent = "";
    }
  }

  refreshScrollSpy();
}

/**
 * Attach click events to rendered menu items
 */
function attachMenuItemEvents() {
  document.querySelectorAll(".menu-item").forEach(itemEl => {
    const itemId = itemEl.getAttribute("data-item-id");
    const item = findItemById(itemId);
    if (!item) return;

    // Click on quick add button or whole card
    const quickAddBtn = itemEl.querySelector(".item-quick-add-btn");
    if (quickAddBtn) {
      quickAddBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openItemCustomModal(item);
      });
    }

    // Dual price portion buttons
    itemEl.querySelectorAll(".quick-portion-btn").forEach(pBtn => {
      pBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const portion = pBtn.getAttribute("data-portion");
        openItemCustomModal(item, portion);
      });
    });

    itemEl.addEventListener("click", () => {
      openItemCustomModal(item);
    });

    itemEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openItemCustomModal(item);
      }
    });
  });
}

/**
 * Find item object by ID
 */
function findItemById(id) {
  for (const cat of menuCategories) {
    const found = cat.items.find(it => it.id === id);
    if (found) return { ...found, categoryId: cat.id, isDualPrice: cat.isDualPrice };
  }
  return null;
}

/**
 * Setup Real-time Instant Search
 */
function initSearch() {
  const searchInput = document.getElementById("menuSearchInput");
  const clearBtn = document.getElementById("searchClearBtn");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    activeSearchQuery = e.target.value;
    if (clearBtn) {
      clearBtn.style.display = activeSearchQuery ? "flex" : "none";
    }
    renderMenu();
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (activeSearchQuery || searchInput.value) {
        searchInput.value = "";
        activeSearchQuery = "";
        if (clearBtn) clearBtn.style.display = "none";
        renderMenu();
      }
      searchInput.blur();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      activeSearchQuery = "";
      clearBtn.style.display = "none";
      searchInput.focus();
      renderMenu();
    });
  }
}

/**
 * Search Suggestion Tag Chips
 */
function initSearchSuggestions() {
  document.querySelectorAll(".search-suggestions .suggestion-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const query = tag.getAttribute("data-query");
      const searchInput = document.getElementById("menuSearchInput");
      if (searchInput) {
        searchInput.value = query;
        activeSearchQuery = query;
        const clearBtn = document.getElementById("searchClearBtn");
        if (clearBtn) clearBtn.style.display = "flex";
        renderMenu();
        searchInput.focus();
      }
    });
  });
}

/**
 * Setup Quick Category / Dietary Filter Chips
 */
function initQuickFilters() {
  const chips = document.querySelectorAll(".quick-filter-chips .filter-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeQuickFilter = chip.getAttribute("data-filter") || "all";
      renderMenu();
    });
  });
}

/**
 * Special Offer Action Button
 */
function initSpecialOfferAction() {
  const btn = document.getElementById("addSpecialOfferBtn");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const specialOfferItem = {
      id: "special_combo",
      nameAr: "كومبو موكا المميز (سبانش لاتيه + وافل فور سيزون)",
      nameEn: "MoKa Signature Combo (Spanish Latte + Waffle)",
      price: 245,
      qty: 1,
      customOption: "عرض خاص",
      notes: ""
    };
    addToOrder(specialOfferItem);
  });
}

/**
 * Item Customization Modal Lifecycle
 */
function openItemCustomModal(item, preselectedPortion = "12") {
  currentModalItem = item;
  modalQty = 1;
  modalSelectedSugar = "مضبوط";
  modalSelectedSize = preselectedPortion;

  const isAr = currentLang === "ar";
  const currency = isAr ? uiText.ar.currency : uiText.en.currency;

  const modalBackdrop = document.getElementById("itemCustomModalBackdrop");
  const modalName = document.getElementById("customModalTitle");
  const modalSubname = document.getElementById("customModalSubname");
  const modalDesc = document.getElementById("customModalDesc");
  const sugarGroup = document.getElementById("customSugarGroup");
  const sizeGroup = document.getElementById("customSizeGroup");
  const sizeOptions = document.getElementById("customSizeOptions");
  const notesInput = document.getElementById("customItemNotes");
  const qtyVal = document.getElementById("modalQtyVal");
  const addPrice = document.getElementById("modalAddPrice");

  if (!modalBackdrop) return;

  modalName.textContent = isAr ? item.nameAr : item.nameEn;
  modalSubname.textContent = isAr ? (item.nameEn || "") : (item.nameAr || "");
  modalDesc.textContent = isAr ? (item.descAr || "") : (item.descEn || "");
  if (notesInput) notesInput.value = "";
  if (qtyVal) qtyVal.textContent = "1";

  // Sugar options based on beverage category (coffee vs juices vs non-customizable items)
  let categoryId = item.categoryId;
  if (!categoryId) {
    const parentCat = menuCategories.find(c => c.items && c.items.some(it => it.id === item.id));
    if (parentCat) categoryId = parentCat.id;
  }

  // Sugar options: applied strictly to all coffee only, removed from everything else
  const isCoffee = categoryId === "coffee" ||
                   categoryId === "iced_drinks" ||
                   item.type === "coffee" ||
                   (item.nameAr && (item.nameAr.includes("قهوة") || item.nameAr.includes("نسكافيه")));
  const sugarOptionsRow = document.getElementById("customSugarOptions");

  if (sugarGroup && sugarOptionsRow) {
    if (isCoffee) {
      sugarGroup.style.display = "flex";
      modalSelectedSugar = isAr ? "مضبوط" : "Medium";
      const sugarOptions = isAr ? [
        { label: "مضبوط", val: "مضبوط" },
        { label: "سادة", val: "بدون سكر (سادة)" },
        { label: "مانو", val: "سكر خفيف (مانو)" },
        { label: "زيادة", val: "زيادة" }
      ] : [
        { label: "Medium", val: "Medium" },
        { label: "Plain / Black", val: "Plain" },
        { label: "Light", val: "Light" },
        { label: "Extra", val: "Extra" }
      ];

      sugarOptionsRow.innerHTML = sugarOptions.map(opt => `
        <button type="button" class="option-pill ${opt.val === modalSelectedSugar ? 'active' : ''}" data-sugar="${escapeHTML(opt.val)}">
          ${escapeHTML(opt.label)}
        </button>
      `).join("");

      sugarOptionsRow.querySelectorAll(".option-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          sugarOptionsRow.querySelectorAll(".option-pill").forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          modalSelectedSugar = pill.getAttribute("data-sugar");
        });
      });
    } else {
      // Completely hidden for all other items (juices, tea, herbs, smoothies, desserts, etc.)
      sugarGroup.style.display = "none";
      modalSelectedSugar = "";
      sugarOptionsRow.innerHTML = "";
    }
  }

  // Handle Dual Pricing (e.g. Mini Pancakes)
  if (item.isDualPrice && sizeGroup && sizeOptions) {
    sizeGroup.style.display = "flex";
    const p12Label = isAr ? uiText.ar.p12Label : uiText.en.p12Label;
    const p24Label = isAr ? uiText.ar.p24Label : uiText.en.p24Label;

    sizeOptions.innerHTML = `
      <button type="button" class="option-pill ${modalSelectedSize === '12' ? 'active' : ''}" data-size="12" data-price="${item.price12}">
        ${escapeHTML(p12Label)} (${item.price12} ${currency})
      </button>
      <button type="button" class="option-pill ${modalSelectedSize === '24' ? 'active' : ''}" data-size="24" data-price="${item.price24}">
        ${escapeHTML(p24Label)} (${item.price24} ${currency})
      </button>
    `;

    sizeOptions.querySelectorAll(".option-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        sizeOptions.querySelectorAll(".option-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        modalSelectedSize = pill.getAttribute("data-size");
        updateModalPrice();
      });
    });
  } else if (sizeGroup) {
    sizeGroup.style.display = "none";
  }

  updateModalPrice();
  modalBackdrop.classList.add("active");
  modalBackdrop.setAttribute("aria-hidden", "false");
}

function updateModalPrice() {
  if (!currentModalItem) return;
  const isAr = currentLang === "ar";
  const currency = isAr ? uiText.ar.currency : uiText.en.currency;
  const addPriceEl = document.getElementById("modalAddPrice");
  if (!addPriceEl) return;

  let unitPrice = currentModalItem.price || 0;
  if (currentModalItem.isDualPrice) {
    unitPrice = modalSelectedSize === "24" ? currentModalItem.price24 : currentModalItem.price12;
  }

  const total = unitPrice * modalQty;
  addPriceEl.textContent = `${total} ${currency}`;
}

function initItemModalEvents() {
  const modalBackdrop = document.getElementById("itemCustomModalBackdrop");
  const closeBtn = document.getElementById("closeCustomModalBtn");
  const plusBtn = document.getElementById("modalQtyPlus");
  const minusBtn = document.getElementById("modalQtyMinus");
  const confirmBtn = document.getElementById("confirmAddItemBtn");

  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener("click", () => {
      modalBackdrop.classList.remove("active");
      modalBackdrop.setAttribute("aria-hidden", "true");
    });

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove("active");
        modalBackdrop.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener("click", () => {
      modalQty++;
      document.getElementById("modalQtyVal").textContent = modalQty;
      updateModalPrice();
    });
  }

  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      if (modalQty > 1) {
        modalQty--;
        document.getElementById("modalQtyVal").textContent = modalQty;
        updateModalPrice();
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (!currentModalItem) return;
      const isAr = currentLang === "ar";
      const notesInput = document.getElementById("customItemNotes");
      const notes = notesInput ? notesInput.value.trim() : "";

      let unitPrice = currentModalItem.price || 0;
      let optionText = "";

      if (currentModalItem.isDualPrice) {
        unitPrice = modalSelectedSize === "24" ? currentModalItem.price24 : currentModalItem.price12;
        optionText = modalSelectedSize === "24"
          ? (isAr ? uiText.ar.p24Label : uiText.en.p24Label)
          : (isAr ? uiText.ar.p12Label : uiText.en.p12Label);
      }

      const sugarGroup = document.getElementById("customSugarGroup");
      const isSugarVisible = sugarGroup && sugarGroup.style.display !== "none";
      if (isSugarVisible && modalSelectedSugar) {
        const sugarText = (modalSelectedSugar.startsWith("سكر") || modalSelectedSugar.startsWith("بدون"))
          ? modalSelectedSugar
          : (isAr ? `سكر ${modalSelectedSugar}` : `Sugar: ${modalSelectedSugar}`);
        optionText += (optionText ? " • " : "") + sugarText;
      }

      addToOrder({
        id: currentModalItem.id + (modalSelectedSize ? `_${modalSelectedSize}` : ""),
        nameAr: currentModalItem.nameAr,
        nameEn: currentModalItem.nameEn,
        price: unitPrice,
        qty: modalQty,
        customOption: optionText,
        notes: notes
      });

      if (modalBackdrop) {
        modalBackdrop.classList.remove("active");
        modalBackdrop.setAttribute("aria-hidden", "true");
      }
    });
  }
}

/**
 * Order System Management
 */
function initOrderSystem() {
  const openDrawerBtn = document.getElementById("openOrderDrawerBtn");
  const closeDrawerBtn = document.getElementById("closeOrderDrawerBtn");
  const drawerBackdrop = document.getElementById("orderDrawerBackdrop");
  const clearBtn = document.getElementById("clearOrderBtn");
  const showWaiterBtn = document.getElementById("showWaiterCardBtn");

  if (openDrawerBtn && drawerBackdrop) {
    openDrawerBtn.addEventListener("click", () => {
      renderOrderDrawer();
      drawerBackdrop.classList.add("active");
      drawerBackdrop.setAttribute("aria-hidden", "false");
    });
  }

  if (closeDrawerBtn && drawerBackdrop) {
    closeDrawerBtn.addEventListener("click", () => {
      drawerBackdrop.classList.remove("active");
      drawerBackdrop.setAttribute("aria-hidden", "true");
    });

    drawerBackdrop.addEventListener("click", (e) => {
      if (e.target === drawerBackdrop) {
        drawerBackdrop.classList.remove("active");
        drawerBackdrop.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      orderItems = [];
      updateOrderUI();
      renderOrderDrawer();
    });
  }

  if (showWaiterBtn) {
    showWaiterBtn.addEventListener("click", showWaiterCardView);
  }

  // Dedicated Waiter Card Modal Interactions
  const waiterBackdrop = document.getElementById("waiterCardBackdrop");
  const closeWaiterBtn = document.getElementById("closeWaiterCardBtn");
  const backToEditBtn = document.getElementById("waiterBackToEditBtn");
  const waiterDoneBtn = document.getElementById("waiterOrderDoneBtn");
  const waiterCopyBtn = document.getElementById("waiterCopyBtn");

  if (closeWaiterBtn && waiterBackdrop) {
    closeWaiterBtn.addEventListener("click", () => {
      waiterBackdrop.classList.remove("active");
      waiterBackdrop.setAttribute("aria-hidden", "true");
    });

    waiterBackdrop.addEventListener("click", (e) => {
      if (e.target === waiterBackdrop) {
        waiterBackdrop.classList.remove("active");
        waiterBackdrop.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (backToEditBtn && waiterBackdrop && drawerBackdrop) {
    backToEditBtn.addEventListener("click", () => {
      waiterBackdrop.classList.remove("active");
      waiterBackdrop.setAttribute("aria-hidden", "true");
      renderOrderDrawer();
      drawerBackdrop.classList.add("active");
      drawerBackdrop.setAttribute("aria-hidden", "false");
    });
  }

  if (waiterDoneBtn && waiterBackdrop) {
    waiterDoneBtn.addEventListener("click", () => {
      const isAr = currentLang === "ar";
      orderItems = [];
      updateOrderUI();
      waiterBackdrop.classList.remove("active");
      waiterBackdrop.setAttribute("aria-hidden", "true");
      showAppToast(isAr ? uiText.ar.waiterDoneSuccess : uiText.en.waiterDoneSuccess);
    });
  }

  if (waiterCopyBtn) {
    waiterCopyBtn.addEventListener("click", () => {
      const isAr = currentLang === "ar";
      const currency = isAr ? uiText.ar.currency : uiText.en.currency;
      const tableInput = document.getElementById("tableNumberInput");
      const tableOrNotes = tableInput ? tableInput.value.trim() : "";
      const totalAmount = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
      const refEl = document.getElementById("waiterOrderRef");
      const refText = refEl ? refEl.textContent : "";

      let summary = `${isAr ? '☕ كارت طلب موكا كافيه' : '☕ MoKa Cafe Waiter Card'}\n`;
      if (refText) summary += `${refText}\n`;
      if (tableOrNotes) summary += `${isAr ? '📍 الطاولة / الملاحظات: ' : '📍 Table / Notes: '}${tableOrNotes}\n`;
      summary += `-----------------------------\n`;

      orderItems.forEach((item, idx) => {
        const name = isAr ? item.nameAr : (item.nameEn || item.nameAr);
        summary += `${idx + 1}. ${name} × ${item.qty} (${item.price * item.qty} ${currency})\n`;
        if (item.customOption) summary += `   ↳ ${item.customOption}\n`;
        if (item.notes) summary += `   ↳ ${isAr ? 'ملاحظة: ' : 'Note: '}${item.notes}\n`;
      });

      summary += `-----------------------------\n`;
      summary += `${isAr ? '💰 المجموع الكلي: ' : '💰 Grand Total: '}${totalAmount} ${currency}`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(summary).then(() => {
          showAppToast(isAr ? uiText.ar.copiedAlert : uiText.en.copiedAlert);
        });
      } else {
        showAppToast(isAr ? uiText.ar.copiedAlert : uiText.en.copiedAlert);
      }
    });
  }
}

function addToOrder(item) {
  // Check if item with same ID and same options already exists
  const existingIdx = orderItems.findIndex(it =>
    it.id === item.id && it.customOption === item.customOption && it.notes === item.notes
  );

  if (existingIdx > -1) {
    orderItems[existingIdx].qty += item.qty;
  } else {
    orderItems.push({ ...item });
  }

  updateOrderUI();

  // Temporary visual feedback on floating bar
  const bar = document.getElementById("floatingOrderBar");
  if (bar) {
    bar.style.transform = "translateX(-50%) scale(1.04)";
    setTimeout(() => {
      bar.style.transform = "translateX(-50%) scale(1)";
    }, 200);
  }
}

function updateOrderItemQty(index, delta) {
  if (!orderItems[index]) return;
  orderItems[index].qty += delta;
  if (orderItems[index].qty <= 0) {
    orderItems.splice(index, 1);
  }
  updateOrderUI();
  renderOrderDrawer();
}

function updateOrderUI() {
  const isAr = currentLang === "ar";
  const currency = isAr ? uiText.ar.currency : uiText.en.currency;

  const totalCount = orderItems.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const bar = document.getElementById("floatingOrderBar");
  const countBadge = document.getElementById("orderBarCount");
  const totalDisplay = document.getElementById("orderBarTotal");
  const drawerTotal = document.getElementById("drawerTotalAmount");

  if (countBadge) countBadge.textContent = totalCount;
  if (totalDisplay) totalDisplay.textContent = `${totalAmount} ${currency}`;
  if (drawerTotal) drawerTotal.textContent = `${totalAmount} ${currency}`;

  if (bar) {
    if (totalCount > 0) {
      bar.classList.add("visible");
    } else {
      bar.classList.remove("visible");
      const drawerBackdrop = document.getElementById("orderDrawerBackdrop");
      if (drawerBackdrop && drawerBackdrop.classList.contains("active")) {
        drawerBackdrop.classList.remove("active");
      }
    }
  }
}

function renderOrderDrawer() {
  const listContainer = document.getElementById("orderDrawerItemsList");
  if (!listContainer) return;

  const isAr = currentLang === "ar";
  const currency = isAr ? uiText.ar.currency : uiText.en.currency;

  if (orderItems.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-results" style="padding: 24px 0;">
        <p>${isAr ? escapeHTML(uiText.ar.emptyOrderText) : escapeHTML(uiText.en.emptyOrderText)}</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = orderItems.map((item, idx) => {
    const name = isAr ? item.nameAr : item.nameEn;
    const subtotal = item.price * item.qty;

    return `
      <div class="order-item-row">
        <div class="order-item-detail">
          <div class="order-item-name">${escapeHTML(name)}</div>
          ${item.customOption ? `<div class="order-item-custom-text">${escapeHTML(item.customOption)}</div>` : ''}
          ${item.notes ? `<div class="order-item-custom-text" style="color: var(--accent-copper);">📝 ${escapeHTML(item.notes)}</div>` : ''}
          <div class="order-item-price-unit">${item.price} ${currency} × ${item.qty} = <strong>${subtotal} ${currency}</strong></div>
        </div>
        <div class="order-item-controls">
          <div class="qty-stepper">
            <button type="button" class="stepper-btn" onclick="updateOrderItemQty(${idx}, -1)">−</button>
            <span class="stepper-val">${item.qty}</span>
            <button type="button" class="stepper-btn" onclick="updateOrderItemQty(${idx}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}



let currentOrderSessionId = null;

/**
 * Toast Notification Utility
 */
function showAppToast(message) {
  let toast = document.getElementById("appGlobalToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appGlobalToast";
    toast.className = "app-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  if (window._toastTimeout) clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/**
 * Show Waiter Card View (Dedicated Professional Digital Screen)
 */
function showWaiterCardView() {
  const isAr = currentLang === "ar";
  if (orderItems.length === 0) {
    showAppToast(isAr ? uiText.ar.emptyOrderText : uiText.en.emptyOrderText);
    return;
  }

  const currency = isAr ? uiText.ar.currency : uiText.en.currency;
  const tableInput = document.getElementById("tableNumberInput");
  const tableOrNotes = tableInput ? tableInput.value.trim() : "";
  const totalAmount = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalQty = orderItems.reduce((acc, item) => acc + item.qty, 0);

  // Generate or retain order reference code
  if (!currentOrderSessionId) {
    currentOrderSessionId = "MK-" + Math.floor(1000 + Math.random() * 9000);
  }

  const refEl = document.getElementById("waiterOrderRef");
  if (refEl) {
    refEl.textContent = `${isAr ? 'طلب' : 'Order'} #${currentOrderSessionId}`;
  }

  // Current order timestamp
  const timeEl = document.getElementById("waiterOrderTime");
  if (timeEl) {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString(isAr ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" });
  }

  // Table number or default label
  const tableDisplay = document.getElementById("waiterTableDisplay");
  if (tableDisplay) {
    if (tableOrNotes) {
      tableDisplay.textContent = tableOrNotes;
    } else {
      tableDisplay.textContent = isAr ? "طلب داخل الكافيه" : "Dine-in Order";
    }
  }

  // Table general notes callout (only if actual custom notes exist beyond just table designation)
  const notesBox = document.getElementById("waiterGeneralNotesBox");
  const notesContent = document.getElementById("waiterGeneralNotesText");
  if (notesBox && notesContent) {
    const isJustTable = /^(طاولة|table|takeaway|سفري|تيك\s*اواي|\d+)/i.test(tableOrNotes.trim()) && tableOrNotes.length <= 15;
    if (tableOrNotes && !isJustTable) {
      notesBox.classList.add("active");
      notesContent.textContent = tableOrNotes;
    } else {
      notesBox.classList.remove("active");
    }
  }

  // Render items in Waiter Card
  const itemsList = document.getElementById("waiterItemsList");
  if (itemsList) {
    itemsList.innerHTML = orderItems.map((item) => {
      const name = isAr ? item.nameAr : (item.nameEn || item.nameAr);
      const subName = isAr ? (item.nameEn || "") : (item.nameAr || "");
      return `
        <div class="waiter-item-row">
          <div class="waiter-item-main">
            <div class="waiter-item-name-wrap">
              <span class="waiter-item-qty-tag">×${item.qty}</span>
              <div style="display:flex; flex-direction:column; min-width:0;">
                <span class="waiter-item-title">${escapeHTML(name)}</span>
                ${subName ? `<span style="font-size:0.72rem; color:var(--text-muted);">${escapeHTML(subName)}</span>` : ""}
              </div>
            </div>
            <span class="waiter-item-price">${item.price * item.qty} <small style="font-size:0.75rem; font-weight:600;">${escapeHTML(currency)}</small></span>
          </div>
          ${(item.customOption || item.notes) ? `
            <div class="waiter-item-sub">
              ${item.customOption ? `<span class="waiter-item-pill">${escapeHTML(item.customOption)}</span>` : ""}
              ${item.notes ? `<div class="waiter-item-note-callout">📝 <strong>${isAr ? 'ملاحظة:' : 'Note:'}</strong> ${escapeHTML(item.notes)}</div>` : ""}
            </div>
          ` : ""}
        </div>
      `;
    }).join("");
  }

  // Total items count & grand total
  const countBadge = document.getElementById("waiterItemsCountBadge");
  if (countBadge) {
    countBadge.textContent = isAr ? `${totalQty} أصناف` : `${totalQty} Items`;
  }

  const grandTotalEl = document.getElementById("waiterGrandTotalDisplay");
  if (grandTotalEl) {
    grandTotalEl.textContent = `${totalAmount} ${currency}`;
  }

  // Close Order Drawer if open and show Waiter Card Modal
  const drawerBackdrop = document.getElementById("orderDrawerBackdrop");
  if (drawerBackdrop) {
    drawerBackdrop.classList.remove("active");
    drawerBackdrop.setAttribute("aria-hidden", "true");
  }

  const waiterBackdrop = document.getElementById("waiterCardBackdrop");
  if (waiterBackdrop) {
    waiterBackdrop.classList.add("active");
    waiterBackdrop.setAttribute("aria-hidden", "false");
  }
}

/**
 * Setup Bilingual Language Switcher (Arabic <-> English)
 */
function initLanguageToggle() {
  const langToggleBtn = document.getElementById("langToggleBtn");
  if (!langToggleBtn) return;

  langToggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";

    // Update HTML dir and lang
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    document.body.className = currentLang === "ar" ? "rtl-mode" : "ltr-mode";
    if (currentTheme === "light") document.body.classList.add("light-mode");

    // Toggle button label
    const labelSpan = langToggleBtn.querySelector(".lang-label");
    if (labelSpan) {
      labelSpan.textContent = currentLang === "ar" ? "English" : "عربي";
    }

    updateStaticTexts();
    renderCategoryNav();
    renderMenu();
    updateOrderUI();
  });
}

/**
 * Update All Static UI Labels Based On Active Language
 */
function updateStaticTexts() {
  const texts = uiText[currentLang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (texts[key]) {
      el.textContent = texts[key];
    }
  });

  const searchInput = document.getElementById("menuSearchInput");
  if (searchInput) {
    searchInput.placeholder = texts.searchPlaceholder;
  }

  // Refresh active table banner text for bilingual support
  const storedTable = sessionStorage.getItem("moka_customer_table");
  if (storedTable) {
    applyDetectedTable(storedTable);
  }
}

/**
 * Category Scroll Spy with IntersectionObserver Lifecycle Management
 */
function refreshScrollSpy() {
  if (scrollSpyObserver) {
    scrollSpyObserver.disconnect();
  }

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const activeTab = document.getElementById(`tab-${id}`);
        if (activeTab) {
          document.querySelectorAll(".nav-tab").forEach(t => {
            t.classList.remove("active");
            t.setAttribute("aria-current", "false");
          });
          activeTab.classList.add("active");
          activeTab.setAttribute("aria-current", "true");
          activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }
    });
  }, observerOptions);

  menuCategories.forEach(cat => {
    const el = document.getElementById(cat.id);
    if (el) scrollSpyObserver.observe(el);
  });
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * Dynamic QR Table Auto-Detection
 */
function initTableDetector() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let tableParam = urlParams.get("table") || urlParams.get("t") || urlParams.get("tab");

    if (tableParam) {
      tableParam = decodeURIComponent(tableParam).trim();
      sessionStorage.setItem("moka_customer_table", tableParam);
    } else {
      tableParam = sessionStorage.getItem("moka_customer_table");
    }

    if (tableParam) {
      applyDetectedTable(tableParam);
    }

    const clearBtn = document.getElementById("clearActiveTableBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        sessionStorage.removeItem("moka_customer_table");
        const banner = document.getElementById("activeTableBanner");
        if (banner) banner.style.display = "none";
        const tableInput = document.getElementById("tableNumberInput");
        if (tableInput) tableInput.value = "";
        showAppToast(currentLang === "ar" ? "تم إلغاء تثبيت رقم الطاولة" : "Table designation cleared");
      });
    }
  } catch (e) {
    console.warn("Table detection error:", e);
  }
}

function applyDetectedTable(tableParam) {
  if (!tableParam) return;
  const isAr = currentLang === "ar";
  const tableInput = document.getElementById("tableNumberInput");
  const banner = document.getElementById("activeTableBanner");
  const bannerText = document.getElementById("activeTableBannerText");

  let formatted = tableParam;
  if (/^\d+$/.test(tableParam)) {
    formatted = isAr ? `طاولة رقم ${tableParam}` : `Table #${tableParam}`;
  }

  if (tableInput) {
    tableInput.value = formatted;
  }

  if (banner && bannerText) {
    banner.style.display = "block";
    bannerText.textContent = isAr ? `📍 متصل بـ: ${formatted}` : `📍 Connected to: ${formatted}`;
  }
}

