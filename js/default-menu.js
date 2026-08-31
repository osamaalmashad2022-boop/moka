// ============================================================================
// MoKa Cafe — Shared Default Menu Data
// Single source of truth for all default categories and items.
// Used by both app.js (customer) and admin.js (admin panel).
// ============================================================================

/**
 * SVG icon map for category navigation (used by customer menu).
 * Keyed by category ID. Admin panel does not render these.
 */
export const CATEGORY_ICONS = {
  coffee: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
  hot_drinks: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9v12"></path><path d="M10 9v12"></path><path d="M14 9v12"></path><path d="M18 9v12"></path><path d="M2 9h20"></path><path d="M5 5c1-1 3-1 4 0s3 1 4 0 3-1 4 0"></path></svg>`,
  iced_drinks: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M17 10v12"></path><path d="M4 10h16"></path><path d="M6 10l1.5-7h9L18 10"></path></svg>`,
  fresh_juices: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"></path><path d="M5 6h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8a2 2 0 0 1 2-2z"></path><line x1="6" y1="12" x2="18" y2="12"></line></svg>`,
  cocktails: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"></path><path d="M12 15v6"></path><path d="M5 3l7 8 7-8z"></path></svg>`,
  smoothies: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v6a6 6 0 0 0 12 0V2"></path><path d="M12 14v8"></path><path d="M8 22h8"></path></svg>`,
  milkshakes: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v4a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V2"></path><path d="M6 10h12l-1.5 11h-9L6 10z"></path></svg>`,
  frappe: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="8" width="12" height="14" rx="2"></rect><path d="M9 8V5a3 3 0 0 1 6 0v3"></path></svg>`,
  soda: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M3 12h18"></path></svg>`,
  soft_drinks: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="4" width="10" height="16" rx="2"></rect><line x1="10" y1="2" x2="14" y2="2"></line></svg>`,
  ice_cream: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M7 10l5 12 5-12"></path></svg>`,
  yogurt: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16a1 1 0 0 1 1 1c0 5.5-4 9-9 9s-9-3.5-9-9a1 1 0 0 1 1-1z"></path><path d="M6 11V6a3 3 0 0 1 6 0v5"></path></svg>`,
  desserts: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 4h-4z"></path><path d="M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z"></path><path d="M4 14h16"></path></svg>`,
  waffles: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>`,
  mini_pancakes: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="9" ry="3"></ellipse><path d="M3 7v6c0 1.66 4.03 3 9 3s9-1.34 9-3V7"></path><path d="M3 13v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5"></path></svg>`
};

/**
 * Default fallback icon for categories not found in CATEGORY_ICONS.
 */
export const DEFAULT_CATEGORY_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>`;

/**
 * Complete default menu categories with all items.
 * This is the single source of truth — shared between customer and admin apps.
 * NOTE: The `icon` field is intentionally NOT included here.
 *       - Customer app (app.js) injects SVG icons from CATEGORY_ICONS.
 *       - Admin app (admin.js) uses its own simple string identifiers.
 */
export const DEFAULT_MENU_DATA = [
  {
    id: "coffee",
    titleAr: "القهوة", titleEn: "Specialty Coffee",
    descAr: "قهوة مختارة بعناية ومحضرة بأعلى معايير الإتقان",
    descEn: "Carefully selected beans brewed to perfection",
    heroImage: "assets/images/coffee.jpg",
    items: [
      { id: "c1", nameAr: "تركي سنجل", nameEn: "Turkish Single", price: 40, type: "coffee" },
      { id: "c2", nameAr: "تركي دبل", nameEn: "Turkish Double", price: 50, type: "coffee" },
      { id: "c3", nameAr: "تركي محوج سنجل", nameEn: "Spiced Turkish Single", price: 50, type: "coffee" },
      { id: "c4", nameAr: "تركي محوج دبل", nameEn: "Spiced Turkish Double", price: 60, type: "coffee" },
      { id: "c5", nameAr: "قهوة فرنساوي", nameEn: "French Coffee", price: 70, type: "coffee" },
      { id: "c6", nameAr: "قهوة بالبندق", nameEn: "Hazelnut Coffee", price: 80, badgeAr: "مميز", badgeEn: "Special", type: "coffee" },
      { id: "c7", nameAr: "قهوة بالنوتيلا", nameEn: "Nutella Coffee", price: 85, type: "coffee" },
      { id: "c8", nameAr: "إسبريسو سنجل", nameEn: "Espresso Single", price: 50, type: "coffee" },
      { id: "c9", nameAr: "إسبريسو دبل", nameEn: "Espresso Double", price: 70, type: "coffee" },
      { id: "c10", nameAr: "سبانش لاتيه", nameEn: "Spanish Latte", price: 95, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller", isBestseller: true, type: "coffee" },
      { id: "c11", nameAr: "لاتيه", nameEn: "Caffè Latte", price: 80, type: "coffee" },
      { id: "c12", nameAr: "دارك موكا", nameEn: "Dark Mocha", price: 80, type: "coffee" },
      { id: "c13", nameAr: "كابتشينو كلاسيكي", nameEn: "Classic Cappuccino", price: 80, type: "coffee" },
      { id: "c14", nameAr: "كابتشينو بالنكهات", nameEn: "Flavored Cappuccino", price: 90, type: "coffee" },
      { id: "c15", nameAr: "فلات وايت", nameEn: "Flat White", price: 80, type: "coffee" },
      { id: "c16", nameAr: "ماكياتو", nameEn: "Macchiato", price: 60, type: "coffee" },
      { id: "c17", nameAr: "لاتيه بالنكهات", nameEn: "Flavored Latte", price: 90, type: "coffee" },
      { id: "c18", nameAr: "كورتادو", nameEn: "Cortado", price: 80, type: "coffee" },
      { id: "c19", nameAr: "قهوة أمريكانو", nameEn: "Americano Coffee", price: 65, type: "coffee" },
      { id: "c20", nameAr: "وايت موكا", nameEn: "White Mocha", price: 85, type: "coffee" }
    ]
  },
  {
    id: "hot_drinks",
    titleAr: "المشروبات الساخنة", titleEn: "Hot Beverages",
    descAr: "مشروبات دافئة ولذيذة لأوقات الاسترخاء والراحة",
    descEn: "Soothing hot brews and traditional favorites",
    items: [
      { id: "h1", nameAr: "شاي", nameEn: "Tea", price: 25, type: "hot" },
      { id: "h2", nameAr: "شاي أخضر", nameEn: "Green Tea", price: 30, type: "hot" },
      { id: "h3", nameAr: "شاي بالنكهات (نعناع / قرنفل)", nameEn: "Mint / Clove Tea", price: 30, type: "hot" },
      { id: "h4", nameAr: "أعشاب (يانسون - نعناع - كركديه)", nameEn: "Herbal Infusion (Anise / Mint / Hibiscus)", price: 30, type: "hot" },
      { id: "h5", nameAr: "كوكتيل أعشاب", nameEn: "Mixed Herbal Cocktail", price: 50, type: "hot" },
      { id: "h6", nameAr: "قرفة بالحليب", nameEn: "Cinnamon with Milk", price: 60, type: "hot" },
      { id: "h7", nameAr: "شاي لاتيه", nameEn: "Tea Latte", price: 60, type: "hot" },
      { id: "h8", nameAr: "سحلب بالمكسرات", nameEn: "Sahlab with Nuts", price: 80, badgeAr: "مميز", badgeEn: "Special", isBestseller: true, type: "hot" },
      { id: "h9", nameAr: "سحلب بالفواكه", nameEn: "Sahlab with Fruits", price: 80, type: "hot" },
      { id: "h10", nameAr: "هوت شوكليت", nameEn: "Classic Hot Chocolate", price: 100, type: "hot" },
      { id: "h11", nameAr: "هوت شوكليت بالنوتيلا", nameEn: "Nutella Hot Chocolate", price: 75, type: "hot" },
      { id: "h12", nameAr: "وايت هوت شوكليت", nameEn: "White Hot Chocolate", price: 85, type: "hot" },
      { id: "h13", nameAr: "هوت سايدر", nameEn: "Hot Apple Cider", price: 60, type: "hot" },
      { id: "h14", nameAr: "نسكافيه بلاك", nameEn: "Nescafé Black", price: 70, type: "hot" },
      { id: "h15", nameAr: "نسكافيه بالحليب", nameEn: "Nescafé with Milk", price: 100, type: "hot" },
      { id: "h16", nameAr: "بليلة بالمكسرات", nameEn: "Belila with Nuts", price: 60, type: "hot" },
      { id: "h17", nameAr: "حمص الشام (حلبسة)", nameEn: "Hummus El Sham (Halabessa)", price: 60, type: "hot" }
    ]
  },
  {
    id: "iced_drinks",
    titleAr: "مشروبات مثلجة", titleEn: "Iced Drinks",
    descAr: "انتعاش القهوة والمشروبات الباردة بنكهات استثنائية",
    descEn: "Chilled specialty coffee and refreshing iced delights",
    items: [
      { id: "i1", nameAr: "آيس موكا", nameEn: "Iced Mocha", price: 90, type: "cold" },
      { id: "i2", nameAr: "آيس لاتيه", nameEn: "Iced Latte", price: 85, type: "cold" },
      { id: "i3", nameAr: "آيس لاتيه بالنكهات", nameEn: "Flavored Iced Latte", price: 95, type: "cold" },
      { id: "i4", nameAr: "آيس كوفي", nameEn: "Iced Coffee", price: 75, type: "cold" },
      { id: "i5", nameAr: "آيس شوكليت", nameEn: "Iced Chocolate", price: 90, type: "cold" },
      { id: "i6", nameAr: "آيس أمريكانو", nameEn: "Iced Americano", price: 80, type: "cold" },
      { id: "i7", nameAr: "وايت آيس موكا", nameEn: "Iced White Mocha", price: 95, type: "cold" },
      { id: "i8", nameAr: "آيس موكا بستاشيو", nameEn: "Iced Pistachio Mocha", price: 120, badgeAr: "فاخر", badgeEn: "Premium", isBestseller: true, type: "cold" },
      { id: "i9", nameAr: "آيس سبانش لاتيه", nameEn: "Iced Spanish Latte", price: 110, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller", isBestseller: true, type: "cold" },
      { id: "i10", nameAr: "آيس لاتيه بالنوتيلا", nameEn: "Nutella Iced Latte", price: 100, type: "cold" },
      { id: "i11", nameAr: "آيس كراميل ماكياتو", nameEn: "Iced Caramel Macchiato", price: 110, type: "cold" },
      { id: "i12", nameAr: "بلو آيس سبانش لاتيه", nameEn: "Blue Iced Spanish Latte", price: 120, badgeAr: "توقيع موكا", badgeEn: "MoKa Signature", isBestseller: true, type: "cold" }
    ]
  },
  {
    id: "fresh_juices",
    titleAr: "العصائر الطبيعية", titleEn: "Fresh Juices",
    descAr: "فواكه طبيعية طازجة ١٠٠٪ محضرة لحظة الطلب",
    descEn: "100% freshly pressed fruits and natural blends",
    heroImage: "assets/images/juices.jpg",
    items: [
      { id: "j1", nameAr: "مانجو", nameEn: "Fresh Mango", price: 80, badgeAr: "طبيعي", badgeEn: "Fresh", isBestseller: true, type: "cold" },
      { id: "j2", nameAr: "فراولة", nameEn: "Fresh Strawberry", price: 70, type: "cold" },
      { id: "j3", nameAr: "فراولة بالحليب", nameEn: "Strawberry with Milk", price: 80, type: "cold" },
      { id: "j4", nameAr: "جوافة", nameEn: "Fresh Guava", price: 70, type: "cold" },
      { id: "j5", nameAr: "جوافة بالحليب", nameEn: "Guava with Milk", price: 80, type: "cold" },
      { id: "j6", nameAr: "برتقال", nameEn: "Fresh Orange", price: 65, type: "cold" },
      { id: "j7", nameAr: "كيوي", nameEn: "Fresh Kiwi", price: 100, type: "cold" },
      { id: "j8", nameAr: "ليمون", nameEn: "Fresh Lemon", price: 50, type: "cold" },
      { id: "j9", nameAr: "ليمون بالنعناع", nameEn: "Lemon Mint", price: 60, badgeAr: "منعش", badgeEn: "Refreshing", isBestseller: true, type: "cold" },
      { id: "j10", nameAr: "أفوكادو", nameEn: "Fresh Avocado", price: 120, type: "cold" },
      { id: "j11", nameAr: "بطيخ", nameEn: "Fresh Watermelon", price: 70, type: "cold" },
      { id: "j12", nameAr: "موز بالحليب", nameEn: "Banana with Milk", price: 70, type: "cold" },
      { id: "j13", nameAr: "بلح بالحليب", nameEn: "Dates with Milk", price: 70, type: "cold" }
    ]
  },
  {
    id: "cocktails",
    titleAr: "الكوكتيل", titleEn: "Signature Cocktails",
    descAr: "خلطات موكا الحصرية من الفواكه الاستوائية والآيس كريم",
    descEn: "Signature fruit combinations and exotic layered blends",
    items: [
      { id: "ck1", nameAr: "فلوريدا", nameEn: "Florida", descAr: "فراولة، مانجو، جوافة", descEn: "Strawberry, Mango, Guava", price: 90, type: "cold" },
      { id: "ck2", nameAr: "هاواي", nameEn: "Hawaii", descAr: "مانجو، كيوي", descEn: "Mango, Kiwi", price: 100, type: "cold" },
      { id: "ck3", nameAr: "فور سيزون", nameEn: "Four Seasons", descAr: "مانجو، موز، فراولة", descEn: "Mango, Banana, Strawberry", price: 120, type: "cold" },
      { id: "ck4", nameAr: "بيناكولادا", nameEn: "Piña Colada", descAr: "أناناس، جوز هند", descEn: "Pineapple, Coconut Cream", price: 100, type: "cold" },
      { id: "ck5", nameAr: "تروبيكال", nameEn: "Tropical", descAr: "فراولة، بلوبيري، آيس كريم فانيليا", descEn: "Strawberry, Blueberry, Vanilla Ice Cream", price: 110, badgeAr: "مميز", badgeEn: "Special", type: "cold" },
      { id: "ck6", nameAr: "كوكتيل موكا", nameEn: "MoKa Cocktail", descAr: "أفوكادو، عسل، بلح، مكسرات فاخرة", descEn: "Avocado, Honey, Dates, Premium Nuts", price: 150, badgeAr: "توقيع موكا", badgeEn: "Signature", isBestseller: true, type: "cold" },
      { id: "ck7", nameAr: "ستار فريش", nameEn: "Star Fresh", descAr: "مانجو، بطيخ", descEn: "Mango, Watermelon", price: 100, type: "cold" }
    ]
  },
  {
    id: "smoothies",
    titleAr: "السموزي", titleEn: "Smoothies",
    descAr: "سموزي مثلج غني بالفواكه الطبيعية والنكهات المنعشة",
    descEn: "Icy, thick blended fruit smoothies",
    items: [
      { id: "sm1", nameAr: "سموزي مانجو", nameEn: "Mango Smoothie", price: 85, type: "cold" },
      { id: "sm2", nameAr: "سموزي فراولة", nameEn: "Strawberry Smoothie", price: 80, type: "cold" },
      { id: "sm3", nameAr: "سموزي خوخ", nameEn: "Peach Smoothie", price: 80, type: "cold" },
      { id: "sm4", nameAr: "سموزي ليمون", nameEn: "Lemon Smoothie", price: 70, type: "cold" },
      { id: "sm5", nameAr: "سموزي ليمون بالنعناع", nameEn: "Lemon Mint Smoothie", price: 80, type: "cold" },
      { id: "sm6", nameAr: "سموزي بطيخ", nameEn: "Watermelon Smoothie", price: 80, type: "cold" },
      { id: "sm7", nameAr: "سموزي مكس بيري", nameEn: "Mixed Berry Smoothie", price: 80, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller", isBestseller: true, type: "cold" },
      { id: "sm8", nameAr: "سموزي بلوبيري", nameEn: "Blueberry Smoothie", price: 80, type: "cold" },
      { id: "sm9", nameAr: "سموزي باشون فروت", nameEn: "Passion Fruit Smoothie", price: 80, badgeAr: "استوائي", badgeEn: "Tropical", type: "cold" },
      { id: "sm10", nameAr: "سموزي أناناس", nameEn: "Pineapple Smoothie", price: 80, type: "cold" },
      { id: "sm11", nameAr: "سموزي كيوي", nameEn: "Kiwi Smoothie", price: 110, type: "cold" }
    ]
  },
  {
    id: "milkshakes",
    titleAr: "ميلك شيك", titleEn: "Milkshakes",
    descAr: "شيك كريمي غني بأشهر الشوكولاتة والفواكه اللذيذة",
    descEn: "Rich, creamy milkshakes loaded with premium flavors",
    items: [
      { id: "ms1", nameAr: "بلوبيري شيك", nameEn: "Blueberry Shake", price: 100, type: "cold" },
      { id: "ms2", nameAr: "كيوي شيك", nameEn: "Kiwi Shake", price: 120, type: "cold" },
      { id: "ms3", nameAr: "فراولة شيك", nameEn: "Strawberry Shake", price: 100, type: "cold" },
      { id: "ms4", nameAr: "مانجو شيك", nameEn: "Mango Shake", price: 100, type: "cold" },
      { id: "ms5", nameAr: "أوريو شيك", nameEn: "Oreo Shake", price: 110, isBestseller: true, type: "cold" },
      { id: "ms6", nameAr: "كيت كات شيك", nameEn: "KitKat Shake", price: 130, type: "cold" },
      { id: "ms7", nameAr: "نوتيلا شيك", nameEn: "Nutella Shake", price: 110, isBestseller: true, type: "cold" },
      { id: "ms8", nameAr: "لوتس شيك", nameEn: "Lotus Shake", price: 120, badgeAr: "مفضل", badgeEn: "Favorite", isBestseller: true, type: "cold" },
      { id: "ms9", nameAr: "سنيكرز شيك", nameEn: "Snickers Shake", price: 130, type: "cold" },
      { id: "ms10", nameAr: "شوكليت شيك", nameEn: "Chocolate Shake", price: 100, type: "cold" },
      { id: "ms11", nameAr: "فانيليا شيك", nameEn: "Vanilla Shake", price: 100, type: "cold" },
      { id: "ms12", nameAr: "مالتيزرز شيك", nameEn: "Maltesers Shake", price: 130, type: "cold" },
      { id: "ms13", nameAr: "بستاشيو شيك", nameEn: "Pistachio Shake", price: 150, badgeAr: "فاخر", badgeEn: "Premium", isBestseller: true, type: "cold" },
      { id: "ms14", nameAr: "هوهوز شيك", nameEn: "HoHos Shake", price: 110, type: "cold" },
      { id: "ms15", nameAr: "توينكيز شيك", nameEn: "Twinkies Shake", price: 110, type: "cold" },
      { id: "ms16", nameAr: "كراميل شيك", nameEn: "Caramel Shake", price: 110, type: "cold" }
    ]
  },
  {
    id: "frappe",
    titleAr: "فرابيه", titleEn: "Frappes",
    descAr: "قهوة مخفوقة مثلجة ومزينة بالكريمة والنكهات اللذيذة",
    descEn: "Blended iced coffee topped with rich cream and drizzle",
    items: [
      { id: "fr1", nameAr: "فرابتشينو كلاسيك", nameEn: "Classic Frappuccino", price: 70, type: "cold" },
      { id: "fr2", nameAr: "فرابتشينو لوتس", nameEn: "Lotus Frappuccino", price: 90, type: "cold" },
      { id: "fr3", nameAr: "فرابتشينو كراميل", nameEn: "Caramel Frappuccino", price: 90, type: "cold" },
      { id: "fr4", nameAr: "فرابتشينو موكا", nameEn: "MoKa Frappuccino", price: 100, badgeAr: "توقيع موكا", badgeEn: "MoKa Signature", isBestseller: true, type: "cold" }
    ]
  },
  {
    id: "soda",
    titleAr: "الصودا والموخيتو", titleEn: "Mojitos & Soda",
    descAr: "موخيتو منعش بالنعناع والليمون وصودا منعشة ملونة",
    descEn: "Crisp sparkling mojitos and vibrant refreshing sodas",
    items: [
      { id: "sd1", nameAr: "موخيتو كلاسيك", nameEn: "Classic Mojito", price: 80, badgeAr: "منعش", badgeEn: "Refreshing", isBestseller: true, type: "cold" },
      { id: "sd2", nameAr: "موخيتو بالنكهات", nameEn: "Flavored Mojito", price: 90, type: "cold" },
      { id: "sd3", nameAr: "شيري كولا", nameEn: "Cherry Cola", price: 80, type: "cold" },
      { id: "sd4", nameAr: "باور صودا", nameEn: "Power Soda", price: 100, type: "cold" },
      { id: "sd5", nameAr: "سكاي بلو", nameEn: "Sky Blue Soda", price: 80, type: "cold" },
      { id: "sd6", nameAr: "هامر", nameEn: "Hammer Special", price: 120, badgeAr: "مميز", badgeEn: "Special", type: "cold" }
    ]
  },
  {
    id: "soft_drinks",
    titleAr: "المشروبات الغازية", titleEn: "Soft Drinks",
    descAr: "مشروبات الطاقة والغازية والمياه المعدنية",
    descEn: "Energy drinks, classic sodas, and bottled water",
    items: [
      { id: "sf1", nameAr: "ريد بول", nameEn: "Red Bull Energy Drink", price: 85, type: "cold" },
      { id: "sf2", nameAr: "بريل", nameEn: "Birell Malt", price: 50, type: "cold" },
      { id: "sf3", nameAr: "فيروز", nameEn: "Fayrouz Flavored Malt", price: 50, type: "cold" },
      { id: "sf4", nameAr: "ميرندا", nameEn: "Mirinda Orange / Apple", price: 35, type: "cold" },
      { id: "sf5", nameAr: "شويبس", nameEn: "Schweppes Tonic / Gold", price: 35, type: "cold" },
      { id: "sf6", nameAr: "سفن أب", nameEn: "7-Up", price: 35, type: "cold" },
      { id: "sf7", nameAr: "ماونتن ديو", nameEn: "Mountain Dew", price: 40, type: "cold" },
      { id: "sf8", nameAr: "بيبسي", nameEn: "Pepsi Cola", price: 35, type: "cold" },
      { id: "sf9", nameAr: "مياه معدنية", nameEn: "Mineral Water", price: 10, type: "cold" }
    ]
  },
  {
    id: "ice_cream",
    titleAr: "آيس كريم", titleEn: "Ice Cream",
    descAr: "بولات آيس كريم وسلطة الفواكه المنعشة",
    descEn: "Artisan ice cream scoops and rich fruit salads",
    items: [
      { id: "ic1", nameAr: "آيس كريم بولة", nameEn: "Ice Cream (1 Scoop)", price: 25, type: "cold" },
      { id: "ic2", nameAr: "آيس كريم 2 بولة", nameEn: "Ice Cream (2 Scoops)", price: 40, type: "cold" },
      { id: "ic3", nameAr: "آيس كريم 3 بولة", nameEn: "Ice Cream (3 Scoops)", price: 60, type: "cold" },
      { id: "ic4", nameAr: "آيس كريم بسكويت", nameEn: "Ice Cream Waffle Cone", price: 30, type: "cold" },
      { id: "ic5", nameAr: "سلطة فواكه (فروت سالاد)", nameEn: "Fresh Fruit Salad", price: 100, type: "cold" },
      { id: "ic6", nameAr: "سلطة فواكه بالآيس كريم", nameEn: "Fruit Salad with Ice Cream", price: 120, badgeAr: "مفضل", badgeEn: "Favorite", isBestseller: true, type: "cold" }
    ]
  },
  {
    id: "yogurt",
    titleAr: "الزبادي", titleEn: "Yogurt Bowls",
    descAr: "زبادي طبيعي صحي بالعسل والفواكه الطازجة",
    descEn: "Fresh wholesome yogurt bowls with honey and fruits",
    items: [
      { id: "yg1", nameAr: "زبادي بالعسل", nameEn: "Yogurt with Pure Honey", price: 70, type: "cold" },
      { id: "yg2", nameAr: "زبادي بالفواكه", nameEn: "Yogurt with Fresh Fruits", price: 90, badgeAr: "صحي", badgeEn: "Healthy", type: "cold" },
      { id: "yg3", nameAr: "زبادي بالنكهات", nameEn: "Flavored Yogurt", price: 90, type: "cold" }
    ]
  },
  {
    id: "desserts",
    titleAr: "الحلويات والكيك", titleEn: "Desserts & Cakes",
    descAr: "تشكيلة فاخرة من التشيز كيك والمولتن كيك وأم علي الشهية",
    descEn: "Decadent cheesecakes, molten lava cakes, and warm desserts",
    heroImage: "assets/images/desserts.jpg",
    items: [
      { id: "ds1", nameAr: "تشيز كيك (كراميل - فراولة - شوكولاتة - بلوبيري)", nameEn: "Cheesecake (Caramel / Strawberry / Chocolate / Blueberry)", price: 120, type: "desserts" },
      { id: "ds2", nameAr: "تشيز كيك لوتس", nameEn: "Lotus Biscoff Cheesecake", price: 140, isBestseller: true, type: "desserts" },
      { id: "ds3", nameAr: "تشيز كيك نوتيلا", nameEn: "Nutella Cheesecake", price: 130, type: "desserts" },
      { id: "ds4", nameAr: "تشيز كيك بستاشيو", nameEn: "Pistachio Cheesecake", price: 160, badgeAr: "فاخر", badgeEn: "Premium", isBestseller: true, type: "desserts" },
      { id: "ds5", nameAr: "شوكليت كيك", nameEn: "Fudge Chocolate Cake", price: 120, type: "desserts" },
      { id: "ds6", nameAr: "مولتن كيك شوكليت", nameEn: "Chocolate Molten Lava Cake", price: 110, isBestseller: true, type: "desserts" },
      { id: "ds7", nameAr: "مولتن كيك نوتيلا", nameEn: "Nutella Molten Lava Cake", price: 120, badgeAr: "مميز", badgeEn: "Special", isBestseller: true, type: "desserts" },
      { id: "ds8", nameAr: "مولتن كيك لوتس", nameEn: "Lotus Molten Lava Cake", price: 125, type: "desserts" },
      { id: "ds9", nameAr: "أم علي بالمكسرات", nameEn: "Warm Om Ali with Nuts", price: 110, type: "desserts" },
      { id: "ds10", nameAr: "أم علي باللوتس", nameEn: "Warm Om Ali with Lotus", price: 130, type: "desserts" },
      { id: "ds11", nameAr: "مادنس أوريو", nameEn: "Madness Oreo", price: 95, type: "desserts" },
      { id: "ds12", nameAr: "مادنس لوتس", nameEn: "Madness Lotus", price: 100, type: "desserts" },
      { id: "ds13", nameAr: "مادنس بالفواكه", nameEn: "Madness Fresh Fruits", price: 120, type: "desserts" },
      { id: "ds14", nameAr: "موس جلاكسي", nameEn: "Galaxy Chocolate Mousse", price: 130, type: "desserts" }
    ]
  },
  {
    id: "waffles",
    titleAr: "الوافل البلجيكي", titleEn: "Belgian Waffles",
    descAr: "وافل مقرمش وذهبي محضر طازج ومغطى بأجود الإضافات",
    descEn: "Crisp golden Belgian waffles loaded with decadent toppings",
    items: [
      { id: "wf1", nameAr: "وافل شوكليت", nameEn: "Chocolate Waffle", price: 100, type: "desserts" },
      { id: "wf2", nameAr: "وافل كراميل", nameEn: "Caramel Drizzle Waffle", price: 100, type: "desserts" },
      { id: "wf3", nameAr: "وافل نوتيلا", nameEn: "Nutella Waffle", price: 120, type: "desserts" },
      { id: "wf4", nameAr: "وافل لوتس", nameEn: "Lotus Biscoff Waffle", price: 130, type: "desserts" },
      { id: "wf5", nameAr: "وافل أوريو", nameEn: "Oreo Crumb Waffle", price: 140, type: "desserts" },
      { id: "wf6", nameAr: "وافل بستاشيو", nameEn: "Pistachio Cream Waffle", price: 170, badgeAr: "فاخر", badgeEn: "Premium", type: "desserts" },
      { id: "wf7", nameAr: "وافل مكس فروت", nameEn: "Mixed Fresh Fruits Waffle", price: 180, type: "desserts" },
      { id: "wf8", nameAr: "وافل فور سيزون", nameEn: "Four Seasons Waffle", descAr: "نوتيلا، لوتس، وايت شوكليت، كيندر", descEn: "Nutella, Lotus, White Choc, Kinder", price: 200, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller", isBestseller: true, type: "desserts" },
      { id: "wf9", nameAr: "وافل موكا", nameEn: "MoKa Signature Waffle", descAr: "فستق، كيندر، لوتس، أوريو", descEn: "Pistachio, Kinder, Lotus, Oreo", price: 210, badgeAr: "توقيع موكا", badgeEn: "Signature", isBestseller: true, type: "desserts" },
      { id: "wf10", nameAr: "وافل كيندر", nameEn: "Kinder Chocolate Waffle", price: 150, type: "desserts" },
      { id: "wf11", nameAr: "وافل وايت شوكليت", nameEn: "White Belgian Waffle", price: 120, type: "desserts" }
    ]
  },
  {
    id: "mini_pancakes",
    titleAr: "ميني بان كيك", titleEn: "Mini Pancakes",
    descAr: "حبات ميني بان كيك هشة وطرية بصلصات وحشوات غنية",
    descEn: "Fluffy bite-sized Dutch mini pancakes with rich toppings",
    isDualPrice: true,
    items: [
      { id: "mp1", nameAr: "بان كيك نوتيلا", nameEn: "Nutella Mini Pancakes", price12: 100, price24: 180, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller", isBestseller: true, type: "desserts" },
      { id: "mp2", nameAr: "بان كيك لوتس", nameEn: "Lotus Biscoff Mini Pancakes", price12: 120, price24: 200, type: "desserts" },
      { id: "mp3", nameAr: "بان كيك أوريو", nameEn: "Oreo Mini Pancakes", price12: 120, price24: 200, type: "desserts" },
      { id: "mp4", nameAr: "بان كيك فستق (بستاشيو)", nameEn: "Pistachio Mini Pancakes", price12: 110, price24: 190, badgeAr: "فاخر", badgeEn: "Premium", type: "desserts" },
      { id: "mp5", nameAr: "بان كيك كيندر", nameEn: "Kinder Mini Pancakes", price12: 140, price24: 220, type: "desserts" },
      { id: "mp6", nameAr: "بان كيك شوكليت", nameEn: "Chocolate Mini Pancakes", price12: 130, price24: 210, type: "desserts" },
      { id: "mp7", nameAr: "بان كيك كراميل", nameEn: "Caramel Mini Pancakes", price12: 90, price24: 160, type: "desserts" },
      { id: "mp8", nameAr: "بان كيك بالعسل", nameEn: "Honey Butter Mini Pancakes", price12: 90, price24: 160, type: "desserts" }
    ]
  }
];

/**
 * Get a deep copy of the default menu data with SVG icons injected.
 * Used by the customer-facing app (app.js).
 */
export function getDefaultMenuWithIcons() {
  return JSON.parse(JSON.stringify(DEFAULT_MENU_DATA)).map(cat => ({
    ...cat,
    icon: CATEGORY_ICONS[cat.id] || DEFAULT_CATEGORY_ICON
  }));
}

/**
 * Get a deep copy of the default menu data without SVG icons.
 * Used by the admin panel (admin.js).
 */
export function getDefaultMenuForAdmin() {
  return JSON.parse(JSON.stringify(DEFAULT_MENU_DATA)).map(cat => ({
    ...cat,
    icon: cat.id  // Simple string identifier for admin
  }));
}

export const DEFAULT_OFFER = {
  titleAr: "كومبو موكا المميز",
  titleEn: "MoKa Signature Combo",
  descAr: "سبانش لاتيه بارد أو ساخن + وافل بلجيكي فور سيزون بالنوتيلا واللوتس",
  descEn: "Spanish Latte (Hot/Iced) + Four Seasons Belgian Waffle with Nutella & Lotus",
  priceAr: "245 ج.م",
  priceEn: "245 EGP",
  originalAr: "295 ج.م",
  originalEn: "295 EGP",
  image: "assets/images/special_offers.jpg"
};

export const DEFAULT_SETTINGS = {
  whatsappNumber: "201000000000",
  instagramUrl: "https://instagram.com",
  whatsappUrl: "https://wa.me/201000000000",
  phoneNumber: "+201000000000",
  adminPin: "1234",
  cloudinaryCloudName: "qrif7qmf",
  cloudinaryUploadPreset: "moka menu",
  menuBaseUrl: "https://moka.osamaalmashad.workers.dev",
  wifiSsid: "MoKa Cafe Guest",
  wifiPass: "moka2026",
  tablesCount: 12
};

