<template>
  <div class="interactive-baa">
    <div class="interactive-header">
      <h3>{{ isArabic ? 'محرر باء التفاعلي' : 'Interactive Baa Editor' }}</h3>
      <div class="controls">
        <button @click="runCode" :disabled="running" class="run-button">
          <span v-if="running">{{ isArabic ? 'جاري التشغيل...' : 'Running...' }}</span>
          <span v-else>{{ isArabic ? '▶ تشغيل' : '▶ Run' }}</span>
        </button>
        <button @click="clearOutput" class="clear-button">
          {{ isArabic ? '🗑 مسح' : '🗑 Clear' }}
        </button>
      </div>
    </div>
    
    <div class="editor-container">
      <div class="editor-pane">
        <div class="pane-header">
          {{ isArabic ? 'الكود' : 'Code' }}
        </div>
        <textarea
          v-model="code"
          class="code-editor"
          :placeholder="isArabic ? 'اكتب كود باء هنا...' : 'Write Baa code here...'"
          spellcheck="false"
          dir="ltr"
        ></textarea>
      </div>
      
      <div class="output-pane">
        <div class="pane-header">
          {{ isArabic ? 'الناتج' : 'Output' }}
          <span v-if="executionTime" class="execution-time">
            ({{ executionTime }}ms)
          </span>
        </div>
        <div class="output-content" :class="{ error: hasError }">
          <pre v-if="output">{{ output }}</pre>
          <div v-else class="output-placeholder">
            {{ isArabic ? 'الناتج سيظهر هنا...' : 'Output will appear here...' }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="editor-footer">
      <small>
        {{ isArabic 
          ? '💡 نصيحة: استخدم الكلمات المفتاحية العربية مثل "دالة" و "إذا" و "بينما"' 
          : '💡 Tip: Use Arabic keywords like "دالة" (function), "إذا" (if), "بينما" (while)' 
        }}
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  initialCode: {
    type: String,
    default: 'دالة رئيسية() {\n    اطبع("مرحباً بك في لغة باء!");\n}'
  },
  lang: {
    type: String,
    default: 'ar'
  }
})

const code = ref(props.initialCode)
const output = ref('')
const running = ref(false)
const hasError = ref(false)
const executionTime = ref(null)

const isArabic = computed(() => props.lang === 'ar')

const runCode = async () => {
  running.value = true
  hasError.value = false
  executionTime.value = null
  
  const startTime = performance.now()
  
  try {
    // Simulate Baa code execution
    // In a real implementation, this would call the Baa interpreter
    await simulateBaaExecution(code.value)
  } catch (error) {
    hasError.value = true
    output.value = isArabic.value 
      ? `خطأ: ${error.message}`
      : `Error: ${error.message}`
  } finally {
    const endTime = performance.now()
    executionTime.value = Math.round(endTime - startTime)
    running.value = false
  }
}

const simulateBaaExecution = async (baaCode) => {
  // Simulate execution delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
  
  // Simple pattern matching for demo purposes
  const patterns = [
    {
      regex: /اطبع\s*\(\s*"([^"]*)"\s*\)/g,
      handler: (match, text) => text
    },
    {
      regex: /اطبع\s*\(\s*'([^']*)'\s*\)/g,
      handler: (match, text) => text
    },
    {
      regex: /دالة\s+(\w+)\s*\(\s*\)/g,
      handler: (match, name) => isArabic.value 
        ? `تم تعريف الدالة: ${name}`
        : `Function defined: ${name}`
    }
  ]
  
  let result = []
  
  // Check for syntax errors
  if (baaCode.includes('خطأ')) {
    throw new Error(isArabic.value ? 'خطأ في النحو' : 'Syntax error')
  }
  
  // Process patterns
  patterns.forEach(pattern => {
    let match
    while ((match = pattern.regex.exec(baaCode)) !== null) {
      result.push(pattern.handler(...match))
    }
  })
  
  // Default output if no patterns matched
  if (result.length === 0) {
    if (baaCode.trim()) {
      result.push(isArabic.value 
        ? 'تم تنفيذ الكود بنجاح (لا يوجد ناتج)'
        : 'Code executed successfully (no output)'
      )
    } else {
      result.push(isArabic.value 
        ? 'لا يوجد كود للتنفيذ'
        : 'No code to execute'
      )
    }
  }
  
  output.value = result.join('\n')
}

const clearOutput = () => {
  output.value = ''
  hasError.value = false
  executionTime.value = null
}
</script>

<style scoped>
.interactive-baa {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem 0;
  background: var(--vp-c-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.interactive-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.interactive-header h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.125rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
}

.run-button, .clear-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.run-button {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.run-button:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
}

.run-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.clear-button:hover {
  background: var(--vp-c-bg-alt);
}

.editor-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 300px;
}

.editor-pane, .output-pane {
  display: flex;
  flex-direction: column;
}

.editor-pane {
  border-right: 1px solid var(--vp-c-divider);
}

.pane-header {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.execution-time {
  color: var(--vp-c-text-3);
  font-weight: normal;
}

.code-editor {
  flex: 1;
  border: none;
  outline: none;
  padding: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  background: var(--vp-code-block-bg);
  color: var(--vp-code-color);
  resize: none;
  tab-size: 2;
}

.code-editor::placeholder {
  color: var(--vp-c-text-3);
}

.output-content {
  flex: 1;
  padding: 1rem;
  background: var(--vp-c-bg-alt);
  overflow-y: auto;
}

.output-content.error {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.output-content pre {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.output-placeholder {
  color: var(--vp-c-text-3);
  font-style: italic;
  text-align: center;
  padding: 2rem;
}

.editor-footer {
  background: var(--vp-c-bg-soft);
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  text-align: center;
}

/* RTL adjustments */
[dir="rtl"] .interactive-header {
  flex-direction: row-reverse;
}

[dir="rtl"] .controls {
  order: -1;
}

/* Responsive design */
@media (max-width: 768px) {
  .editor-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  
  .editor-pane {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  
  .interactive-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .controls {
    justify-content: center;
  }
}

/* Dark mode adjustments */
.dark .interactive-baa {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark .output-content.error {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}
</style>
