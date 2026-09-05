# FreshPress - Laundry & Dry-Cleaning Pickup Service HTML Template

> A modern, production-grade, multi-page HTML5/CSS3/JavaScript template designed for doorstep laundry pickup and eco-friendly dry-cleaning services, smart building lockers, and commercial linen platforms.

---

## 🌟 Highlights

- **16 Complete Pages**: Covering both required core pages, specialized landings, and administrative portals.
- **Dedicated Dashboards**:
  - **Customer Dashboard**: Interactive 5-stage live order tracking stepper, clothing category selector, pickup scheduler with time slots, order history with simulated printable PDF invoices, and saved delivery address manager.
  - **Admin Operations Dashboard**: Fleet van dispatch, real-time order status updater, and Chart.js weekly order and revenue analytics.
- **Dark & Light Mode**: Automatic system preference detection (`prefers-color-scheme`), one-click header toggle, and persistent `localStorage`.
- **Right-to-Left (RTL) Layout**: Full RTL support for Arabic, Hebrew, and Persian layouts with instant toggle and directional styling in `rtl.css`.
- **Zero-Dependency Core**: Clean semantic HTML5, modern CSS3 variables, and vanilla ES6+ JavaScript.
- **Interactive Tools**: Dynamic laundry basket pricing estimator, instant zip code service area coverage checker, and live animated coming-soon countdown timer.
- **SEO & Accessibility**: WCAG 2.1 AA accessible, JSON-LD structured data, meta tags, `sitemap.xml`, and `robots.txt`.

---

## 📂 Project Structure

```
laundry-pickup-service/
├── index.html                     # Primary landing page entry point
├── robots.txt                     # Production crawler rules
├── sitemap.xml                    # Production XML sitemap
├── README.md                      # Project documentation
├── assets/
│   ├── css/
│   │   ├── style.css              # Main design system tokens, typography, components
│   │   ├── dark-mode.css          # Dark theme overrides & surface mappings
│   │   └── rtl.css                # Right-to-Left layout rules
│   ├── js/
│   │   ├── main.js                # Core controller: theme, RTL, forms, calculators
│   │   └── dashboard.js           # Stepper, order queue, address manager, chart
│   └── images/                    # Image assets
├── pages/
│   ├── index.html                 # Home 1 - General Services Landing
│   ├── home-niche.html            # Home 2 - B2B Commercial & On-Demand SaaS
│   ├── about.html                 # About Us - Story, Team, History, Mission
│   ├── services.html              # Services Catalog - 8 filterable services
│   ├── service-offerings.html     # Offerings, Logistics & Zip Coverage Checker
│   ├── service-details.html       # Service Details - Eco Dry Cleaning, Rates, FAQs
│   ├── pricing.html               # Pricing Page & Dynamic Basket Cost Estimator
│   ├── blog.html                  # Blog - Searchable & filterable fabric care articles
│   ├── blog-details.html          # Blog Details - Full post with sidebar & comments
│   ├── contact.html               # Contact Us - Map, operational hubs, validated form
│   ├── login.html                 # Customer & Staff Login Portal
│   ├── register.html              # Customer Registration & Password Strength Meter
│   ├── dashboard-user.html        # Customer Dashboard (Assigned Features)
│   ├── dashboard-admin.html       # Admin Operations Dashboard (Fleet & Chart.js)
│   ├── 404.html                   # Custom 404 Page ("Lost in the Wash")
│   └── coming-soon.html           # Maintenance & Launch Countdown Page
└── documentation/
    └── index.html                 # Comprehensive Interactive User Guide
```

---

## 🚀 Getting Started

1. **Direct Browser Access**: Double-click `index.html` or `pages/index.html` to open the template immediately in any modern browser (Chrome, Safari, Edge, Firefox).
2. **Local HTTP Server (Optional)**:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js
   npx serve .
   ```
   Then open `http://localhost:8000` in your browser.

---

## 🎨 Customization

All primary variables are defined at the top of `assets/css/style.css`:

```css
:root {
  --primary: #0284c7;           /* Main aqua blue */
  --primary-hover: #0369a1;
  --secondary: #0f172a;         /* Deep navy slate */
  --accent: #10b981;            /* Mint green / eco badges */
  --bg: #f8fafc;
  --surface: #ffffff;
}
```

---

## 📄 License & Credits

- Google Fonts: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Outfit](https://fonts.google.com/specimen/Outfit)
- Icons: [Font Awesome 6 Free CDN](https://fontawesome.com/)
- Charts: [Chart.js CDN](https://www.chartjs.org/)
- Photography: [Unsplash](https://unsplash.com/)
