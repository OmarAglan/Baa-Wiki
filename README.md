# 📚 Baa Wiki - لغة باء التوثيقية

<div align="center">

![Baa Language Logo](https://via.placeholder.com/200x80/d4af37/ffffff?text=لغة+باء)

**موقع التوثيق الرسمي للغة باء البرمجية**  
*Official Documentation Site for Baa Programming Language*

[![Documentation Sync](https://github.com/OmarAglan/baa-wiki/actions/workflows/sync-docs.yml/badge.svg)](https://github.com/OmarAglan/baa-wiki/actions/workflows/sync-docs.yml)
[![Deploy to GitHub Pages](https://github.com/OmarAglan/baa-wiki/actions/workflows/deploy.yml/badge.svg)](https://github.com/OmarAglan/baa-wiki/actions/workflows/deploy.yml)
[![VitePress](https://img.shields.io/badge/Built%20with-VitePress-646cff.svg)](https://vitepress.dev/)
[![Arabic-First](https://img.shields.io/badge/Arabic--First-RTL%20Optimized-d4af37.svg)](#)

[🌐 **عرض الموقع المباشر**](https://OmarAglan.github.io/baa-wiki/) • [📖 **التوثيق**](https://OmarAglan.github.io/baa-wiki/) • [🔗 **المستودع الرئيسي**](https://github.com/OmarAglan/Baa)

</div>

---

## 🎯 **نظرة عامة | Overview**

هذا المستودع يحتوي على الموقع التوثيقي للغة باء البرمجية، مبني باستخدام [VitePress](https://vitepress.dev/) مع تحسينات خاصة للغة العربية ودعم كامل لـ RTL.

*This repository contains the documentation website for the Baa Programming Language, built with [VitePress](https://vitepress.dev/) and optimized for Arabic with full RTL support.*

### ✨ **الميزات الرئيسية | Key Features**

- 🏛️ **عربية بالكامل**: واجهة وتوثيق باللغة العربية مع دعم RTL كامل
- 🔄 **مزامنة تلقائية**: مزامنة تلقائية للتوثيق من المستودع الرئيسي
- 🌍 **ثنائية اللغة**: دعم العربية والإنجليزية
- 🎨 **تصميم مخصص**: ثيم مصمم خصيصاً للمحتوى العربي
- ⚡ **أداء عالي**: بناء سريع ونشر تلقائي على GitHub Pages
- 📱 **تصميم متجاوب**: متوافق مع جميع الأجهزة

---

## 🚀 **البدء السريع | Quick Start**

### المتطلبات | Prerequisites

- Node.js 18+ 
- npm أو yarn أو pnpm

### التثبيت | Installation

```bash
# استنساخ المستودع | Clone the repository
git clone https://github.com/OmarAglan/baa-wiki.git
cd baa-wiki

# تثبيت التبعيات | Install dependencies
npm install

# تشغيل الخادم المحلي | Start development server
npm run dev
```

الموقع سيكون متاحاً على `http://localhost:5173`

*The site will be available at `http://localhost:5173`*

---

## 🔧 **البناء والنشر | Build & Deploy**

### البناء المحلي | Local Build

```bash
# بناء الموقع | Build the site
npm run build

# معاينة البناء | Preview the build
npm run preview
```

### النشر التلقائي | Automatic Deployment

يتم نشر الموقع تلقائياً على GitHub Pages عند:
- دفع تغييرات إلى الفرع `main`
- مزامنة تلقائية للتوثيق من المستودع الرئيسي

*The site is automatically deployed to GitHub Pages when:*
- *Pushing changes to the `main` branch*
- *Automatic documentation sync from the main repository*

---

## 🔄 **مزامنة التوثيق | Documentation Sync**

### كيف تعمل المزامنة | How Sync Works

1. **مزامنة مجدولة**: كل 6 ساعات تلقائياً
2. **مزامنة فورية**: عند تحديث التوثيق في المستودع الرئيسي
3. **مزامنة يدوية**: يمكن تشغيلها يدوياً من GitHub Actions

*1. **Scheduled Sync**: Every 6 hours automatically*
*2. **Instant Sync**: When documentation is updated in the main repository*
*3. **Manual Sync**: Can be triggered manually from GitHub Actions*

### إعداد المزامنة من المستودع الرئيسي | Setting Up Main Repository Trigger

أضف هذا الـ workflow إلى المستودع الرئيسي:

*Add this workflow to the main repository:*

```yaml
# .github/workflows/trigger-wiki-sync.yml
name: Trigger Wiki Sync

on:
  push:
    paths:
      - 'docs/**'
    branches: [main]

jobs:
  trigger-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger baa-wiki sync
        run: |
          curl -X POST \
            -H "Authorization: token ${{ secrets.WIKI_SYNC_TOKEN }}" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/OmarAglan/baa-wiki/dispatches \
            -d '{"event_type":"docs-updated"}'
```

---

## 🎨 **التخصيص | Customization**

### تخصيص الثيم | Theme Customization

يمكن تخصيص الثيم من خلال تعديل الملفات التالية:

*The theme can be customized by modifying the following files:*

- **`.vitepress/theme/custom.css`**: الأنماط المخصصة | Custom styles
- **`.vitepress/theme/Layout.vue`**: تخطيط الصفحة | Page layout
- **`.vitepress/config.js`**: إعدادات VitePress | VitePress configuration

### إضافة مكونات جديدة | Adding New Components

```bash
# إنشاء مكون جديد | Create a new component
touch .vitepress/theme/components/MyComponent.vue

# تسجيل المكون | Register the component
# Add to .vitepress/theme/index.js
app.component('MyComponent', MyComponent)
```

---

## 📁 **هيكل المشروع | Project Structure**

```
baa-wiki/
├── 📁 .github/workflows/     # GitHub Actions workflows
│   ├── sync-docs.yml         # مزامنة التوثيق | Documentation sync
│   └── deploy.yml            # نشر الموقع | Site deployment
├── 📁 .vitepress/           # إعدادات VitePress | VitePress config
│   ├── config.js            # إعدادات رئيسية | Main configuration
│   ├── 📁 theme/            # ثيم مخصص | Custom theme
│   │   ├── index.js         # دخل الثيم | Theme entry
│   │   ├── Layout.vue       # تخطيط رئيسي | Main layout
│   │   ├── custom.css       # أنماط مخصصة | Custom styles
│   │   └── 📁 components/   # مكونات مخصصة | Custom components
│   └── 📁 scripts/          # نصوص معالجة | Processing scripts
├── 📁 docs/                 # التوثيق (متزامن) | Documentation (synced)
├── package.json             # تبعيات المشروع | Project dependencies
└── README.md               # هذا الملف | This file
```

---

## 🛠️ **المساهمة | Contributing**

### تحسين التوثيق | Improving Documentation

التوثيق الأساسي موجود في [المستودع الرئيسي](https://github.com/OmarAglan/Baa/tree/main/docs). للمساهمة:

*The main documentation is in the [main repository](https://github.com/OmarAglan/Baa/tree/main/docs). To contribute:*

1. توجه إلى المستودع الرئيسي | Go to the main repository
2. عدّل الملفات في مجلد `docs/` | Edit files in the `docs/` folder  
3. أرسل Pull Request | Submit a Pull Request
4. ستتم المزامنة تلقائياً | Sync will happen automatically

### تحسين الموقع | Improving the Website

لتحسين الموقع نفسه (التصميم، الثيم، الوظائف):

*To improve the website itself (design, theme, functionality):*

1. Fork هذا المستودع | Fork this repository
2. أجرِ التحسينات | Make improvements
3. اختبر محلياً | Test locally
4. أرسل Pull Request | Submit a Pull Request

---

## 📖 **الوثائق | Documentation**

### دليل VitePress

- [التوثيق الرسمي](https://vitepress.dev/guide/getting-started) | [Official Documentation](https://vitepress.dev/guide/getting-started)
- [إعدادات الثيم](https://vitepress.dev/reference/default-theme-config) | [Theme Configuration](https://vitepress.dev/reference/default-theme-config)
- [دعم العربية](https://vitepress.dev/guide/i18n) | [Arabic Support](https://vitepress.dev/guide/i18n)

### مكونات لغة باء المخصصة | Custom Baa Components

```vue
<!-- مثال لكود باء | Baa Code Example -->
<BaaExample 
  title="مثال الدالة الأساسية"
  :code="codeExample"
  output="مرحباً بك في لغة باء!"
/>

<!-- محرر باء التفاعلي | Interactive Baa Editor -->
<InteractiveBaa 
  :initial-code="initialCode"
  lang="ar"
/>
```

---

## 🔧 **استكشاف الأخطاء | Troubleshooting**

### مشاكل شائعة | Common Issues

#### لا تظهر التحديثات | Updates Not Showing

```bash
# تحقق من حالة GitHub Actions | Check GitHub Actions status
# Go to: https://github.com/OmarAglan/baa-wiki/actions

# مزامنة يدوية | Manual sync
# Navigate to Actions → Sync Documentation → Run workflow
```

#### مشاكل في البناء | Build Issues

```bash
# تنظيف الذاكرة المؤقتة | Clear cache
rm -rf node_modules .vitepress/cache .vitepress/dist
npm install

# إعادة البناء | Rebuild
npm run build
```

#### مشاكل RTL | RTL Issues

تأكد من أن الـ locale في `config.js` مضبوط على `'ar-SA'` مع `dir: 'rtl'`

*Make sure the locale in `config.js` is set to `'ar-SA'` with `dir: 'rtl'`*

---

## 📝 **الترخيص | License**

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

*This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.*

---

## 🤝 **الشكر والتقدير | Acknowledgments**

- **[VitePress](https://vitepress.dev/)**: إطار العمل الأساسي | Core framework
- **[Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic)**: الخط العربي | Arabic typography
- **[GitHub Pages](https://pages.github.com/)**: استضافة مجانية | Free hosting
- **مجتمع لغة باء**: المساهمات والتطوير | **Baa Language Community**: Contributions and development

---

<div align="center">

**صُنع بـ ❤️ للمجتمع العربي المطور**  
*Made with ❤️ for the Arab Developer Community*

[🌟 **نجّم المشروع**](https://github.com/OmarAglan/baa-wiki/stargazers) • [🐛 **بلّغ عن خطأ**](https://github.com/OmarAglan/baa-wiki/issues) • [💡 **اقترح تحسيناً**](https://github.com/OmarAglan/baa-wiki/issues/new)

</div>
