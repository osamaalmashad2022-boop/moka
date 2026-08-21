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
      { id: "c1", nameAr: "تركي سنجل", nameEn: "Turkish Single", price: 40, type: "coffee" },
      { id: "c2", nameAr: "تركي دبل", nameEn: "Turkish Double", price: 50, type: "coffee" },
      { id: "c3", nameAr: "تركي محوج سنجل", nameEn: "Spiced Turkish Single", price: 50, type: "coffee" },
      { id: "c4", nameAr: "تركي محوج دبل", nameEn: "Spiced Turkish Double", price: 60, type: "coffee" },
      { id: "c5", nameAr: "قهوة فرنسية", nameEn: "French Coffee", price: 70, type: "coffee" },
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
    titleAr: "المشروبات الساخنة",
    titleEn: "Hot Beverages",
    descAr: "مشروبات دافئة ولذيذة لأوقات الاسترخاء والراحة",
    descEn: "Soothing hot brews and traditional favorites",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9v12"></path><path d="M10 9v12"></path><path d="M14 9v12"></path><path d="M18 9v12"></path><path d="M2 9h20"></path><path d="M5 5c1-1 3-1 4 0s3 1 4 0 3-1 4 0"></path></svg>`,
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
    titleAr: "مشروبات مثلجة",
    titleEn: "Iced Drinks",
    descAr: "انتعاش القهوة والمشروبات الباردة بنكهات استثنائية",
    descEn: "Chilled specialty coffee and refreshing iced delights",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M17 10v12"></path><path d="M4 10h16"></path><path d="M6 10l1.5-7h9L18 10"></path></svg>`,
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
    titleAr: "العصائر الطبيعية",
    titleEn: "Fresh Juices",
    descAr: "فواكه طبيعية طازجة ١٠٠٪ محضرة لحظة الطلب",
    descEn: "100% freshly pressed fruits and natural blends",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"></path><path d="M5 6h14a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8a2 2 0 0 1 2-2z"></path><line x1="6" y1="12" x2="18" y2="12"></line></svg>`,
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
    titleAr: "الكوكتيل",
    titleEn: "Signature Cocktails",
    descAr: "خلطات موكا الحصرية من الفواكه الاستوائية والآيس كريم",
    descEn: "Signature fruit combinations and exotic layered blends",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"></path><path d="M12 15v6"></path><path d="M5 3l7 8 7-8z"></path></svg>`,
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
    titleAr: "السموزي",
    titleEn: "Smoothies",
    descAr: "سموزي مثلج غني بالفواكه الطبيعية والنكهات المنعشة",
    descEn: "Icy, thick blended fruit smoothies",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v6a6 6 0 0 0 12 0V2"></path><path d="M12 14v8"></path><path d="M8 22h8"></path></svg>`,
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
    titleAr: "ميلك شيك",
    titleEn: "Milkshakes",
    descAr: "شيك كريمي غني بأشهر الشوكولاتة والفواكه اللذيذة",
    descEn: "Rich, creamy milkshakes loaded with premium flavors",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v4a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V2"></path><path d="M6 10h12l-1.5 11h-9L6 10z"></path></svg>`,
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
    titleAr: "فرابيه",
    titleEn: "Frappes",
    descAr: "قهوة مخفوقة مثلجة ومزينة بالكريمة والنكهات اللذيذة",
    descEn: "Blended iced coffee topped with rich cream and drizzle",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="8" width="12" height="14" rx="2"></rect><path d="M9 8V5a3 3 0 0 1 6 0v3"></path></svg>`,
    items: [
      { id: "fr1", nameAr: "فرابتشينو كلاسيك", nameEn: "Classic Frappuccino", price: 70, type: "cold" },
      { id: "fr2", nameAr: "فرابتشينو لوتس", nameEn: "Lotus Frappuccino", price: 90, type: "cold" },
      { id: "fr3", nameAr: "فرابتشينو كراميل", nameEn: "Caramel Frappuccino", price: 90, type: "cold" },
      { id: "fr4", nameAr: "فرابتشينو موكا", nameEn: "MoKa Frappuccino", price: 100, badgeAr: "توقيع موكا", badgeEn: "MoKa Signature", isBestseller: true, type: "cold" }
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
    titleAr: "المشروبات الغازية",
    titleEn: "Soft Drinks",
    descAr: "مشروبات الطاقة والغازية والمياه المعدنية",
    descEn: "Energy drinks, classic sodas, and bottled water",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="4" width="10" height="16" rx="2"></rect><line x1="10" y1="2" x2="14" y2="2"></line></svg>`,
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
    titleAr: "آيس كريم",
    titleEn: "Ice Cream",
    descAr: "بولات آيس كريم وسلطة الفواكه المنعشة",
    descEn: "Artisan ice cream scoops and rich fruit salads",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M7 10l5 12 5-12"></path></svg>`,
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
    titleAr: "الزبادي",
    titleEn: "Yogurt Bowls",
    descAr: "زبادي طبيعي صحي بالعسل والفواكه الطازجة",
    descEn: "Fresh wholesome yogurt bowls with honey and fruits",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16a1 1 0 0 1 1 1c0 5.5-4 9-9 9s-9-3.5-9-9a1 1 0 0 1 1-1z"></path><path d="M6 11V6a3 3 0 0 1 6 0v5"></path></svg>`,
    items: [
      { id: "yg1", nameAr: "زبادي بالعسل", nameEn: "Yogurt with Pure Honey", price: 70, type: "cold" },
      { id: "yg2", nameAr: "زبادي بالفواكه", nameEn: "Yogurt with Fresh Fruits", price: 90, badgeAr: "صحي", badgeEn: "Healthy", type: "cold" },
      { id: "yg3", nameAr: "زبادي بالنكهات", nameEn: "Flavored Yogurt", price: 90, type: "cold" }
    ]
  },
  {
    id: "desserts",
    titleAr: "الحلويات والكيك",
    titleEn: "Desserts & Cakes",
    descAr: "تشكيلة فاخرة من التشيز كيك والمولتن كيك وأم علي الشهية",
    descEn: "Decadent cheesecakes, molten lava cakes, and warm desserts",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 4h-4z"></path><path d="M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z"></path><path d="M4 14h16"></path></svg>`,
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
    titleAr: "الوافل البلجيكي",
    titleEn: "Belgian Waffles",
    descAr: "وافل مقرمش وذهبي محضر طازج ومغطى بأجود الإضافات",
    descEn: "Crisp golden Belgian waffles loaded with decadent toppings",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>`,
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
    titleAr: "ميني بان كيك",
    titleEn: "Mini Pancakes",
    descAr: "حبات ميني بان كيك هشة وطرية بصلصات وحشوات غنية",
    descEn: "Fluffy bite-sized Dutch mini pancakes with rich toppings",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="9" ry="3"></ellipse><path d="M3 7v6c0 1.66 4.03 3 9 3s9-1.34 9-3V7"></path><path d="M3 13v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5"></path></svg>`,
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

// App State
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
    filterAll: "✨ الكل",
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
    sizeLabel: "اختر الحجم / الكمية:",
    sugarLabel: "مستوى السكر:",
    notesLabel: "ملاحظات إضافية:",
    qtyLabel: "العدد:",
    confirmAddBtn: "إضافة إلى الطلب",
    rightsReserved: "جميع الحقوق محفوظة © موكا كافيه",
    craftedWith: "صُنع بـ ❤️ لزبائن موكا كافيه",
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
    filterAll: "✨ All",
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
    whatsappOrderBtn: "Send Order via WhatsApp",
    showWaiterBtn: "Show Card to Waiter",
    sizeLabel: "Select Portion / Size:",
    sugarLabel: "Sugar Level:",
    notesLabel: "Additional Notes:",
    qtyLabel: "Quantity:",
    confirmAddBtn: "Add to Order",
    rightsReserved: "All rights reserved © MoKa Cafe",
    craftedWith: "Crafted with ❤️ for MoKa Cafe guests",
    emptyOrderText: "Your order is empty. Tap on any item to add it!",
    copiedAlert: "Order summary copied to clipboard!"
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
  initSpecialOfferAction();
  initItemModalEvents();
  updateStaticTexts();
});

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

  // Hide or show sugar group (relevant for coffee/tea/drinks)
  const isDrink = item.type === "coffee" || item.type === "hot" || item.type === "cold";
  if (sugarGroup) sugarGroup.style.display = isDrink ? "flex" : "none";

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

  // Sugar option pills
  document.querySelectorAll("#customSugarGroup .option-pill").forEach(pill => {
    pill.classList.remove("active");
    if (pill.getAttribute("data-sugar") === "مضبوط") pill.classList.add("active");
    pill.onclick = () => {
      document.querySelectorAll("#customSugarGroup .option-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      modalSelectedSugar = pill.getAttribute("data-sugar");
    };
  });

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

      if (currentModalItem.type === "coffee" || currentModalItem.type === "hot" || currentModalItem.type === "cold") {
        optionText += (optionText ? " • " : "") + (isAr ? `سكر ${modalSelectedSugar}` : `Sugar: ${modalSelectedSugar}`);
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
  const whatsappBtn = document.getElementById("sendWhatsAppOrderBtn");
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

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", sendWhatsAppOrder);
  }

  if (showWaiterBtn) {
    showWaiterBtn.addEventListener("click", showWaiterCardView);
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

/**
 * WhatsApp Order Message Dispatcher
 */
function sendWhatsAppOrder() {
  if (orderItems.length === 0) return;

  const isAr = currentLang === "ar";
  const currency = isAr ? uiText.ar.currency : uiText.en.currency;
  const tableInput = document.getElementById("tableNumberInput");
  const tableOrNotes = tableInput ? tableInput.value.trim() : "";

  const totalAmount = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  let message = `☕ *طلب جديد من قائمة موكا كافيه الرقمية*\n`;
  message += `-----------------------------\n`;

  if (tableOrNotes) {
    message += `📍 *الطاولة / ملاحظات:* ${tableOrNotes}\n`;
    message += `-----------------------------\n`;
  }

  orderItems.forEach((item, i) => {
    const name = isAr ? item.nameAr : item.nameEn;
    message += `${i + 1}. *${name}* × ${item.qty}\n`;
    if (item.customOption) message += `   ↳ _${item.customOption}_\n`;
    if (item.notes) message += `   ↳ _ملاحظة: ${item.notes}_\n`;
    message += `   ↳ السعر: ${item.price * item.qty} ${currency}\n`;
  });

  message += `-----------------------------\n`;
  message += `💰 *المجموع الكلي:* ${totalAmount} ${currency}\n`;
  message += `شكراً لاختياركم موكا كافيه! ❤️`;

  const encoded = encodeURIComponent(message);
  // Official Cafe WhatsApp Number (Replace with actual phone number if provided)
  const phone = "201000000000";
  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
}

/**
 * Show Waiter Card View
 */
function showWaiterCardView() {
  if (orderItems.length === 0) return;

  const isAr = currentLang === "ar";
  const currency = isAr ? uiText.ar.currency : uiText.en.currency;
  const tableInput = document.getElementById("tableNumberInput");
  const tableOrNotes = tableInput ? tableInput.value.trim() : "";
  const totalAmount = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  let summary = `${isAr ? '☕ ملخص طلب موكا كافيه' : '☕ MoKa Cafe Order Summary'}\n`;
  if (tableOrNotes) summary += `${isAr ? 'الطاولة: ' : 'Table: '}${tableOrNotes}\n\n`;

  orderItems.forEach((item) => {
    summary += `• ${isAr ? item.nameAr : item.nameEn} × ${item.qty} (${item.price * item.qty} ${currency})\n`;
    if (item.customOption) summary += `  [${item.customOption}]\n`;
  });

  summary += `\n${isAr ? 'الإجمالي: ' : 'Total: '}${totalAmount} ${currency}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(summary).then(() => {
      alert(isAr ? uiText.ar.copiedAlert : uiText.en.copiedAlert);
    });
  } else {
    alert(summary);
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
