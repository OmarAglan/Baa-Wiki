<template>
  <div class="baa-example">
    <div class="baa-example-header">
      <span class="example-title">{{ title || (isArabic ? 'مثال بلغة باء' : 'Baa Example') }}</span>
      <button 
        v-if="copyable" 
        @click="copyCode" 
        class="copy-button"
        :title="isArabic ? 'نسخ الكود' : 'Copy code'"
      >
        <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </button>
    </div>
    
    <div class="baa-example-code">
      <pre><code class="language-baa" v-html="highlightedCode"></code></pre>
    </div>
    
    <div v-if="output" class="baa-example-output">
      <div class="output-label">{{ isArabic ? 'الناتج:' : 'Output:' }}</div>
      <pre>{{ output }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    required: true
  },
  output: {
    type: String,
    default: ''
  },
  copyable: {
    type: Boolean,
    default: true
  },
  lang: {
    type: String,
    default: 'ar'
  }
})

const copied = ref(false)

const isArabic = computed(() => props.lang === 'ar')

const highlightedCode = computed(() => {
  // Simple syntax highlighting for Baa language
  let code = props.code
  
  // Keywords highlighting
  const keywords = ['دالة', 'إذا', 'وإلا', 'بينما', 'لكل', 'في', 'عودة', 'نوع', 'فئة', 'استورد', 'صدّر']
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    code = code.replace(regex, `<span class="token keyword">${keyword}</span>`)
  })
  
  // String highlighting
  code = code.replace(/"([^"]*)"/g, '<span class="token string">"$1"</span>')
  code = code.replace(/'([^']*)'/g, '<span class="token string">\'$1\'</span>')
  
  // Arabic numbers highlighting
  code = code.replace(/\b[\u0660-\u0669]+\b/g, '<span class="token arabic-number">$&</span>')
  
  // Comments highlighting
  code = code.replace(/\/\/(.*)$/gm, '<span class="token comment">//$1</span>')
  code = code.replace(/\/\*([\s\S]*?)\*\//g, '<span class="token comment">/*$1*/</span>')
  
  // Function names highlighting
  code = code.replace(/\b([أ-ي][أ-ي\u0640-\u065F\u0670-\u06EF]*)\s*\(/g, '<span class="token function">$1</span>(')
  
  return code
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<style scoped>
.baa-example {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;
  background: var(--vp-c-bg);
}

.baa-example-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.example-title {
  font-size: 0.875rem;
}

.copy-button {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.25rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-button:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.baa-example-code {
  background: var(--vp-code-block-bg);
  overflow-x: auto;
}

.baa-example-code pre {
  margin: 0;
  padding: 1rem;
  background: transparent;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-code-color);
  direction: ltr;
  text-align: left;
}

.baa-example-code code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-weight: normal;
}

.baa-example-output {
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.output-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.baa-example-output pre {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* RTL adjustments */
[dir="rtl"] .baa-example-header {
  flex-direction: row-reverse;
}

[dir="rtl"] .copy-button {
  margin-left: 0;
  margin-right: 0.5rem;
}

/* Syntax highlighting tokens */
:deep(.token.keyword) {
  color: var(--vp-c-brand);
  font-weight: 600;
}

:deep(.token.string) {
  color: #22863a;
}

:deep(.token.arabic-number) {
  color: #005cc5;
  font-weight: 500;
}

:deep(.token.comment) {
  color: #6a737d;
  font-style: italic;
}

:deep(.token.function) {
  color: #6f42c1;
  font-weight: 500;
}

/* Dark mode syntax highlighting */
.dark :deep(.token.keyword) {
  color: var(--vp-c-brand-light);
}

.dark :deep(.token.string) {
  color: #85e89d;
}

.dark :deep(.token.arabic-number) {
  color: #79c0ff;
}

.dark :deep(.token.comment) {
  color: #8b949e;
}

.dark :deep(.token.function) {
  color: #d2a8ff;
}
</style>
