export default {
  title: 'لغة باء',
  titleTemplate: ':title | Baa Programming Language',
  description: 'لغة برمجة عربية حديثة - Modern Arabic Programming Language',
  ignoreDeadLinks: [
    // Ignore all relative links that don't exist yet
    /^\.\/.*$/,
    /^\.\.\/.*$/,
    // Ignore specific patterns
    'LICENSE',
    /.*%D.*/, // Ignore URL-encoded links
  ],
  
  // Base path for deployment
  base: '/baa-wiki/',
  
  head: [
    ['link', { rel: 'icon', href: '/baa-wiki/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c4043' }],
    ['meta', { property: 'og:title', content: 'لغة باء - Baa Language' }],
    ['meta', { property: 'og:description', content: 'لغة برمجة عربية حديثة' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'ar_SA' }],
    ['meta', { property: 'og:locale:alternate', content: 'en_US' }],
    // Arabic fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap', rel: 'stylesheet' }]
  ],

  // Arabic as default, English as secondary
  locales: {
    root: {
      label: 'العربية',
      lang: 'ar-SA',
      dir: 'rtl',
      title: 'لغة باء',
      description: 'لغة برمجة عربية حديثة',
      
      themeConfig: {
        logo: '/logo.svg',
        
        nav: [
          { text: 'الرئيسية', link: '/' },
          { text: 'البداية السريعة', link: '/00_نظرة_عامة/البداية_السريعة' },
          { 
            text: 'التوثيق',
            items: [
              { text: 'نظرة عامة', link: '/00_نظرة_عامة/' },
              { text: 'مواصفات اللغة', link: '/01_مواصفات_اللغة/' },
              { text: 'معمارية المترجم', link: '/02_معمارية_المترجم/' },
              { text: 'دليل التطوير', link: '/03_التطوير/' },
              { text: 'أمثلة وتطبيقات', link: '/04_أمثلة_وتطبيقات/' }
            ]
          },
          { 
            text: 'المجتمع',
            items: [
              { text: 'GitHub', link: 'https://github.com/OmarAglan/Baa' },
              { text: 'المناقشات', link: 'https://github.com/OmarAglan/Baa/discussions' },
              { text: 'القضايا', link: 'https://github.com/OmarAglan/Baa/issues' }
            ]
          }
        ],
        
        sidebar: {
          '/': getArabicSidebar(),
          '/00_نظرة_عامة/': getOverviewSidebar(),
          '/01_مواصفات_اللغة/': getLanguageSpecSidebar(),
          '/02_معمارية_المترجم/': getArchitectureSidebar(),
          '/03_التطوير/': getDevelopmentSidebar(),
          '/04_أمثلة_وتطبيقات/': getExamplesSidebar()
        },

        editLink: {
          pattern: 'https://github.com/OmarAglan/Baa/edit/main/docs/:path',
          text: 'تحرير هذه الصفحة على GitHub'
        },

        lastUpdatedText: 'آخر تحديث',
        docFooter: {
          prev: 'السابق',
          next: 'التالي'
        },

        returnToTopLabel: 'العودة للأعلى',
        sidebarMenuLabel: 'القائمة',
        darkModeSwitchLabel: 'المظهر',
        lightModeSwitchTitle: 'التبديل للمظهر الفاتح',
        darkModeSwitchTitle: 'التبديل للمظهر الداكن',

        footer: {
          message: 'مرخص تحت رخصة MIT',
          copyright: 'حقوق الطبع © 2024 فريق لغة باء'
        },

        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: 'بحث',
                buttonAriaLabel: 'البحث في التوثيق'
              },
              modal: {
                displayDetails: 'عرض التفاصيل',
                resetButtonTitle: 'إعادة تعيين البحث',
                backButtonTitle: 'إغلاق البحث',
                noResultsText: 'لا توجد نتائج لـ',
                footer: {
                  selectText: 'للاختيار',
                  selectKeyAriaLabel: 'إدخال',
                  navigateText: 'للتنقل',
                  navigateUpKeyAriaLabel: 'سهم لأعلى',
                  navigateDownKeyAriaLabel: 'سهم لأسفل',
                  closeText: 'للإغلاق',
                  closeKeyAriaLabel: 'إسكيب'
                }
              }
            }
          }
        }
      }
    },

    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Baa Language',
      description: 'Modern Arabic Programming Language',
      
      themeConfig: {
        logo: '/logo.svg',
        
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Quick Start', link: '/en/00_OVERVIEW/QUICK_START' },
          { 
            text: 'Documentation',
            items: [
              { text: 'Overview', link: '/en/00_OVERVIEW/' },
              { text: 'Language Specification', link: '/en/01_LANGUAGE_SPECIFICATION/' },
              { text: 'Compiler Architecture', link: '/en/02_COMPILER_ARCHITECTURE/' },
              { text: 'Development Guide', link: '/en/03_DEVELOPMENT/' },
              { text: 'Examples & Applications', link: '/en/04_EXAMPLES_APPLICATIONS/' }
            ]
          },
          { 
            text: 'Community',
            items: [
              { text: 'GitHub', link: 'https://github.com/OmarAglan/Baa' },
              { text: 'Discussions', link: 'https://github.com/OmarAglan/Baa/discussions' },
              { text: 'Issues', link: 'https://github.com/OmarAglan/Baa/issues' }
            ]
          }
        ],
        
        sidebar: {
          '/en/': getEnglishSidebar()
        },

        editLink: {
          pattern: 'https://github.com/OmarAglan/Baa/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },

        footer: {
          message: 'Released under the MIT License',
          copyright: 'Copyright © 2024 Baa Language Team'
        }
      }
    }
  },

  markdown: {
    shiki: {
      langAlias: {
        'baa': 'c',
        'ebnf': 'text'
      }
    }
  },

  // Optimize for Arabic content and asset handling
  vite: {
    optimizeDeps: {
      include: ['vue']
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      }
    }
  },
  
  // Ensure clean URLs and proper routing
  cleanUrls: true
}

function getArabicSidebar() {
  return [
    {
      text: 'مرحباً بك في لغة باء',
      items: [
        { text: 'البداية السريعة', link: '/00_نظرة_عامة/البداية_السريعة' },
        { text: 'ما هي لغة باء؟', link: '/00_نظرة_عامة/ما_هي_لغة_باء' },
        { text: 'لماذا لغة عربية؟', link: '/00_نظرة_عامة/لماذا_لغة_عربية' }
      ]
    },
    {
      text: 'البدء',
      items: [
        { text: 'التثبيت', link: '/00_نظرة_عامة/التثبيت' },
        { text: 'أول برنامج', link: '/00_نظرة_عامة/أول_برنامج' },
        { text: 'المحرر المدمج', link: '/00_نظرة_عامة/المحرر_المدمج' }
      ]
    }
  ]
}

function getOverviewSidebar() {
  return [
    {
      text: 'نظرة عامة',
      collapsible: true,
      items: [
        { text: 'البداية السريعة', link: '/00_نظرة_عامة/البداية_السريعة' },
        { text: 'الحالة الحالية', link: '/00_نظرة_عامة/الحالة_الحالية' },
        { text: 'هيكل المشروع', link: '/00_نظرة_عامة/هيكل_المشروع' },
        { text: 'خارطة الطريق', link: '/00_نظرة_عامة/خارطة_الطريق' }
      ]
    }
  ]
}

function getLanguageSpecSidebar() {
  return [
    {
      text: 'مواصفات اللغة',
      collapsible: true,
      items: [
        { text: 'نظرة عامة على اللغة', link: '/01_مواصفات_اللغة/نظرة_عامة_على_اللغة' },
        { text: 'الميزات العربية', link: '/01_مواصفات_اللغة/الميزات_العربية' },
        { text: 'مرجع النحو', link: '/01_مواصفات_اللغة/مرجع_النحو' },
        { text: 'أنواع البيانات', link: '/01_مواصفات_اللغة/أنواع_البيانات' },
        { text: 'العمليات والتعابير', link: '/01_مواصفات_اللغة/العمليات_والتعابير' },
        { text: 'التحكم في التدفق', link: '/01_مواصفات_اللغة/التحكم_في_التدفق' },
        { text: 'الدوال والوحدات', link: '/01_مواصفات_اللغة/الدوال_والوحدات' }
      ]
    }
  ]
}

function getArchitectureSidebar() {
  return [
    {
      text: 'معمارية المترجم',
      collapsible: true,
      items: [
        { text: 'نظرة عامة', link: '/02_معمارية_المترجم/نظرة_عامة' },
        { text: 'التحليل المعجمي', link: '/02_معمارية_المترجم/التحليل_المعجمي' },
        { text: 'التحليل النحوي', link: '/02_معمارية_المترجم/التحليل_النحوي' },
        { text: 'التحليل الدلالي', link: '/02_معمارية_المترجم/التحليل_الدلالي' },
        { text: 'توليد الكود', link: '/02_معمارية_المترجم/توليد_الكود' },
        { text: 'التحسين', link: '/02_معمارية_المترجم/التحسين' }
      ]
    }
  ]
}

function getDevelopmentSidebar() {
  return [
    {
      text: 'دليل التطوير',
      collapsible: true,
      items: [
        { text: 'إعداد بيئة التطوير', link: '/03_التطوير/إعداد_بيئة_التطوير' },
        { text: 'بناء المشروع', link: '/03_التطوير/بناء_المشروع' },
        { text: 'تشغيل الاختبارات', link: '/03_التطوير/تشغيل_الاختبارات' },
        { text: 'دليل المساهمة', link: '/03_التطوير/دليل_المساهمة' },
        { text: 'معايير الكود', link: '/03_التطوير/معايير_الكود' }
      ]
    }
  ]
}

function getExamplesSidebar() {
  return [
    {
      text: 'أمثلة وتطبيقات',
      collapsible: true,
      items: [
        { text: 'أمثلة أساسية', link: '/04_أمثلة_وتطبيقات/أمثلة_أساسية' },
        { text: 'خوارزميات', link: '/04_أمثلة_وتطبيقات/خوارزميات' },
        { text: 'تطبيقات عملية', link: '/04_أمثلة_وتطبيقات/تطبيقات_عملية' },
        { text: 'مشاريع مفتوحة المصدر', link: '/04_أمثلة_وتطبيقات/مشاريع_مفتوحة_المصدر' }
      ]
    }
  ]
}

function getEnglishSidebar() {
  return [
    {
      text: 'Welcome to Baa',
      items: [
        { text: 'Quick Start', link: '/en/00_OVERVIEW/QUICK_START' },
        { text: 'What is Baa?', link: '/en/00_OVERVIEW/WHAT_IS_BAA' },
        { text: 'Why Arabic?', link: '/en/00_OVERVIEW/WHY_ARABIC' }
      ]
    },
    {
      text: 'Getting Started',
      items: [
        { text: 'Installation', link: '/en/00_OVERVIEW/INSTALLATION' },
        { text: 'First Program', link: '/en/00_OVERVIEW/FIRST_PROGRAM' },
        { text: 'IDE Integration', link: '/en/00_OVERVIEW/IDE_INTEGRATION' }
      ]
    }
  ]
}
