// ============================================================================
// MoKa Cafe — Admin Panel Logic
// PIN Auth, CRUD for Categories/Items, Firebase Firestore Sync, Cloudinary Uploads
// ============================================================================

import { saveToCloud, fetchFromCloud } from "./firebase-sync.js";

// ============================================================================
// Default Hardcoded Menu Data (matches app.js)
// ============================================================================
const DEFAULT_MENU = [
  {
    id: "coffee", titleAr: "القهوة", titleEn: "Specialty Coffee",
    descAr: "قهوة مختارة بعناية ومحضرة بأعلى معايير الإتقان",
    descEn: "Carefully selected beans brewed to perfection",
    icon: "coffee", heroImage: "assets/images/coffee.jpg",
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
    id: "hot_drinks", titleAr: "المشروبات الساخنة", titleEn: "Hot Beverages",
    descAr: "مشروبات دافئة ولذيذة لأوقات الاسترخاء والراحة",
    descEn: "Soothing hot brews and traditional favorites", icon: "hot",
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
    id: "iced_drinks", titleAr: "مشروبات مثلجة", titleEn: "Iced Drinks",
    descAr: "انتعاش القهوة والمشروبات الباردة بنكهات استثنائية",
    descEn: "Chilled specialty coffee and refreshing iced delights", icon: "cold",
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
  { id: "fresh_juices", titleAr: "العصائر الطبيعية", titleEn: "Fresh Juices", descAr: "فواكه طبيعية طازجة ١٠٠٪ محضرة لحظة الطلب", descEn: "100% freshly pressed fruits and natural blends", icon: "juice", heroImage: "assets/images/juices.jpg", items: [
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
  ]},
  { id: "cocktails", titleAr: "الكوكتيل", titleEn: "Signature Cocktails", descAr: "خلطات موكا الحصرية من الفواكه الاستوائية والآيس كريم", descEn: "Signature fruit combinations and exotic layered blends", icon: "cocktail", items: [
    { id: "ck1", nameAr: "فلوريدا", nameEn: "Florida", descAr: "فراولة، مانجو، جوافة", descEn: "Strawberry, Mango, Guava", price: 90, type: "cold" },
    { id: "ck2", nameAr: "هاواي", nameEn: "Hawaii", descAr: "مانجو، كيوي", descEn: "Mango, Kiwi", price: 100, type: "cold" },
    { id: "ck3", nameAr: "فور سيزون", nameEn: "Four Seasons", descAr: "مانجو، موز، فراولة", descEn: "Mango, Banana, Strawberry", price: 120, type: "cold" },
    { id: "ck4", nameAr: "بيناكولادا", nameEn: "Piña Colada", descAr: "أناناس، جوز هند", descEn: "Pineapple, Coconut Cream", price: 100, type: "cold" },
    { id: "ck5", nameAr: "تروبيكال", nameEn: "Tropical", descAr: "فراولة، بلوبيري، آيس كريم فانيليا", descEn: "Strawberry, Blueberry, Vanilla Ice Cream", price: 110, badgeAr: "مميز", badgeEn: "Special", type: "cold" },
    { id: "ck6", nameAr: "كوكتيل موكا", nameEn: "MoKa Cocktail", descAr: "أفوكادو، عسل، بلح، مكسرات فاخرة", descEn: "Avocado, Honey, Dates, Premium Nuts", price: 150, badgeAr: "توقيع موكا", badgeEn: "Signature", isBestseller: true, type: "cold" },
    { id: "ck7", nameAr: "ستار فريش", nameEn: "Star Fresh", descAr: "مانجو، بطيخ", descEn: "Mango, Watermelon", price: 100, type: "cold" }
  ]},
  { id: "smoothies", titleAr: "السموزي", titleEn: "Smoothies", descAr: "سموزي مثلج غني بالفواكه الطبيعية والنكهات المنعشة", descEn: "Icy, thick blended fruit smoothies", icon: "smoothie", items: [
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
  ]},
  { id: "milkshakes", titleAr: "ميلك شيك", titleEn: "Milkshakes", descAr: "شيك كريمي غني بأشهر الشوكولاتة والفواكه اللذيذة", descEn: "Rich, creamy milkshakes loaded with premium flavors", icon: "shake", items: [
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
  ]},
  { id: "frappe", titleAr: "فرابيه", titleEn: "Frappes", descAr: "قهوة مخفوقة مثلجة ومزينة بالكريمة والنكهات اللذيذة", descEn: "Blended iced coffee topped with rich cream and drizzle", icon: "frappe", items: [
    { id: "fr1", nameAr: "فرابتشينو كلاسيك", nameEn: "Classic Frappuccino", price: 70, type: "cold" },
    { id: "fr2", nameAr: "فرابتشينو لوتس", nameEn: "Lotus Frappuccino", price: 90, type: "cold" },
    { id: "fr3", nameAr: "فرابتشينو كراميل", nameEn: "Caramel Frappuccino", price: 90, type: "cold" },
    { id: "fr4", nameAr: "فرابتشينو موكا", nameEn: "MoKa Frappuccino", price: 100, badgeAr: "توقيع موكا", badgeEn: "MoKa Signature", isBestseller: true, type: "cold" }
  ]},
  { id: "soda", titleAr: "الصودا والموخيتو", titleEn: "Mojitos & Soda", descAr: "موخيتو منعش بالنعناع والليمون وصودا منعشة ملونة", descEn: "Crisp sparkling mojitos and vibrant refreshing sodas", icon: "soda", items: [
    { id: "sd1", nameAr: "موخيتو كلاسيك", nameEn: "Classic Mojito", price: 80, badgeAr: "منعش", badgeEn: "Refreshing", isBestseller: true, type: "cold" },
    { id: "sd2", nameAr: "موخيتو بالنكهات", nameEn: "Flavored Mojito", price: 90, type: "cold" },
    { id: "sd3", nameAr: "شيري كولا", nameEn: "Cherry Cola", price: 80, type: "cold" },
    { id: "sd4", nameAr: "باور صودا", nameEn: "Power Soda", price: 100, type: "cold" },
    { id: "sd5", nameAr: "سكاي بلو", nameEn: "Sky Blue Soda", price: 80, type: "cold" },
    { id: "sd6", nameAr: "هامر", nameEn: "Hammer Special", price: 120, badgeAr: "مميز", badgeEn: "Special", type: "cold" }
  ]},
  { id: "soft_drinks", titleAr: "المشروبات الغازية", titleEn: "Soft Drinks", descAr: "مشروبات الطاقة والغازية والمياه المعدنية", descEn: "Energy drinks, classic sodas, and bottled water", icon: "can", items: [
    { id: "sf1", nameAr: "ريد بول", nameEn: "Red Bull Energy Drink", price: 85, type: "cold" },
    { id: "sf2", nameAr: "بريل", nameEn: "Birell Malt", price: 50, type: "cold" },
    { id: "sf3", nameAr: "فيروز", nameEn: "Fayrouz Flavored Malt", price: 50, type: "cold" },
    { id: "sf4", nameAr: "ميرندا", nameEn: "Mirinda Orange / Apple", price: 35, type: "cold" },
    { id: "sf5", nameAr: "شويبس", nameEn: "Schweppes Tonic / Gold", price: 35, type: "cold" },
    { id: "sf6", nameAr: "سفن أب", nameEn: "7-Up", price: 35, type: "cold" },
    { id: "sf7", nameAr: "ماونتن ديو", nameEn: "Mountain Dew", price: 40, type: "cold" },
    { id: "sf8", nameAr: "بيبسي", nameEn: "Pepsi Cola", price: 35, type: "cold" },
    { id: "sf9", nameAr: "مياه معدنية", nameEn: "Mineral Water", price: 10, type: "cold" }
  ]},
  { id: "ice_cream", titleAr: "آيس كريم", titleEn: "Ice Cream", descAr: "بولات آيس كريم وسلطة الفواكه المنعشة", descEn: "Artisan ice cream scoops and rich fruit salads", icon: "icecream", items: [
    { id: "ic1", nameAr: "آيس كريم بولة", nameEn: "Ice Cream (1 Scoop)", price: 25, type: "cold" },
    { id: "ic2", nameAr: "آيس كريم 2 بولة", nameEn: "Ice Cream (2 Scoops)", price: 40, type: "cold" },
    { id: "ic3", nameAr: "آيس كريم 3 بولة", nameEn: "Ice Cream (3 Scoops)", price: 60, type: "cold" },
    { id: "ic4", nameAr: "آيس كريم بسكويت", nameEn: "Ice Cream Waffle Cone", price: 30, type: "cold" },
    { id: "ic5", nameAr: "سلطة فواكه (فروت سالاد)", nameEn: "Fresh Fruit Salad", price: 100, type: "cold" },
    { id: "ic6", nameAr: "سلطة فواكه بالآيس كريم", nameEn: "Fruit Salad with Ice Cream", price: 120, badgeAr: "مفضل", badgeEn: "Favorite", isBestseller: true, type: "cold" }
  ]},
  { id: "yogurt", titleAr: "الزبادي", titleEn: "Yogurt Bowls", descAr: "زبادي طبيعي صحي بالعسل والفواكه الطازجة", descEn: "Fresh wholesome yogurt bowls with honey and fruits", icon: "yogurt", items: [
    { id: "yg1", nameAr: "زبادي بالعسل", nameEn: "Yogurt with Pure Honey", price: 70, type: "cold" },
    { id: "yg2", nameAr: "زبادي بالفواكه", nameEn: "Yogurt with Fresh Fruits", price: 90, badgeAr: "صحي", badgeEn: "Healthy", type: "cold" },
    { id: "yg3", nameAr: "زبادي بالنكهات", nameEn: "Flavored Yogurt", price: 90, type: "cold" }
  ]},
  { id: "desserts", titleAr: "الحلويات والكيك", titleEn: "Desserts & Cakes", descAr: "تشكيلة فاخرة من التشيز كيك والمولتن كيك وأم علي الشهية", descEn: "Decadent cheesecakes, molten lava cakes, and warm desserts", icon: "dessert", heroImage: "assets/images/desserts.jpg", items: [
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
  ]},
  { id: "waffles", titleAr: "الوافل البلجيكي", titleEn: "Belgian Waffles", descAr: "وافل مقرمش وذهبي محضر طازج ومغطى بأجود الإضافات", descEn: "Crisp golden Belgian waffles loaded with decadent toppings", icon: "waffle", items: [
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
  ]},
  { id: "mini_pancakes", titleAr: "ميني بان كيك", titleEn: "Mini Pancakes", descAr: "حبات ميني بان كيك هشة وطرية بصلصات وحشوات غنية", descEn: "Fluffy bite-sized Dutch mini pancakes with rich toppings", icon: "pancake", isDualPrice: true, items: [
    { id: "mp1", nameAr: "بان كيك نوتيلا", nameEn: "Nutella Mini Pancakes", price12: 100, price24: 180, badgeAr: "الأكثر طلباً", badgeEn: "Bestseller", isBestseller: true, type: "desserts" },
    { id: "mp2", nameAr: "بان كيك لوتس", nameEn: "Lotus Biscoff Mini Pancakes", price12: 120, price24: 200, type: "desserts" },
    { id: "mp3", nameAr: "بان كيك أوريو", nameEn: "Oreo Mini Pancakes", price12: 120, price24: 200, type: "desserts" },
    { id: "mp4", nameAr: "بان كيك فستق (بستاشيو)", nameEn: "Pistachio Mini Pancakes", price12: 110, price24: 190, badgeAr: "فاخر", badgeEn: "Premium", type: "desserts" },
    { id: "mp5", nameAr: "بان كيك كيندر", nameEn: "Kinder Mini Pancakes", price12: 140, price24: 220, type: "desserts" },
    { id: "mp6", nameAr: "بان كيك شوكليت", nameEn: "Chocolate Mini Pancakes", price12: 130, price24: 210, type: "desserts" },
    { id: "mp7", nameAr: "بان كيك كراميل", nameEn: "Caramel Mini Pancakes", price12: 90, price24: 160, type: "desserts" },
    { id: "mp8", nameAr: "بان كيك بالعسل", nameEn: "Honey Butter Mini Pancakes", price12: 90, price24: 160, type: "desserts" }
  ]}
];

const DEFAULT_OFFER = {
  titleAr: "كومبو موكا المميز", titleEn: "MoKa Signature Combo",
  descAr: "سبانش لاتيه بارد أو ساخن + وافل بلجيكي فور سيزون بالنوتيلا واللوتس",
  descEn: "Spanish Latte (Hot/Iced) + Four Seasons Belgian Waffle with Nutella & Lotus",
  priceAr: "245 ج.م", priceEn: "245 EGP",
  originalAr: "295 ج.م", originalEn: "295 EGP",
  image: "assets/images/special_offers.jpg"
};

const DEFAULT_SETTINGS = {
  whatsappNumber: "201000000000",
  instagramUrl: "https://instagram.com",
  whatsappUrl: "https://wa.me/201000000000",
  phoneNumber: "+201000000000",
  adminPin: "1234",
  cloudinaryCloudName: "qrif7qmf",
  cloudinaryUploadPreset: "moka menu"
};

// ============================================================================
// State
// ============================================================================
let menuData = [];
let offerData = {};
let settingsData = {};
let currentEditId = null;
let currentSection = "dashboard";

// ============================================================================
// Data Persistence (localStorage)
// ============================================================================
function loadData() {
  try {
    const saved = localStorage.getItem("moka_menu_data");
    menuData = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_MENU));
  } catch { menuData = JSON.parse(JSON.stringify(DEFAULT_MENU)); }
  try {
    const saved = localStorage.getItem("moka_offer_data");
    offerData = saved ? JSON.parse(saved) : { ...DEFAULT_OFFER };
  } catch { offerData = { ...DEFAULT_OFFER }; }
  try {
    const saved = localStorage.getItem("moka_settings");
    const parsed = saved ? JSON.parse(saved) : {};
    settingsData = { ...DEFAULT_SETTINGS, ...parsed };
    if (!settingsData.cloudinaryCloudName) settingsData.cloudinaryCloudName = "qrif7qmf";
    if (!settingsData.cloudinaryUploadPreset) settingsData.cloudinaryUploadPreset = "moka menu";
  } catch { settingsData = { ...DEFAULT_SETTINGS }; }
}

function updateCloudBadge(state = "saved") {
  const badge = document.getElementById("cloudStatusBadge");
  if (!badge) return;
  if (state === "saving") {
    badge.innerHTML = "⏳ جاري الحفظ سحابياً...";
    badge.style.color = "#F59E0B";
    badge.style.borderColor = "rgba(245, 158, 11, 0.4)";
    badge.style.background = "rgba(245, 158, 11, 0.15)";
  } else if (state === "saved") {
    badge.innerHTML = "☁️ متصل بالسحابة (محفوظ)";
    badge.style.color = "#10B981";
    badge.style.borderColor = "rgba(16, 185, 129, 0.3)";
    badge.style.background = "rgba(16, 185, 129, 0.15)";
  } else if (state === "error") {
    badge.innerHTML = "⚠️ خطأ في المزامنة";
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
      if (cloudData.menu && Array.isArray(cloudData.menu)) {
        menuData = cloudData.menu;
        localStorage.setItem("moka_menu_data", JSON.stringify(menuData));
      }
      if (cloudData.offer) {
        offerData = cloudData.offer;
        localStorage.setItem("moka_offer_data", JSON.stringify(offerData));
      }
      if (cloudData.settings) {
        settingsData = { ...DEFAULT_SETTINGS, ...cloudData.settings };
        localStorage.setItem("moka_settings", JSON.stringify(settingsData));
      }
      renderDashboard();
      if (currentSection === "categories") renderCategories();
      if (currentSection === "items") renderItems();
      if (currentSection === "offers") renderOfferEditor();
      if (currentSection === "settings") renderSettings();
      updateCloudBadge("saved");
    } else {
      // First time: sync default menu to cloud
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
// Toast
// ============================================================================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
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
// Authentication
// ============================================================================
function initLogin() {
  const pins = document.querySelectorAll(".pin-digit");
  const loginBtn = document.getElementById("loginBtn");
  const loginError = document.getElementById("loginError");

  // Auto-focus and auto-advance
  pins.forEach((pin, idx) => {
    pin.addEventListener("input", (e) => {
      const val = e.target.value.replace(/\D/g, "");
      e.target.value = val.slice(0, 1);
      if (val && idx < pins.length - 1) pins[idx + 1].focus();
      loginError.textContent = "";
      pins.forEach(p => p.classList.remove("error"));
    });
    pin.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !pin.value && idx > 0) {
        pins[idx - 1].focus();
      }
      if (e.key === "Enter") attemptLogin();
    });
    pin.addEventListener("paste", (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4);
      pasted.split("").forEach((ch, i) => { if (pins[i]) pins[i].value = ch; });
      if (pasted.length === 4) attemptLogin();
    });
  });

  if (pins[0]) pins[0].focus();
  if (loginBtn) loginBtn.addEventListener("click", attemptLogin);

  // Check if already authenticated this session
  if (sessionStorage.getItem("moka_admin_auth") === "true") {
    showAdminPanel();
  }
}

function attemptLogin() {
  const pins = document.querySelectorAll(".pin-digit");
  const enteredPin = Array.from(pins).map(p => p.value).join("");
  const loginError = document.getElementById("loginError");

  if (enteredPin.length < 4) {
    loginError.textContent = "أدخل الأربعة أرقام كاملة";
    pins.forEach(p => p.classList.add("error"));
    return;
  }

  const correctPin = settingsData.adminPin || "1234";
  if (enteredPin === correctPin) {
    sessionStorage.setItem("moka_admin_auth", "true");
    showAdminPanel();
  } else {
    loginError.textContent = "رمز PIN غير صحيح. حاول مرة أخرى.";
    pins.forEach(p => { p.classList.add("error"); p.value = ""; });
    pins[0].focus();
  }
}

function showAdminPanel() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("adminLayout").classList.add("active");
  renderDashboard();
}

function logout() {
  sessionStorage.removeItem("moka_admin_auth");
  location.reload();
}

// ============================================================================
// Navigation
// ============================================================================
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item[data-section]");
  const sectionTitles = {
    dashboard: "الرئيسية",
    categories: "إدارة الأقسام",
    items: "إدارة الأصناف",
    offers: "العروض الخاصة",
    settings: "الإعدادات",
    tools: "تصدير واستيراد"
  };

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const section = item.dataset.section;
      currentSection = section;
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");

      document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));
      const target = document.getElementById(`section-${section}`);
      if (target) target.classList.add("active");

      document.getElementById("headerTitle").textContent = sectionTitles[section] || "";

      // Render section content
      if (section === "dashboard") renderDashboard();
      else if (section === "categories") renderCategories();
      else if (section === "items") renderItems();
      else if (section === "offers") renderOfferEditor();
      else if (section === "settings") renderSettings();

      // Close mobile sidebar
      closeSidebar();
    });
  });

  // Mobile sidebar toggle
  const toggleBtn = document.getElementById("menuToggleBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.getElementById("adminSidebar").classList.toggle("open");
      document.getElementById("sidebarOverlay").classList.toggle("active");
    });
  }

  const overlay = document.getElementById("sidebarOverlay");
  if (overlay) overlay.addEventListener("click", closeSidebar);
  
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
}

function closeSidebar() {
  const sidebar = document.getElementById("adminSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  if (sidebar) sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
}

// ============================================================================
// Dashboard
// ============================================================================
function renderDashboard() {
  const totalItems = menuData.reduce((sum, cat) => sum + cat.items.length, 0);
  const totalBestsellers = menuData.reduce((sum, cat) => sum + cat.items.filter(i => i.isBestseller).length, 0);
  document.getElementById("statCategories").textContent = menuData.length;
  document.getElementById("statItems").textContent = totalItems;
  document.getElementById("statBestsellers").textContent = totalBestsellers;

  const lastEdit = localStorage.getItem("moka_last_edit");
  if (lastEdit) {
    const d = new Date(lastEdit);
    document.getElementById("statLastEdit").textContent = d.toLocaleDateString("ar-EG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }
}

// ============================================================================
// Categories CRUD
// ============================================================================
function renderCategories() {
  const wrap = document.getElementById("categoriesTableWrap");
  if (menuData.length === 0) {
    wrap.innerHTML = `<div class="empty-state"><div class="empty-icon">📁</div><p>لا توجد أقسام بعد. اضغط "إضافة قسم" للبدء.</p></div>`;
    return;
  }
  wrap.innerHTML = `
    <table class="data-table">
      <thead><tr><th>#</th><th>الاسم (عربي)</th><th>الاسم (إنجليزي)</th><th>عدد الأصناف</th><th>إجراءات</th></tr></thead>
      <tbody>${menuData.map((cat, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td><span class="table-item-name">${esc(cat.titleAr)}</span><span class="table-item-sub">${esc(cat.descAr || "")}</span></td>
          <td><span class="table-item-name">${esc(cat.titleEn)}</span><span class="table-item-sub">${esc(cat.descEn || "")}</span></td>
          <td>${cat.items.length}</td>
          <td><div class="table-actions">
            <button class="action-btn edit-btn" data-cat-edit="${cat.id}" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
            <button class="action-btn delete-btn" data-cat-delete="${cat.id}" title="حذف"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
          </div></td>
        </tr>
      `).join("")}</tbody>
    </table>`;

  // Attach events
  wrap.querySelectorAll("[data-cat-edit]").forEach(btn => {
    btn.addEventListener("click", () => openCategoryModal(btn.dataset.catEdit));
  });
  wrap.querySelectorAll("[data-cat-delete]").forEach(btn => {
    btn.addEventListener("click", () => deleteCategory(btn.dataset.catDelete));
  });
}

function openCategoryModal(catId = null) {
  const cat = catId ? menuData.find(c => c.id === catId) : null;
  currentEditId = catId;

  document.getElementById("modalTitle").textContent = cat ? "تعديل القسم" : "إضافة قسم جديد";
  document.getElementById("modalBody").innerHTML = `
    <div class="form-row">
      <div class="form-group"><label class="form-label">الاسم (عربي) *</label><input class="form-input" id="catTitleAr" value="${esc(cat?.titleAr || "")}"></div>
      <div class="form-group"><label class="form-label">الاسم (إنجليزي) *</label><input class="form-input" id="catTitleEn" value="${esc(cat?.titleEn || "")}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">الوصف (عربي)</label><input class="form-input" id="catDescAr" value="${esc(cat?.descAr || "")}"></div>
      <div class="form-group"><label class="form-label">الوصف (إنجليزي)</label><input class="form-input" id="catDescEn" value="${esc(cat?.descEn || "")}"></div>
    </div>
    <div class="form-group">
      <label class="form-label">صورة القسم (اختياري)</label>
      <input class="form-input" id="catHeroImage" value="${esc(cat?.heroImage || "")}" placeholder="assets/images/coffee.jpg أو اختر صورة من جهازك">
      <div class="image-upload-area" id="catImageUpload" style="margin-top: 8px;">
        <div class="upload-icon">📷</div>
        <div class="upload-text">اضغط لاختيار صورة من جهازك / هاتفك</div>
        <div class="upload-hint">يتم تحسينها وضغطها فوراً وبدون أي تكلفة</div>
        <input type="file" accept="image/*" id="catImageFile">
      </div>
      <div class="upload-progress" id="catUploadProgress"><div class="progress-bar-track"><div class="progress-bar-fill" id="catProgressFill"></div></div></div>
      ${cat?.heroImage ? `<div class="current-image-preview"><img src="${esc(cat.heroImage)}" alt=""><span class="img-name">${esc(cat.heroImage.slice(0, 40))}...</span></div>` : ''}
    </div>
    <div class="form-check-row">
      <input type="checkbox" class="form-checkbox" id="catIsDualPrice" ${cat?.isDualPrice ? 'checked' : ''}>
      <label class="form-check-label" for="catIsDualPrice">تسعير مزدوج (مثل الميني بان كيك — ١٢ قطعة / ٢٤ قطعة)</label>
    </div>
  `;

  // Image upload handler
  document.getElementById("catImageFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file, "catHeroImage", "catUploadProgress", "catProgressFill");
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
    menuData.push({ id: generateId(), ...data, icon: "custom", items: [] });
  }

  saveMenuData();
  hideModal();
  renderCategories();
  showToast(currentEditId ? "تم تحديث القسم بنجاح" : "تم إضافة القسم بنجاح");
}

function deleteCategory(catId) {
  const cat = menuData.find(c => c.id === catId);
  if (!cat) return;
  if (!confirm(`هل أنت متأكد من حذف القسم "${cat.titleAr}"؟\nسيتم حذف جميع الأصناف (${cat.items.length}) داخله.`)) return;
  menuData = menuData.filter(c => c.id !== catId);
  saveMenuData();
  renderCategories();
  showToast("تم حذف القسم بنجاح");
}

// ============================================================================
// Items CRUD
// ============================================================================
function renderItems() {
  const select = document.getElementById("itemCategoryFilter");
  const currentVal = select.value;
  select.innerHTML = menuData.map(cat => `<option value="${cat.id}" ${cat.id === currentVal ? 'selected' : ''}>${esc(cat.titleAr)} — ${esc(cat.titleEn)}</option>`).join("");

  if (menuData.length === 0) {
    document.getElementById("itemsTableWrap").innerHTML = `<div class="empty-state"><div class="empty-icon">🍽️</div><p>أضف أقسام أولاً لتتمكن من إدارة الأصناف.</p></div>`;
    return;
  }

  renderItemsTable();
  select.onchange = renderItemsTable;
}

function renderItemsTable() {
  const catId = document.getElementById("itemCategoryFilter").value;
  const cat = menuData.find(c => c.id === catId);
  const wrap = document.getElementById("itemsTableWrap");

  if (!cat || cat.items.length === 0) {
    wrap.innerHTML = `<div class="empty-state"><div class="empty-icon">☕</div><p>لا توجد أصناف في هذا القسم. اضغط "إضافة صنف" للبدء.</p></div>`;
    return;
  }

  const isDual = cat.isDualPrice;
  wrap.innerHTML = `
    <table class="data-table">
      <thead><tr>
        <th>#</th><th>الاسم (عربي)</th><th>الاسم (إنجليزي)</th>
        ${isDual ? '<th>سعر ١٢ قطعة</th><th>سعر ٢٤ قطعة</th>' : '<th>السعر</th>'}
        <th>النوع</th><th>شارة</th><th>الأكثر طلباً</th><th>إجراءات</th>
      </tr></thead>
      <tbody>${cat.items.map((item, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td><span class="table-item-name">${esc(item.nameAr)}</span>${item.descAr ? `<span class="table-item-sub">${esc(item.descAr)}</span>` : ''}</td>
          <td><span class="table-item-name">${esc(item.nameEn)}</span>${item.descEn ? `<span class="table-item-sub">${esc(item.descEn)}</span>` : ''}</td>
          ${isDual
            ? `<td class="table-price">${item.price12 || 0} ج.م</td><td class="table-price">${item.price24 || 0} ج.م</td>`
            : `<td class="table-price">${item.price || 0} ج.م</td>`}
          <td><span class="table-badge type-${item.type || 'cold'}">${item.type || '—'}</span></td>
          <td>${item.badgeAr ? `<span class="table-badge">${esc(item.badgeAr)}</span>` : '—'}</td>
          <td>${item.isBestseller ? '<span class="table-badge bestseller">⭐</span>' : '—'}</td>
          <td><div class="table-actions">
            <button class="action-btn edit-btn" data-item-edit="${item.id}" data-cat="${catId}" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
            <button class="action-btn delete-btn" data-item-delete="${item.id}" data-cat="${catId}" title="حذف"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
          </div></td>
        </tr>
      `).join("")}</tbody>
    </table>`;

  wrap.querySelectorAll("[data-item-edit]").forEach(btn => {
    btn.addEventListener("click", () => openItemModal(btn.dataset.cat, btn.dataset.itemEdit));
  });
  wrap.querySelectorAll("[data-item-delete]").forEach(btn => {
    btn.addEventListener("click", () => deleteItem(btn.dataset.cat, btn.dataset.itemDelete));
  });
}

function openItemModal(catId, itemId = null) {
  const cat = menuData.find(c => c.id === catId);
  if (!cat) return;
  const item = itemId ? cat.items.find(i => i.id === itemId) : null;
  currentEditId = itemId;
  const isDual = cat.isDualPrice;

  document.getElementById("modalTitle").textContent = item ? "تعديل الصنف" : "إضافة صنف جديد";
  document.getElementById("modalBody").innerHTML = `
    <input type="hidden" id="itemCatId" value="${catId}">
    <div class="form-row">
      <div class="form-group"><label class="form-label">الاسم (عربي) *</label><input class="form-input" id="itemNameAr" value="${esc(item?.nameAr || "")}"></div>
      <div class="form-group"><label class="form-label">الاسم (إنجليزي) *</label><input class="form-input" id="itemNameEn" value="${esc(item?.nameEn || "")}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">الوصف (عربي)</label><input class="form-input" id="itemDescAr" value="${esc(item?.descAr || "")}"></div>
      <div class="form-group"><label class="form-label">الوصف (إنجليزي)</label><input class="form-input" id="itemDescEn" value="${esc(item?.descEn || "")}"></div>
    </div>
    ${isDual ? `
      <div class="form-row">
        <div class="form-group"><label class="form-label">سعر ١٢ قطعة (ج.م) *</label><input type="number" class="form-input" id="itemPrice12" value="${item?.price12 || ""}"></div>
        <div class="form-group"><label class="form-label">سعر ٢٤ قطعة (ج.م) *</label><input type="number" class="form-input" id="itemPrice24" value="${item?.price24 || ""}"></div>
      </div>
    ` : `
      <div class="form-group"><label class="form-label">السعر (ج.م) *</label><input type="number" class="form-input" id="itemPrice" value="${item?.price || ""}"></div>
    `}
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">النوع</label>
        <select class="form-select-input" id="itemType">
          <option value="coffee" ${item?.type === 'coffee' ? 'selected' : ''}>☕ قهوة</option>
          <option value="hot" ${item?.type === 'hot' ? 'selected' : ''}>🔥 ساخن</option>
          <option value="cold" ${item?.type === 'cold' ? 'selected' : ''}>🧊 بارد</option>
          <option value="desserts" ${item?.type === 'desserts' ? 'selected' : ''}>🧇 حلويات</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">الشارة (عربي)</label>
        <input class="form-input" id="itemBadgeAr" value="${esc(item?.badgeAr || "")}" placeholder="مثال: الأكثر طلباً">
      </div>
    </div>
    <div class="form-group"><label class="form-label">الشارة (إنجليزي)</label><input class="form-input" id="itemBadgeEn" value="${esc(item?.badgeEn || "")}" placeholder="e.g. Bestseller"></div>
    <div class="form-check-row">
      <input type="checkbox" class="form-checkbox" id="itemBestseller" ${item?.isBestseller ? 'checked' : ''}>
      <label class="form-check-label" for="itemBestseller">الأكثر طلباً (يظهر في فلتر "الأكثر طلباً")</label>
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
  renderItemsTable();
  showToast("تم حذف الصنف بنجاح");
}

// ============================================================================
// Special Offer Editor
// ============================================================================
function renderOfferEditor() {
  const wrap = document.getElementById("offerEditorCard");
  wrap.innerHTML = `
    <div class="offer-preview">
      <img src="${esc(offerData.image || 'assets/images/special_offers.jpg')}" alt="Offer" class="offer-preview-img" id="offerPreviewImg">
      <div class="offer-preview-info">
        <h4>${esc(offerData.titleAr)}</h4>
        <p>${esc(offerData.descAr)}</p>
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
        <div class="upload-text">اضغط لاختيار صورة من جهازك / هاتفك</div>
        <div class="upload-hint">يتم ضغطها وتجهيزها للعرض فوراً</div>
        <input type="file" accept="image/*" id="offerImageFile">
      </div>
      <div class="upload-progress" id="offerUploadProgress"><div class="progress-bar-track"><div class="progress-bar-fill" id="offerProgressFill"></div></div></div>
    </div>
    <button class="btn-primary" id="saveOfferBtn" style="align-self:flex-start;padding:12px 32px;">حفظ التعديلات</button>
  `;

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
    showToast("تم حفظ العرض الخاص بنجاح");
    renderOfferEditor();
  });
}

// ============================================================================
// Settings
// ============================================================================
function renderSettings() {
  const grid = document.getElementById("settingsGrid");
  grid.innerHTML = `
    <div class="settings-card">
      <div class="settings-card-header"><span class="settings-icon">☁️</span><h3>إعدادات السحابة والتخزين (Cloudinary)</h3></div>
      <div class="settings-card-body">
        <p style="font-size:0.84rem;color:var(--text-secondary);line-height:1.5;">
          اربط حساب Cloudinary المجاني لرفع وتخزين الصور مباشرة على السحابة (CDN) بسرعة فائقة وبدون أي تخزين محلي.
        </p>
        <div class="form-group">
          <label class="form-label">Cloud Name (اسم السحابة في Cloudinary)</label>
          <input class="form-input" id="setCloudName" value="${esc(settingsData.cloudinaryCloudName || "")}" placeholder="e.g. dxyz123abc" dir="ltr">
        </div>
        <div class="form-group">
          <label class="form-label">Upload Preset (Unsigned)</label>
          <input class="form-input" id="setUploadPreset" value="${esc(settingsData.cloudinaryUploadPreset || "")}" placeholder="e.g. moka_menu_preset" dir="ltr">
        </div>
        <button class="btn-primary" id="saveCloudinaryBtn">حفظ إعدادات Cloudinary ☁️</button>
      </div>
    </div>

    <div class="settings-card">
      <div class="settings-card-header"><span class="settings-icon">📱</span><h3>وسائل التواصل وطلب الواتساب</h3></div>
      <div class="settings-card-body">
        <div class="form-group"><label class="form-label">رقم الواتساب لاستقبال الطلبات (كود الدولة + الرقم بدون +)</label><input class="form-input" id="setWhatsapp" value="${esc(settingsData.whatsappNumber || "")}" placeholder="201000000000" dir="ltr"></div>
        <div class="form-group"><label class="form-label">رابط Instagram</label><input class="form-input" id="setInstagram" value="${esc(settingsData.instagramUrl || "")}" placeholder="https://instagram.com/mokacafe" dir="ltr"></div>
        <div class="form-group"><label class="form-label">رقم الهاتف للاتصال المباشر</label><input class="form-input" id="setPhone" value="${esc(settingsData.phoneNumber || "")}" placeholder="+201000000000" dir="ltr"></div>
        <button class="btn-primary" id="saveSocialBtn">حفظ وسائل التواصل</button>
      </div>
    </div>

    <div class="settings-card">
      <div class="settings-card-header"><span class="settings-icon">🔐</span><h3>تغيير رمز الدخول PIN</h3></div>
      <div class="settings-card-body">
        <div class="form-group"><label class="form-label">الرمز الحالي</label><input type="password" class="form-input" id="currentPin" maxlength="4" placeholder="****"></div>
        <div class="form-group"><label class="form-label">الرمز الجديد (4 أرقام)</label><input type="password" class="form-input" id="newPin" maxlength="4" placeholder="****"></div>
        <div class="form-group"><label class="form-label">تأكيد الرمز الجديد</label><input type="password" class="form-input" id="confirmPin" maxlength="4" placeholder="****"></div>
        <button class="btn-primary" id="changePinBtn">تغيير رمز PIN</button>
      </div>
    </div>
  `;

  document.getElementById("saveCloudinaryBtn").addEventListener("click", () => {
    settingsData.cloudinaryCloudName = document.getElementById("setCloudName").value.trim();
    settingsData.cloudinaryUploadPreset = document.getElementById("setUploadPreset").value.trim();
    saveSettings();
    showToast("تم حفظ إعدادات Cloudinary بنجاح ☁️");
  });

  document.getElementById("saveSocialBtn").addEventListener("click", () => {
    settingsData.whatsappNumber = document.getElementById("setWhatsapp").value.trim();
    settingsData.instagramUrl = document.getElementById("setInstagram").value.trim();
    settingsData.phoneNumber = document.getElementById("setPhone").value.trim();
    settingsData.whatsappUrl = `https://wa.me/${settingsData.whatsappNumber}`;
    saveSettings();
    showToast("تم حفظ وسائل التواصل بنجاح");
  });

  document.getElementById("changePinBtn").addEventListener("click", () => {
    const current = document.getElementById("currentPin").value;
    const newPin = document.getElementById("newPin").value;
    const confirm = document.getElementById("confirmPin").value;

    if (current !== (settingsData.adminPin || "1234")) {
      showToast("الرمز الحالي غير صحيح", "error"); return;
    }
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      showToast("الرمز الجديد يجب أن يكون 4 أرقام", "error"); return;
    }
    if (newPin !== confirm) {
      showToast("الرمز الجديد وتأكيده غير متطابقين", "error"); return;
    }

    settingsData.adminPin = newPin;
    saveSettings();
    showToast("تم تغيير رمز PIN بنجاح");
    document.getElementById("currentPin").value = "";
    document.getElementById("newPin").value = "";
    document.getElementById("confirmPin").value = "";
  });
}

// ============================================================================
// Cloudinary Direct Cloud Image Upload
// ============================================================================

async function uploadImage(file, targetInputId, progressWrapperId, progressFillId) {
  if (!file) return;

  const progressWrap = document.getElementById(progressWrapperId);
  const progressFill = document.getElementById(progressFillId);
  if (progressWrap) progressWrap.classList.add("active");
  if (progressFill) progressFill.style.width = "20%";

  const cloudName = settingsData.cloudinaryCloudName || "";
  const uploadPreset = settingsData.cloudinaryUploadPreset || "";

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

      // Retry with underscore version if failed due to preset name space
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
        const input = document.getElementById(targetInputId);
        if (input) {
          input.value = data.secure_url;
          const previewImg = document.getElementById("offerPreviewImg");
          if (previewImg && targetInputId === "offerImage") {
            previewImg.src = data.secure_url;
          }
        }

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

  // 2. If Cloudinary credentials are not filled, show guided toast and compress
  try {
    showToast("يرجى إدخال Cloud Name و Upload Preset في الإعدادات لرفع الصور إلى Cloudinary", "info");
    const compressed = await compressImage(file);
    const input = document.getElementById(targetInputId);
    if (input) {
      input.value = compressed;
      const previewImg = document.getElementById("offerPreviewImg");
      if (previewImg && targetInputId === "offerImage") previewImg.src = compressed;
    }
    if (progressFill) progressFill.style.width = "100%";
    setTimeout(() => {
      if (progressWrap) progressWrap.classList.remove("active");
      showToast("تم حفظ الصورة مؤقتاً");
    }, 300);
  } catch (err) {
    if (progressWrap) progressWrap.classList.remove("active");
    showToast("خطأ: " + err.message, "error");
  }
}

/**
 * Resizes and compresses an image file to a lightweight Data URL (fallback)
 */
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

function showModal(onSave) {
  modalSaveCallback = onSave;
  document.getElementById("modalOverlay").classList.add("active");
}

function hideModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  modalSaveCallback = null;
  currentEditId = null;
}

function initModal() {
  document.getElementById("modalCloseBtn").addEventListener("click", hideModal);
  document.getElementById("modalCancelBtn").addEventListener("click", hideModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) hideModal();
  });
  document.getElementById("modalSaveBtn").addEventListener("click", () => {
    if (modalSaveCallback) modalSaveCallback();
  });
}

// ============================================================================
// Export / Import / Reset
// ============================================================================
function initTools() {
  document.getElementById("exportBtn").addEventListener("click", () => {
    const exportData = { menu: menuData, offer: offerData, settings: settingsData, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moka-menu-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("تم تحميل النسخة الاحتياطية");
  });

  document.getElementById("importFileInput").addEventListener("change", (e) => {
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

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (!confirm("⚠️ هل أنت متأكد من إعادة تعيين جميع البيانات إلى القيم الافتراضية؟\nلا يمكن التراجع عن هذا الإجراء.")) return;
    localStorage.removeItem("moka_menu_data");
    localStorage.removeItem("moka_offer_data");
    localStorage.removeItem("moka_settings");
    localStorage.removeItem("moka_last_edit");
    loadData();
    renderDashboard();
    showToast("تم إعادة تعيين جميع البيانات إلى القيم الافتراضية");
  });
}

// ============================================================================
// Init
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  loadCloudDataInitial();
  initLogin();
  initNavigation();
  initModal();
  initTools();

  // Wire up Add buttons
  document.getElementById("addCategoryBtn").addEventListener("click", () => openCategoryModal());
  document.getElementById("addItemBtn").addEventListener("click", () => {
    const catId = document.getElementById("itemCategoryFilter").value;
    if (!catId) { showToast("اختر قسم أولاً", "error"); return; }
    openItemModal(catId);
  });
});
