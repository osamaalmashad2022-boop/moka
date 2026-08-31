# ☕ MoKa Cafe — Digital Menu & Management Platform (قائمة موكا كافيه الرقمية)

A modern, high-performance, mobile-first digital menu web application and administrative platform designed for **MoKa Cafe**. Built with pure Vanilla HTML5, CSS3, and JavaScript with complete bilingual support (Arabic RTL & English LTR), real-time cloud synchronization via Firebase Firestore, dynamic QR table tent cards generator, and Cloudflare Workers deployment.

🌐 **Live Website**: [https://moka.osamaalmashad.workers.dev/](https://moka.osamaalmashad.workers.dev/)

---

## ✨ Features

### 🍽️ Customer Menu (`index.html`)
- 📱 **Mobile-First & Ultra-Fast**: Optimized for instant QR code loading (<300 KB initial bundle).
- 🌐 **Bilingual (RTL / LTR)**: One-tap toggle between Arabic (RTL) and English (LTR).
- 🔍 **Instant Real-Time Search**: Live search across 100+ menu items and descriptions in both Arabic and English.
- 📌 **Sticky Category Navigation**: Horizontal scrollable category tabs with automatic ScrollSpy tracking.
- 🎯 **Quick Filter Chips**: One-tap filter by All, Bestsellers (الأكثر طلباً), Coffee, Cold Drinks, and Desserts.
- 📍 **Smart Table Auto-Detection**: Automatically detects table number from URL params (`?table=5` or `?t=VIP2`) with an active table banner and auto-fill in orders.
- 🛎️ **Luxury Waiter Order Card**: Interactive order cart with item customization (portion sizes, sugar levels restricted to coffee), notes, and instant waiter summary card.
- 🌓 **Dark / Light Mode**: Artisanal espresso dark theme and clean cream light mode with persistent preference.
- ☕ **15 Complete Categories (100+ Items)**:
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

### 🛠️ Admin Control Center (`admin.html`)
- 🔒 **PIN-Based Touch Keypad**: Mobile-optimized on-screen numeric keypad for quick cashier/admin access.
- ☁️ **Real-Time Firebase Firestore Sync**: Instant bidirectional cloud synchronization with offline localStorage fallback.
- 📷 **Cloudinary CDN Image Uploads**: Direct camera capture and gallery uploads with client-side image compression and instant cleanup.
- 🏷️ **Category & Item Management**: Full CRUD for categories, items, dual pricing, and one-tap bestseller toggles.
- 🎨 **Dynamic QR Code Studio & Table Tents Generator**:
  - **4 Modes**: Single Table, Main Menu, Takeaway/Bar, and Batch Range Generation (e.g. Tables 1 to 20).
  - **Dynamic Cloud Base URL**: Remotely point all QR codes to a custom domain at any time without reprinting cards.
  - **Embedded Free WiFi**: Optionally display cafe WiFi SSID and password on the printed cards.
  - **High-Res PNG Export**: Canvas-rendered 800×1100px 300 DPI tent card download for professional printing.
  - **Direct Batch Print**: Formatted grid layout ready for one-click browser printing.
- 💾 **Data Backup & Restore**: Full JSON export/import and cloud sync triggers.

---

## 📂 Project Structure

```
digital menu/
├── index.html            # Customer digital menu application
├── admin.html            # Administrative control center & QR studio
├── css/
│   ├── style.css         # Customer menu design system & dark/light theme
│   └── admin.css         # Admin panel mobile-first styles & touch keypad
├── js/
│   ├── app.js            # Customer app engine (search, cart, table detector, scrollspy)
│   ├── admin.js          # Admin panel logic (CRUD, QR canvas engine, image upload)
│   ├── default-menu.js   # Single source of truth for default menu dataset & icons
│   ├── firebase-sync.js  # Firebase Firestore real-time cloud synchronization layer
│   └── qrcode.min.js     # Standalone offline QR code generation library
├── assets/
│   └── images/           # Compressed & optimized image assets
├── firestore.rules       # Cloud Firestore security rules
├── robots.txt            # Search engine crawling rules (protecting admin panel)
├── sitemap.xml           # Multi-language XML sitemap
├── wrangler.jsonc        # Cloudflare Workers configuration
└── .assetsignore         # Cloudflare deployment build artifact exclusions
```

---

## 🚀 Deployment & Local Setup

### Live Deployment (Cloudflare Workers)
The application is deployed to Cloudflare Workers Static Assets:
```bash
npx wrangler deploy
```

### Local Development
No build tools required. Run with any static HTTP server:

```bash
# Using npx serve
npx -y serve -p 3000

# Or using Python 3
python -m http.server 3000
```
Visit [http://localhost:3000](http://localhost:3000) for the customer menu or [http://localhost:3000/admin.html](http://localhost:3000/admin.html) for the admin panel.

---

## 📄 License
© MoKa Cafe. All rights reserved.
