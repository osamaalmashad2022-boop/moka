/**
 * MoKa Cafe Digital Menu Application Logic
 * Professional, high-performance, bilingual (Arabic RTL / English LTR) menu
 */

const menuCategories = [
  {
    id: "coffee",
    titleAr: "القهوة",
    titleEn: "Specialty Coffee",
    descAr: "قهوة مختارة بعناية ومحضرة بأعلى معايير الإتقان",
    descEn: "Carefully selected beans brewed to perfection",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
    heroImage: "assets/images/coffee.jpg",
    items: [
      { nameAr: "تركي سنجل", nameEn: "Turkish Single", price: 40 },
      { nameAr: "تركي دبل", nameEn: "Turkish Double", price: 50 },
      { nameAr: "تركي محوج سنجل", nameEn: "Spiced Turkish Single", price: 50 },
      { nameAr: "تركي محوج دبل", nameEn: "Spiced Turkish Double", price: 60 },
      { nameAr: "قهوة فرنساوي", nameEn: "French Coffee", price: 70 },
      { nameAr: "قهوة بندق", nameEn: "Hazelnut Coffee", price: 80, badgeAr: "مميز", badgeEn: "Special" },
      { nameAr: "قهوة نوتيلا", nameEn: "Nutella Coffee", price: 85 },
      { nameAr: "اسبرسو سنجل", nameEn: "Espresso Single", price: 50 },
      { nameAr: "اسبرسو دبل", nameEn: "Espresso Double", price: 70 },
      { nameAr: "سبانش لاتيه", nameEn: "Spanish Latte", price: 95, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller" },
      { nameAr: "لاتيه", nameEn: "Caffè Latte", price: 80 },
      { nameAr: "موكا دارك", nameEn: "Dark Mocha", price: 80 },
      { nameAr: "كابتشينو كلاسيك", nameEn: "Classic Cappuccino", price: 80 },
      { nameAr: "كابتشينو فليفر", nameEn: "Flavored Cappuccino", price: 90 },
      { nameAr: "فلات وايت", nameEn: "Flat White", price: 80 },
      { nameAr: "ميكاتو", nameEn: "Macchiato", price: 60 },
      { nameAr: "لاتيه فليفر", nameEn: "Flavored Latte", price: 90 },
      { nameAr: "كورتادو", nameEn: "Cortado", price: 80 },
      { nameAr: "أمريكان كوفي", nameEn: "Americano Coffee", price: 65 },
      { nameAr: "موكا وايت", nameEn: "White Mocha", price: 85 }
    ]
  },
  {
    id: "hot_drinks",
    titleAr: "المشروبات الساخنة",
    titleEn: "Hot Beverages",
    descAr: "مشروبات دافئة ولذيذة لأوقات الاسترخاء والراحة",
    descEn: "Soothing hot brews and traditional favorites",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9v12"></path><path d="M10 9v12"></path><path d="M14 9v12"></path><path d="M18 9v12"></path><path d="M2 9h20"></path><path d="M5 5c1-1 3-1 4 0s3 1 4 0 3-1 4 0"></path></svg>`,
    items: [
      { nameAr: "شاي", nameEn: "Tea", price: 25 },
      { nameAr: "شاي أخضر", nameEn: "Green Tea", price: 30 },
      { nameAr: "شاي نعناع (نعناع / قرنفل)", nameEn: "Mint / Clove Tea", price: 30 },
      { nameAr: "أعشاب (ينسون - نعناع - كركديه)", nameEn: "Herbal Infusion (Anise / Mint / Hibiscus)", price: 30 },
      { nameAr: "كوكتيل أعشاب", nameEn: "Mixed Herbal Cocktail", price: 50 },
      { nameAr: "قرفه حليب", nameEn: "Cinnamon with Milk", price: 60 },
      { nameAr: "تي لاتيه", nameEn: "Tea Latte", price: 60 },
      { nameAr: "سحلب مكسرات", nameEn: "Sahlab with Nuts", price: 80, badgeAr: "مميز", badgeEn: "Special" },
      { nameAr: "سحلب فواكه", nameEn: "Sahlab with Fruits", price: 80 },
      { nameAr: "هوت شوكليت", nameEn: "Classic Hot Chocolate", price: 100 },
      { nameAr: "هوت شوكليت نوتيلا", nameEn: "Nutella Hot Chocolate", price: 75 },
      { nameAr: "هوت شوكليت وايت", nameEn: "White Hot Chocolate", price: 85 },
      { nameAr: "هوت سيدر", nameEn: "Hot Apple Cider", price: 60 },
      { nameAr: "نسكافيه بلاك", nameEn: "Nescafé Black", price: 70 },
      { nameAr: "نسكافيه حليب", nameEn: "Nescafé with Milk", price: 100 },
      { nameAr: "بليله مكسرات", nameEn: "Belila with Nuts", price: 60 },
      { nameAr: "حمص الشام", nameEn: "Hummus El Sham (Halabessa)", price: 60 }
    ]
  },
  {
    id: "iced_drinks",
    titleAr: "مشروبات مثلجة",
    titleEn: "Iced Drinks",
    descAr: "انتعاش القهوة والمشروبات الباردة بنكهات استثنائية",
    descEn: "Chilled specialty coffee and refreshing iced delights",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M17 10v12"></path><path d="M4 10h16"></path><path d="M6 10l1.5-7h9L18 10"></path></svg>`,
    items: [
      { nameAr: "أيس موكا", nameEn: "Iced Mocha", price: 90 },
      { nameAr: "أيس لاتيه", nameEn: "Iced Latte", price: 85 },
      { nameAr: "أيس لاتيه فليفر", nameEn: "Flavored Iced Latte", price: 95 },
      { nameAr: "أيس كوفي", nameEn: "Iced Coffee", price: 75 },
      { nameAr: "أيس شوكليت", nameEn: "Iced Chocolate", price: 90 },
      { nameAr: "أيس أمريكان", nameEn: "Iced Americano", price: 80 },
      { nameAr: "أيس موكا وايت", nameEn: "Iced White Mocha", price: 95 },
      { nameAr: "أيس موكا بستاشيو", nameEn: "Iced Pistachio Mocha", price: 120, badgeAr: "فاخر", badgeEn: "Premium" },
      { nameAr: "أيس سبانش لاتيه", nameEn: "Iced Spanish Latte", price: 110, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller" },
      { nameAr: "نوتيلا أيس لاتيه", nameEn: "Nutella Iced Latte", price: 100 },
      { nameAr: "أيس كراميل ميكاتو", nameEn: "Iced Caramel Macchiato", price: 110 },
      { nameAr: "بلو أيس سبانش لاتيه", nameEn: "Blue Iced Spanish Latte", price: 120, badgeAr: "توقيع موكا", badgeEn: "MoKa Signature" }
    ]
  },
  {
    id: "fresh_juices",
    titleAr: "العصائر الطبيعية",
    titleEn: "Fresh Juices",
    descAr: "فواكه طبيعية طازجة ١٠٠٪ محضرة لحظة الطلب",
    descEn: "100% freshly pressed fruits and natural blends",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"></path><path d="M5 6h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8a2 2 0 0 1 2-2z"></path><line x1="6" y1="12" x2="18" y2="12"></line></svg>`,
    heroImage: "assets/images/juices.jpg",
    items: [
      { nameAr: "مانجو", nameEn: "Fresh Mango", price: 80, badgeAr: "طبيعي", badgeEn: "Fresh" },
      { nameAr: "فراوله", nameEn: "Fresh Strawberry", price: 70 },
      { nameAr: "فراوله حليب", nameEn: "Strawberry with Milk", price: 80 },
      { nameAr: "جوافه", nameEn: "Fresh Guava", price: 70 },
      { nameAr: "جوافه حليب", nameEn: "Guava with Milk", price: 80 },
      { nameAr: "برتقال", nameEn: "Fresh Orange", price: 65 },
      { nameAr: "كيوي", nameEn: "Fresh Kiwi", price: 100 },
      { nameAr: "ليمون", nameEn: "Fresh Lemon", price: 50 },
      { nameAr: "ليمون نعناع", nameEn: "Lemon Mint", price: 60, badgeAr: "منعش", badgeEn: "Refreshing" },
      { nameAr: "أفوكادو", nameEn: "Fresh Avocado", price: 120 },
      { nameAr: "بطيخ", nameEn: "Fresh Watermelon", price: 70 },
      { nameAr: "موز باللبن", nameEn: "Banana with Milk", price: 70 },
      { nameAr: "بلح باللبن", nameEn: "Dates with Milk", price: 70 }
    ]
  },
  {
    id: "cocktails",
    titleAr: "الكوكتيل",
    titleEn: "Signature Cocktails",
    descAr: "خلطات موكا الحصرية من الفواكه الاستوائية والأيس كريم",
    descEn: "Signature fruit combinations and exotic layered blends",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"></path><path d="M12 15v6"></path><path d="M5 3l7 8 7-8z"></path></svg>`,
    items: [
      { nameAr: "فلوريدا", nameEn: "Florida", descAr: "فراولة، مانجو، جوافة", descEn: "Strawberry, Mango, Guava", price: 90 },
      { nameAr: "هاواي", nameEn: "Hawaii", descAr: "مانجو، كيوي", descEn: "Mango, Kiwi", price: 100 },
      { nameAr: "فور سيزون", nameEn: "Four Seasons", descAr: "مانجو، موز، فراولة", descEn: "Mango, Banana, Strawberry", price: 120 },
      { nameAr: "بنكولادا", nameEn: "Piña Colada", descAr: "أناناس، جوز هند", descEn: "Pineapple, Coconut Cream", price: 100 },
      { nameAr: "تروبيكال", nameEn: "Tropical", descAr: "فراولة، بلوبيري، أيس كريم فانيليا", descEn: "Strawberry, Blueberry, Vanilla Ice Cream", price: 110, badgeAr: "مميز", badgeEn: "Special" },
      { nameAr: "كوكتيل موكا", nameEn: "MoKa Cocktail", descAr: "أفوكادو، عسل، بلح، مكسرات فاخرة", descEn: "Avocado, Honey, Dates, Premium Nuts", price: 150, badgeAr: "توقيع موكا", badgeEn: "Signature" },
      { nameAr: "ستار فريش", nameEn: "Star Fresh", descAr: "مانجو، بطيخ", descEn: "Mango, Watermelon", price: 100 }
    ]
  },
  {
    id: "smoothies",
    titleAr: "السموزي",
    titleEn: "Smoothies",
    descAr: "سموزي مثلج غني بالفواكه الطبيعية والنكهات المنعشة",
    descEn: "Icy, thick blended fruit smoothies",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v6a6 6 0 0 0 12 0V2"></path><path d="M12 14v8"></path><path d="M8 22h8"></path></svg>`,
    items: [
      { nameAr: "سموزي مانجو", nameEn: "Mango Smoothie", price: 85 },
      { nameAr: "سموزي فراولة", nameEn: "Strawberry Smoothie", price: 80 },
      { nameAr: "سموزي خوخ", nameEn: "Peach Smoothie", price: 80 },
      { nameAr: "سموزي ليمون", nameEn: "Lemon Smoothie", price: 70 },
      { nameAr: "سموزي ليمون نعناع", nameEn: "Lemon Mint Smoothie", price: 80 },
      { nameAr: "سموزي بطيخ", nameEn: "Watermelon Smoothie", price: 80 },
      { nameAr: "سموزي مكس بري", nameEn: "Mixed Berry Smoothie", price: 80, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller" },
      { nameAr: "سموزي بلوبيري", nameEn: "Blueberry Smoothie", price: 80 },
      { nameAr: "سموزي باشون فروت", nameEn: "Passion Fruit Smoothie", price: 80, badgeAr: "استوائي", badgeEn: "Tropical" },
      { nameAr: "سموزي أناناس", nameEn: "Pineapple Smoothie", price: 80 },
      { nameAr: "سموزي كيوي", nameEn: "Kiwi Smoothie", price: 110 }
    ]
  },
  {
    id: "milkshakes",
    titleAr: "ميلك شيك",
    titleEn: "Milkshakes",
    descAr: "شيك كريمي غني بأشهر الشوكولاتة والفواكه اللذيذة",
    descEn: "Rich, creamy milkshakes loaded with premium flavors",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v4a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V2"></path><path d="M6 10h12l-1.5 11h-9L6 10z"></path></svg>`,
    items: [
      { nameAr: "بلوبيري شيك", nameEn: "Blueberry Shake", price: 100 },
      { nameAr: "كيوي شيك", nameEn: "Kiwi Shake", price: 120 },
      { nameAr: "فراولة شيك", nameEn: "Strawberry Shake", price: 100 },
      { nameAr: "مانجو شيك", nameEn: "Mango Shake", price: 100 },
      { nameAr: "أوريو شيك", nameEn: "Oreo Shake", price: 110 },
      { nameAr: "كيت كات شيك", nameEn: "KitKat Shake", price: 130 },
      { nameAr: "نوتيلا شيك", nameEn: "Nutella Shake", price: 110 },
      { nameAr: "لوتس شيك", nameEn: "Lotus Shake", price: 120, badgeAr: "مفضل", badgeEn: "Favorite" },
      { nameAr: "سنيكرز شيك", nameEn: "Snickers Shake", price: 130 },
      { nameAr: "شوكليت شيك", nameEn: "Chocolate Shake", price: 100 },
      { nameAr: "فانيليا شيك", nameEn: "Vanilla Shake", price: 100 },
      { nameAr: "مالتيزر شيك", nameEn: "Maltesers Shake", price: 130 },
      { nameAr: "بستاشيو شيك", nameEn: "Pistachio Shake", price: 150, badgeAr: "فاخر", badgeEn: "Premium" },
      { nameAr: "هوهوز شيك", nameEn: "HoHos Shake", price: 110 },
      { nameAr: "توينكيز شيك", nameEn: "Twinkies Shake", price: 110 },
      { nameAr: "كراميل شيك", nameEn: "Caramel Shake", price: 110 }
    ]
  },
  {
    id: "frappe",
    titleAr: "فرابيه",
    titleEn: "Frappes",
    descAr: "قهوة مخفوقة مثلجة ومزينة بالكريمة والنكهات اللذيذة",
    descEn: "Blended iced coffee topped with rich cream and drizzle",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="8" width="12" height="14" rx="2"></rect><path d="M9 8V5a3 3 0 0 1 6 0v3"></path></svg>`,
    items: [
      { nameAr: "فرابتشينو", nameEn: "Classic Frappuccino", price: 70 },
      { nameAr: "فرابتشينو لوتس", nameEn: "Lotus Frappuccino", price: 90 },
      { nameAr: "فرابتشينو كراميل", nameEn: "Caramel Frappuccino", price: 90 },
      { nameAr: "فرابتشينو موكا", nameEn: "MoKa Frappuccino", price: 100, badgeAr: "توقيع موكا", badgeEn: "MoKa Signature" }
    ]
  },
  {
    id: "soda",
    titleAr: "الصودا والموخيتو",
    titleEn: "Mojitos & Soda",
    descAr: "موخيتو منعش بالنعناع والليمون وصودا منعشة ملونة",
    descEn: "Crisp sparkling mojitos and vibrant refreshing sodas",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M3 12h18"></path></svg>`,
    items: [
      { nameAr: "موخيتو كلاسيك", nameEn: "Classic Mojito", price: 80, badgeAr: "منعش", badgeEn: "Refreshing" },
      { nameAr: "موخيتو فليفر", nameEn: "Flavored Mojito", price: 90 },
      { nameAr: "شيري كولا", nameEn: "Cherry Cola", price: 80 },
      { nameAr: "باور صودا", nameEn: "Power Soda", price: 100 },
      { nameAr: "سكاي بلو", nameEn: "Sky Blue Soda", price: 80 },
      { nameAr: "هامر", nameEn: "Hammer Special", price: 120, badgeAr: "مميز", badgeEn: "Special" }
    ]
  },
  {
    id: "soft_drinks",
    titleAr: "المشروبات الغازية",
    titleEn: "Soft Drinks",
    descAr: "مشروبات الطاقة والغازية والمياه المعدنية",
    descEn: "Energy drinks, classic sodas, and bottled water",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="4" width="10" height="16" rx="2"></rect><line x1="10" y1="2" x2="14" y2="2"></line></svg>`,
    items: [
      { nameAr: "ريد بول", nameEn: "Red Bull Energy Drink", price: 85 },
      { nameAr: "بريل", nameEn: "Birell Malt", price: 50 },
      { nameAr: "فيروز", nameEn: "Fayrouz Flavored Malt", price: 50 },
      { nameAr: "ميرندا", nameEn: "Mirinda Orange / Apple", price: 35 },
      { nameAr: "شويبس", nameEn: "Schweppes Tonic / Gold", price: 35 },
      { nameAr: "سيفن اب", nameEn: "7-Up", price: 35 },
      { nameAr: "ديو", nameEn: "Mountain Dew", price: 40 },
      { nameAr: "بيبسي", nameEn: "Pepsi Cola", price: 35 },
      { nameAr: "مياه معدنية", nameEn: "Mineral Water", price: 10 }
    ]
  },
  {
    id: "ice_cream",
    titleAr: "أيس كريم",
    titleEn: "Ice Cream",
    descAr: "بولات أيس كريم وسلطة الفواكه المنعشة",
    descEn: "Artisan ice cream scoops and rich fruit salads",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M7 10l5 12 5-12"></path></svg>`,
    items: [
      { nameAr: "أيس كريم بوله", nameEn: "Ice Cream (1 Scoop)", price: 25 },
      { nameAr: "أيس كريم 2 بوله", nameEn: "Ice Cream (2 Scoops)", price: 40 },
      { nameAr: "أيس كريم 3 بوله", nameEn: "Ice Cream (3 Scoops)", price: 60 },
      { nameAr: "أيس كريم بسكوت", nameEn: "Ice Cream Waffle Cone", price: 30 },
      { nameAr: "فروت سلاط", nameEn: "Fresh Fruit Salad", price: 100 },
      { nameAr: "أيس فروت سلاط", nameEn: "Fruit Salad with Ice Cream", price: 120, badgeAr: "مفضل", badgeEn: "Favorite" }
    ]
  },
  {
    id: "yogurt",
    titleAr: "الزبادي",
    titleEn: "Yogurt Bowls",
    descAr: "زبادي طبيعي صحي بالعسل والفواكه الطازجة",
    descEn: "Fresh wholesome yogurt bowls with honey and fruits",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16a1 1 0 0 1 1 1c0 5.5-4 9-9 9s-9-3.5-9-9a1 1 0 0 1 1-1z"></path><path d="M6 11V6a3 3 0 0 1 6 0v5"></path></svg>`,
    items: [
      { nameAr: "زبادي عسل", nameEn: "Yogurt with Pure Honey", price: 70 },
      { nameAr: "زبادي فواكه", nameEn: "Yogurt with Fresh Fruits", price: 90, badgeAr: "صحي", badgeEn: "Healthy" },
      { nameAr: "زبادي فليفر", nameEn: "Flavored Yogurt", price: 90 }
    ]
  },
  {
    id: "desserts",
    titleAr: "ديزرت والحلويات",
    titleEn: "Desserts & Cakes",
    descAr: "تشكيلة فاخرة من التشيز كيك والمولتن كيك وأم علي الشهية",
    descEn: "Decadent cheesecakes, molten lava cakes, and warm desserts",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 4h-4z"></path><path d="M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z"></path><path d="M4 14h16"></path></svg>`,
    heroImage: "assets/images/desserts.jpg",
    items: [
      { nameAr: "تشيز كيك (كراميل - فراوله - شوكولاته - بلوبيري)", nameEn: "Cheesecake (Caramel / Strawberry / Chocolate / Blueberry)", price: 120 },
      { nameAr: "تشيز كيك لوتس", nameEn: "Lotus Biscoff Cheesecake", price: 140 },
      { nameAr: "تشيز كيك نوتيلا", nameEn: "Nutella Cheesecake", price: 130 },
      { nameAr: "تشيز كيك بستاشيو", nameEn: "Pistachio Cheesecake", price: 160, badgeAr: "فاخر", badgeEn: "Premium" },
      { nameAr: "شوكليت كيك", nameEn: "Fudge Chocolate Cake", price: 120 },
      { nameAr: "مولتن كيك شوكلت", nameEn: "Chocolate Molten Lava Cake", price: 110 },
      { nameAr: "مولتن كيك نوتيلا", nameEn: "Nutella Molten Lava Cake", price: 120, badgeAr: "مميز", badgeEn: "Special" },
      { nameAr: "مولتن كيك لوتس", nameEn: "Lotus Molten Lava Cake", price: 125 },
      { nameAr: "أم علي مكسرات", nameEn: "Warm Om Ali with Nuts", price: 110 },
      { nameAr: "أم علي لوتس", nameEn: "Warm Om Ali with Lotus", price: 130 },
      { nameAr: "مادنس أوريو", nameEn: "Madness Oreo", price: 95 },
      { nameAr: "مادنس لوتس", nameEn: "Madness Lotus", price: 100 },
      { nameAr: "مادنس فواكه", nameEn: "Madness Fresh Fruits", price: 120 },
      { nameAr: "موسي جلاكسي", nameEn: "Galaxy Chocolate Mousse", price: 130 }
    ]
  },
  {
    id: "waffles",
    titleAr: "الوافل البلجيكي",
    titleEn: "Belgian Waffles",
    descAr: "وافل مقرمش وذهبي محضر طازج ومغطى بأجود الإضافات",
    descEn: "Crisp golden Belgian waffles loaded with decadent toppings",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>`,
    items: [
      { nameAr: "وافل شوكلت", nameEn: "Chocolate Waffle", price: 100 },
      { nameAr: "وافل كراميل", nameEn: "Caramel Drizzle Waffle", price: 100 },
      { nameAr: "وافل نوتيلا", nameEn: "Nutella Waffle", price: 120 },
      { nameAr: "وافل لوتس", nameEn: "Lotus Biscoff Waffle", price: 130 },
      { nameAr: "وافل أوريو", nameEn: "Oreo Crumb Waffle", price: 140 },
      { nameAr: "وافل بستاشيو", nameEn: "Pistachio Cream Waffle", price: 170, badgeAr: "فاخر", badgeEn: "Premium" },
      { nameAr: "وافل مكس فرت", nameEn: "Mixed Fresh Fruits Waffle", price: 180 },
      { nameAr: "وافل فور سيزون", nameEn: "Four Seasons Waffle", descAr: "نوتيلا، لوتس، وايت شوكليت، كيندر", descEn: "Nutella, Lotus, White Choc, Kinder", price: 200, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller" },
      { nameAr: "وافل موكا", nameEn: "MoKa Signature Waffle", descAr: "فستق، كيندر، لوتس، أوريو", descEn: "Pistachio, Kinder, Lotus, Oreo", price: 210, badgeAr: "توقيع موكا", badgeEn: "Signature" },
      { nameAr: "وافل كيندر", nameEn: "Kinder Chocolate Waffle", price: 150 },
      { nameAr: "وافل وايت", nameEn: "White Belgian Waffle", price: 120 }
    ]
  },
  {
    id: "mini_pancakes",
    titleAr: "ميني بان كيك",
    titleEn: "Mini Pancakes",
    descAr: "حبات ميني بان كيك هشة وطرية بصلصات وحشوات غنية",
    descEn: "Fluffy bite-sized Dutch mini pancakes with rich toppings",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="9" ry="3"></ellipse><path d="M3 7v6c0 1.66 4.03 3 9 3s9-1.34 9-3V7"></path><path d="M3 13v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5"></path></svg>`,
    isDualPrice: true,
    items: [
      { nameAr: "بان كيك نوتيلا", nameEn: "Nutella Mini Pancakes", price12: 100, price24: 180, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller" },
      { nameAr: "بان كيك لوتس", nameEn: "Lotus Biscoff Mini Pancakes", price12: 120, price24: 200 },
      { nameAr: "بان كيك أوريو", nameEn: "Oreo Mini Pancakes", price12: 120, price24: 200 },
      { nameAr: "بان كيك فستق", nameEn: "Pistachio Mini Pancakes", price12: 110, price24: 190, badgeAr: "فاخر", badgeEn: "Premium" },
      { nameAr: "بان كيك كيندر", nameEn: "Kinder Mini Pancakes", price12: 140, price24: 220 },
      { nameAr: "بان كيك شوكلت", nameEn: "Chocolate Mini Pancakes", price12: 130, price24: 210 },
      { nameAr: "بان كيك كراميل", nameEn: "Caramel Mini Pancakes", price12: 90, price24: 160 },
      { nameAr: "بان كيك عسل", nameEn: "Honey Butter Mini Pancakes", price12: 90, price24: 160 }
    ]
  }
];

// App State
let currentLang = "ar"; // "ar" | "en"
let activeSearchQuery = "";
let scrollSpyObserver = null;

// UI Text Dictionary for UI labels
const uiText = {
  ar: {
    heroBadge: "قهوة وحلويات فاخرة",
    cafeName: "موكا كافيه",
    cafeSub: "MoKa Cafe",
    tagline: "قهوة مميزة • عصائر طازجة • وافل وحلويات فاخرة",
    specialOfferBadge: "عرض خاص",
    specialOfferTitle: "كومبو موكا المميز",
    specialOfferDesc: "سبانش لاتيه بارد أو حار + وافل بلجيكي فور سيزون بالنوتيلا واللوتس",
    specialOfferPrice: "245 ج.م",
    specialOfferOriginal: "295 ج.م",
    searchPlaceholder: "ابحث في قائمة المشروبات والحلويات...",
    currency: "ج.م",
    p12Label: "١٢ قطعة",
    p24Label: "٢٤ قطعة",
    noResults: "عفواً، لا توجد عناصر تطابق بحثك.",
    contactTitle: "تواصل معنا",
    rightsReserved: "جميع الحقوق محفوظة © موكا كافيه",
    craftedWith: "صُنع بـ ❤️ لزبائن موكا كافيه",
    allCategories: "الكل"
  },
  en: {
    heroBadge: "Artisanal Coffee & Sweets",
    cafeName: "MoKa Cafe",
    cafeSub: "موكا كافيه",
    tagline: "Artisanal Coffee • Fresh Juices • Belgian Waffles & Fine Desserts",
    specialOfferBadge: "Special Offer",
    specialOfferTitle: "MoKa Signature Combo",
    specialOfferDesc: "Spanish Latte (Hot/Iced) + Four Seasons Belgian Waffle with Nutella & Lotus",
    specialOfferPrice: "245 EGP",
    specialOfferOriginal: "295 EGP",
    searchPlaceholder: "Search drinks, desserts, waffles...",
    currency: "EGP",
    p12Label: "12 Pcs",
    p24Label: "24 Pcs",
    noResults: "Sorry, no items matched your search.",
    contactTitle: "Connect With Us",
    rightsReserved: "All rights reserved © MoKa Cafe",
    craftedWith: "Crafted with ❤️ for MoKa Cafe guests",
    allCategories: "All"
  }
};

/**
 * Sanitize & escape HTML strings defensively (XSS Protection)
 */
function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Initialize Application
 */
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryNav();
  renderMenu();
  initSearch();
  initLanguageToggle();
  initBackToTop();
  initSocialFeedback();
  updateStaticTexts();
});

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
        // Calculate offset for sticky headers
        const headerOffset = 135;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Set active tab styling & accessibility state
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
    // Filter items if searching
    const filteredItems = cat.items.filter(item => {
      if (!activeSearchQuery) return true;
      const q = activeSearchQuery.toLowerCase().trim();
      const matchAr = item.nameAr.toLowerCase().includes(q) || (item.descAr && item.descAr.toLowerCase().includes(q));
      const matchEn = item.nameEn.toLowerCase().includes(q) || (item.descEn && item.descEn.toLowerCase().includes(q));
      return matchAr || matchEn;
    });

    if (filteredItems.length === 0) return "";

    totalVisibleItems += filteredItems.length;

    const title = isAr ? cat.titleAr : cat.titleEn;
    const desc = isAr ? cat.descAr : cat.descEn;

    // Optional category hero banner with semantic h3 heading
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
          <div class="menu-item dual-price-item">
            <div class="item-info">
              <div class="item-header-line">
                <h4 class="item-name">${escapeHTML(name)}</h4>
                ${badge ? `<span class="item-badge">${escapeHTML(badge)}</span>` : ''}
              </div>
              <span class="item-subname">${escapeHTML(subName)}</span>
              ${itemDesc ? `<p class="item-description">${escapeHTML(itemDesc)}</p>` : ''}
            </div>
            <div class="dual-prices">
              <div class="price-chip">
                <span class="chip-qty">${escapeHTML(p12Label)}</span>
                <span class="chip-cost">${item.price12} <small>${escapeHTML(currency)}</small></span>
              </div>
              <div class="price-chip featured-chip">
                <span class="chip-qty">${escapeHTML(p24Label)}</span>
                <span class="chip-cost">${item.price24} <small>${escapeHTML(currency)}</small></span>
              </div>
            </div>
          </div>
        `;
      }

      // Standard item
      return `
        <div class="menu-item">
          <div class="item-info">
            <div class="item-header-line">
              <h4 class="item-name">${escapeHTML(name)}</h4>
              ${badge ? `<span class="item-badge">${escapeHTML(badge)}</span>` : ''}
            </div>
            <span class="item-subname">${escapeHTML(subName)}</span>
            ${itemDesc ? `<p class="item-description">${escapeHTML(itemDesc)}</p>` : ''}
          </div>
          <div class="item-price">
            <span class="price-val">${item.price}</span>
            <span class="price-curr">${escapeHTML(currency)}</span>
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
      </div>
    `;
  } else {
    container.innerHTML = sectionsHtml;
  }

  // Update screen reader live announcer
  const announcer = document.getElementById("searchAnnouncer");
  if (announcer) {
    if (activeSearchQuery) {
      announcer.textContent = isAr 
        ? `تم العثور على ${totalVisibleItems} عنصر`
        : `Found ${totalVisibleItems} items matching search`;
    } else {
      announcer.textContent = "";
    }
  }

  // Refresh ScrollSpy observer after DOM injection
  refreshScrollSpy();
}

/**
 * Setup Real-time Instant Search with Escape Key Support
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

    // Toggle button label
    const labelSpan = langToggleBtn.querySelector(".lang-label");
    if (labelSpan) {
      labelSpan.textContent = currentLang === "ar" ? "English" : "عربي";
    }

    updateStaticTexts();
    renderCategoryNav();
    renderMenu();
  });
}

/**
 * Update All Static UI Labels Based On Active Language
 */
function updateStaticTexts() {
  const texts = uiText[currentLang];
  
  // Update elements with data-i18n attributes
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (texts[key]) {
      el.textContent = texts[key];
    }
  });

  // Update placeholders
  const searchInput = document.getElementById("menuSearchInput");
  if (searchInput) {
    searchInput.placeholder = texts.searchPlaceholder;
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

  // Observe all currently rendered menu sections
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
    if (window.scrollY > 400) {
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
 * Social Links Feedback
 */
function initSocialFeedback() {
  document.querySelectorAll(".social-icon-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}
