<template>
  <Layout>
    <!-- Custom Arabic-optimized layout wrapper -->
    <template #doc-before>
      <div class="arabic-doc-wrapper">
        <!-- Language direction helper -->
        <div class="lang-direction-indicator" v-if="$route.path.startsWith('/en/')">
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
          <h3>{{ $route.path.startsWith('/en/') ? 'Contribute' : 'ساهم في التطوير' }}</h3>
          <p v-if="$route.path.startsWith('/en/')">
            Help improve this documentation by contributing to the 
            <a href="https://github.com/OmarAglan/Baa" target="_blank">main repository</a>.
          </p>
          <p v-else>
            ساعد في تحسين هذا التوثيق من خلال المساهمة في 
            <a href="https://github.com/OmarAglan/Baa" target="_blank">المستودع الرئيسي</a>.
          </p>
        </div>
        
        <div class="sync-info">
          <small v-if="$route.path.startsWith('/en/')">
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
        <span class="version-badge">{{ $route.path.startsWith('/en/') ? 'Alpha' : 'ألفا' }}</span>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
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
