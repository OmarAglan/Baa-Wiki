<template>
  <div class="progress-indicator" :class="{ 'is-visible': isVisible }">
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
    
    <div class="progress-info">
      <span class="progress-text">{{ Math.round(progress) }}%</span>
      <div class="progress-controls">
        <button 
          @click="scrollToTop" 
          class="control-button"
          title="العودة للأعلى"
        >
          ↑
        </button>
        <button 
          @click="toggleTableOfContents" 
          class="control-button"
          title="جدول المحتويات"
        >
          ☰
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const isVisible = ref(false)

const updateProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const newProgress = (scrollTop / scrollHeight) * 100
  
  progress.value = Math.min(100, Math.max(0, newProgress))
  isVisible.value = scrollTop > 100
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const toggleTableOfContents = () => {
  // Toggle sidebar visibility
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar) {
    const isOpen = sidebar.classList.contains('open')
    if (isOpen) {
      sidebar.classList.remove('open')
    } else {
      sidebar.classList.add('open')
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.progress-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--vp-c-divider-light);
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.dark .progress-indicator {
  background: rgba(26, 26, 26, 0.95);
}

.progress-indicator.is-visible {
  transform: translateY(0);
}

.progress-bar {
  height: 3px;
  background: var(--vp-c-divider-light);
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  transition: width 0.1s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.progress-text {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.progress-controls {
  display: flex;
  gap: 0.5rem;
}

.control-button {
  width: 32px;
  height: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.control-button:hover {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand-light);
  transform: translateY(-1px);
}

/* RTL Support */
[dir="rtl"] .progress-info {
  flex-direction: row-reverse;
}

[dir="rtl"] .progress-controls {
  flex-direction: row-reverse;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .progress-info {
    padding: 0.5rem;
  }
  
  .progress-text {
    font-size: 0.75rem;
  }
  
  .control-button {
    width: 28px;
    height: 28px;
    font-size: 0.875rem;
  }
}
</style>