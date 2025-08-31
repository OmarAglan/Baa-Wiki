<template>
  <Layout>
    <!-- Progress Indicator -->
    <ProgressIndicator />
    
    <!-- Custom Arabic-optimized layout wrapper -->
    <template #doc-before>
      <div class="arabic-doc-wrapper">
        <!-- Language direction helper -->
        <div class="lang-direction-indicator" v-if="isEnglish">
          📖 Reading in English (LTR)
        </div>
        <div class="lang-direction-indicator arabic" v-else>
          📖 قراءة بالعربية (من اليمين لليسار)
        </div>
      </div>
    </template>

    <template #doc-after>
      <div class="doc-footer-arabic">
        <div class="contribute-section">
          <h3>{{ isEnglish ? 'Contribute' : 'ساهم في التطوير' }}</h3>
          <p v-if="isEnglish">
            Help improve this documentation by contributing to the 
            <a href="https://github.com/OmarAglan/Baa" target="_blank">main repository</a>.
          </p>
          <p v-else>
            ساعد في تحسين هذا التوثيق من خلال المساهمة في 
            <a href="https://github.com/OmarAglan/Baa" target="_blank">المستودع الرئيسي</a>.
          </p>
        </div>
        
        <div class="sync-info">
          <small v-if="isEnglish">
            📚 This documentation is automatically synced from the main Baa repository
          </small>
          <small v-else>
            📚 يتم مزامنة هذا التوثيق تلقائياً من مستودع لغة باء الرئيسي
          </small>
        </div>
      </div>
    </template>

    <template #nav-bar-title-after>
      <div class="baa-logo-extra">
        <span class="version-badge">{{ isEnglish ? 'Alpha' : 'ألفا' }}</span>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed, onMounted } from 'vue'
import ProgressIndicator from './components/ProgressIndicator.vue'

const { Layout } = DefaultTheme

const route = useRoute()
const isEnglish = computed(() => route.path.startsWith('/en/'))

// Register service worker for PWA functionality
onMounted(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/baa-wiki/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration.scope)
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                showUpdateNotification()
              }
            })
          })
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error)
        })
    })
  }
})

const showUpdateNotification = () => {
  // Create update notification
  const notification = document.createElement('div')
  notification.className = 'update-notification'
  notification.innerHTML = `
    <div class="update-content">
      <span>🔄 تحديث جديد متاح!</span>
      <button onclick="window.location.reload()">تحديث الآن</button>
      <button onclick="this.parentElement.parentElement.remove()">لاحقاً</button>
    </div>
  `
  
  // Add styles
  const style = document.createElement('style')
  style.textContent = `
    .update-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--vp-c-brand);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideInUp 0.3s ease;
    }
    
    .update-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .update-content button {
      padding: 0.25rem 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: transparent;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.75rem;
    }
    
    .update-content button:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @media (max-width: 768px) {
      .update-notification {
        bottom: 10px;
        right: 10px;
        left: 10px;
      }
      
      .update-content {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `
  
  document.head.appendChild(style)
  document.body.appendChild(notification)
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 10000)
}
</script>

<style scoped>
.arabic-doc-wrapper {
  margin-bottom: 1rem;
}

.lang-direction-indicator {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
}

.lang-direction-indicator.arabic {
  direction: rtl;
}

.doc-footer-arabic {
  margin-top: 3rem;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

.contribute-section h3 {
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.sync-info {
  margin-top: 1rem;
  text-align: center;
  opacity: 0.7;
}

.baa-logo-extra {
  margin-left: 0.5rem;
}

.version-badge {
  background: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-dark);
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* RTL support for Arabic pages */
[dir="rtl"] .baa-logo-extra {
  margin-left: 0;
  margin-right: 0.5rem;
}

[dir="rtl"] .doc-footer-arabic {
  text-align: right;
}
</style>
