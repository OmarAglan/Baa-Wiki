<template>
  <div class="baa-playground">
    <div class="playground-header">
      <h3>🔧 محرر باء التفاعلي</h3>
      <div class="playground-controls">
        <button 
          @click="runCode" 
          :disabled="isRunning"
          class="run-button"
        >
          {{ isRunning ? 'جاري التشغيل...' : 'تشغيل الكود' }}
        </button>
        <button 
          @click="resetCode" 
          class="reset-button"
        >
          إعادة تعيين
        </button>
        <button 
          @click="copyCode" 
          class="copy-button"
        >
          نسخ الكود
        </button>
      </div>
    </div>
    
    <div class="playground-content">
      <div class="code-editor">
        <div class="editor-header">
          <span>📝 الكود</span>
        </div>
        <textarea
          v-model="code"
          @input="handleCodeChange"
          placeholder="اكتب كود باء هنا..."
          class="code-textarea"
          :disabled="isRunning"
        ></textarea>
      </div>
      
      <div class="output-panel">
        <div class="output-header">
          <span>📤 النتيجة</span>
          <button 
            @click="clearOutput" 
            class="clear-button"
          >
            مسح
          </button>
        </div>
        <div class="output-content">
          <div v-if="isRunning" class="loading-indicator">
            <div class="spinner"></div>
            <span>جاري تشغيل الكود...</span>
          </div>
          <pre v-else-if="output" class="output-text">{{ output }}</pre>
          <div v-else class="output-placeholder">
            ستظهر نتيجة تشغيل الكود هنا
          </div>
        </div>
      </div>
    </div>
    
    <div class="playground-examples">
      <h4>💡 أمثلة سريعة</h4>
      <div class="examples-grid">
        <button 
          v-for="example in examples" 
          :key="example.name"
          @click="loadExample(example)"
          class="example-button"
        >
          {{ example.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const code = ref(`دالة رئيسية() {
    اطبع("مرحباً بالعالم!");
    
    متغير اسم = "محمد";
    اطبع("أهلاً وسهلاً " + اسم);
}`)

const output = ref('')
const isRunning = ref(false)

const examples = [
  {
    name: 'مرحباً بالعالم',
    code: `دالة رئيسية() {
    اطبع("مرحباً بالعالم!");
}`
  },
  {
    name: 'حساب الأرقام',
    code: `دالة رئيسية() {
    متغير مجموع = ٠;
    لكل ي في المدى(١, ١١) {
        مجموع = مجموع + ي;
    }
    اطبع("المجموع: " + مجموع);
}`
  },
  {
    name: 'مصفوفة بسيطة',
    code: `دالة رئيسية() {
    متغير أرقام = [١, ٢, ٣, ٤, ٥];
    لكل رقم في أرقام {
        اطبع("الرقم: " + رقم);
    }
}`
  },
  {
    name: 'دالة مخصصة',
    code: `دالة جمع(أ, ب) {
    إرجاع أ + ب;
}

دالة رئيسية() {
    متغير نتيجة = جمع(١٠, ٢٠);
    اطبع("النتيجة: " + نتيجة);
}`
  }
]

const runCode = async () => {
  if (!code.value.trim()) {
    output.value = 'يرجى كتابة كود للتشغيل'
    return
  }
  
  isRunning.value = true
  output.value = ''
  
  try {
    // Simulate code execution with a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple Baa code interpreter simulation
    const result = interpretBaaCode(code.value)
    output.value = result
  } catch (error) {
    output.value = `خطأ: ${error.message}`
  } finally {
    isRunning.value = false
  }
}

const interpretBaaCode = (code) => {
  // Simple Baa code interpretation
  let output = ''
  
  // Handle print statements
  const printMatches = code.match(/اطبع\s*\(\s*"([^"]*)"\s*\)/g)
  if (printMatches) {
    printMatches.forEach(match => {
      const text = match.match(/اطبع\s*\(\s*"([^"]*)"\s*\)/)[1]
      output += text + '\n'
    })
  }
  
  // Handle variable assignments and concatenation
  const varMatches = code.match(/متغير\s+(\w+)\s*=\s*"([^"]*)"/g)
  if (varMatches) {
    varMatches.forEach(match => {
      const [, varName, varValue] = match.match(/متغير\s+(\w+)\s*=\s*"([^"]*)"/)
      // Store variable for later use
    })
  }
  
  // Handle print with variables
  const printVarMatches = code.match(/اطبع\s*\(\s*"([^"]*)"\s*\+\s*(\w+)\s*\)/g)
  if (printVarMatches) {
    printVarMatches.forEach(match => {
      const [, text, varName] = match.match(/اطبع\s*\(\s*"([^"]*)"\s*\+\s*(\w+)\s*\)/)
      output += text + '[قيمة المتغير]' + '\n'
    })
  }
  
  return output || 'تم تشغيل الكود بنجاح!'
}

const resetCode = () => {
  code.value = `دالة رئيسية() {
    اطبع("مرحباً بالعالم!");
    
    متغير اسم = "محمد";
    اطبع("أهلاً وسهلاً " + اسم);
}`
  output.value = ''
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code.value)
    // Show success message
    const originalText = output.value
    output.value = 'تم نسخ الكود إلى الحافظة!'
    setTimeout(() => {
      output.value = originalText
    }, 2000)
  } catch (error) {
    output.value = 'فشل في نسخ الكود'
  }
}

const clearOutput = () => {
  output.value = ''
}

const loadExample = (example) => {
  code.value = example.code
  output.value = ''
}

const handleCodeChange = () => {
  // Auto-save to localStorage
  localStorage.setItem('baa-playground-code', code.value)
}

onMounted(() => {
  // Load saved code from localStorage
  const savedCode = localStorage.getItem('baa-playground-code')
  if (savedCode) {
    code.value = savedCode
  }
})
</script>

<style scoped>
.baa-playground {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.playground-header {
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.playground-header h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 600;
}

.playground-controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.run-button,
.reset-button,
.copy-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.run-button {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.run-button:hover:not(:disabled) {
  background: var(--vp-c-brand-light);
  transform: translateY(-1px);
}

.run-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-button:hover,
.copy-button:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-light);
}

.playground-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 400px;
}

.code-editor,
.output-panel {
  display: flex;
  flex-direction: column;
}

.editor-header,
.output-header {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
  font-weight: 500;
  color: var(--vp-c-text-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-button {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.code-textarea {
  flex: 1;
  padding: 1rem;
  border: none;
  outline: none;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  resize: none;
}

.code-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.output-content {
  flex: 1;
  padding: 1rem;
  background: var(--vp-c-bg-alt);
  overflow-y: auto;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--vp-c-divider);
  border-top: 2px solid var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.output-text {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
}

.output-placeholder {
  color: var(--vp-c-text-3);
  font-style: italic;
  text-align: center;
  padding: 2rem;
}

.playground-examples {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-top: 1px solid var(--vp-c-divider-light);
}

.playground-examples h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-weight: 600;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
}

.example-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.example-button:hover {
  background: var(--vp-c-brand-dimm);
  border-color: var(--vp-c-brand-light);
  color: var(--vp-c-brand);
}

/* RTL Support */
[dir="rtl"] .playground-header {
  flex-direction: row-reverse;
}

[dir="rtl"] .playground-controls {
  flex-direction: row-reverse;
}

[dir="rtl"] .editor-header,
[dir="rtl"] .output-header {
  flex-direction: row-reverse;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .playground-content {
    grid-template-columns: 1fr;
  }
  
  .playground-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .playground-controls {
    justify-content: center;
  }
  
  .examples-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}
</style>