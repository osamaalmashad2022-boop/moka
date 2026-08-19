# ☕ MoKa Cafe — Digital Menu (قائمة موكا كافيه الرقمية)

A modern, high-performance, mobile-first digital menu web application designed for **MoKa Cafe**. Built with pure Vanilla HTML5, CSS3, and JavaScript with complete bilingual support (Arabic RTL & English LTR).

---

## ✨ Features

- 📱 **Mobile-First & Ultra-Fast**: Optimized for instant QR code loading (<300 KB total image bundle).
- 🌐 **Bilingual (RTL / LTR)**: One-tap toggle between Arabic (RTL) and English (LTR).
- 🔍 **Instant Real-Time Search**: Live search across 100+ menu items and descriptions in both Arabic and English.
- 📌 **Sticky Category Navigation**: Horizontal scrollable categories with automatic ScrollSpy tracking.
- ☕ **15 Complete Categories**:
  1. Specialty Coffee (القهوة)
  2. Hot Beverages (المشروبات الساخنة)
  3. Iced Drinks (مشروبات مثلجة)
  4. Fresh Juices (العصائر الطبيعية)
  5. Signature Cocktails (الكوكتيل)
  6. Smoothies (السموزي)
  7. Milkshakes (ميلك شيك)
  8. Frappes (فرابيه)
  9. Mojitos & Soda (الصودا والموخيتو)
  10. Soft Drinks (المشروبات الغازية)
  11. Artisan Ice Cream (أيس كريم)
  12. Yogurt Bowls (الزبادي)
  13. Desserts & Cakes (ديزرت والحلويات)
  14. Belgian Waffles (الوافل البلجيكي)
  15. Mini Pancakes (ميني بان كيك) — with dual portion pricing (12 pcs / 24 pcs).
- 🎨 **Artisanal Espresso Aesthetic**: Warm coffee & burnished copper color palette with responsive micro-animations.

---

## 🚀 Live Preview / Local Setup

No build tools or heavy dependencies required. Simply serve the directory with any static HTTP server or open `index.html` directly in a browser:

```bash
# Using npx serve (recommended)
npx -y serve -p 3000

# Or using Python 3
python -m http.server 3000
```

Then visit [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
├── index.html            # Semantic HTML shell & metadata
├── css/
│   └── style.css         # Complete design system & custom properties
├── js/
│   └── app.js            # Menu dataset, state, search & scroll-spy engine
├── assets/
│   └── images/           # Compressed & optimized image assets
└── README.md
```

---

## 📄 License
© MoKa Cafe. All rights reserved.
