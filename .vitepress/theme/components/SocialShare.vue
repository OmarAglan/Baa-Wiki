<template>
  <div class="social-share">
    <div class="share-header">
      <h4>📤 شارك هذه الصفحة</h4>
    </div>
    
    <div class="share-buttons">
      <button 
        @click="shareOnTwitter"
        class="share-button twitter"
        title="شارك على تويتر"
      >
        <span class="icon">🐦</span>
        <span class="label">تويتر</span>
      </button>
      
      <button 
        @click="shareOnFacebook"
        class="share-button facebook"
        title="شارك على فيسبوك"
      >
        <span class="icon">📘</span>
        <span class="label">فيسبوك</span>
      </button>
      
      <button 
        @click="shareOnLinkedIn"
        class="share-button linkedin"
        title="شارك على لينكد إن"
      >
        <span class="icon">💼</span>
        <span class="label">لينكد إن</span>
      </button>
      
      <button 
        @click="shareOnWhatsApp"
        class="share-button whatsapp"
        title="شارك على واتساب"
      >
        <span class="icon">💬</span>
        <span class="label">واتساب</span>
      </button>
      
      <button 
        @click="copyLink"
        class="share-button copy"
        title="نسخ الرابط"
      >
        <span class="icon">🔗</span>
        <span class="label">نسخ الرابط</span>
      </button>
    </div>
    
    <div v-if="showCopiedMessage" class="copied-message">
      تم نسخ الرابط إلى الحافظة! ✅
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const showCopiedMessage = ref(false)

const currentUrl = computed(() => {
  return typeof window !== 'undefined' ? window.location.href : ''
})

const currentTitle = computed(() => {
  return typeof document !== 'undefined' ? document.title : 'لغة باء - Baa Programming Language'
})

const shareText = computed(() => {
  return `تعرف على لغة باء - لغة برمجة عربية حديثة! ${currentTitle.value}`
})

const shareOnTwitter = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(currentUrl.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareOnFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareOnLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

const shareOnWhatsApp = () => {
  const url = `https://wa.me/?text=${encodeURIComponent(shareText.value + ' ' + currentUrl.value)}`
  window.open(url, '_blank')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    showCopiedMessage.value = true
    setTimeout(() => {
      showCopiedMessage.value = false
    }, 3000)
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = currentUrl.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    showCopiedMessage.value = true
    setTimeout(() => {
      showCopiedMessage.value = false
    }, 3000)
  }
}
</script>

<style scoped>
.social-share {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.share-header h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.share-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.share-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 0.875rem;
}

.share-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.share-button .icon {
  font-size: 1.5rem;
}

.share-button .label {
  font-weight: 500;
}

/* Platform-specific colors */
.share-button.twitter:hover {
  background: #1da1f2;
  color: white;
  border-color: #1da1f2;
}

.share-button.facebook:hover {
  background: #1877f2;
  color: white;
  border-color: #1877f2;
}

.share-button.linkedin:hover {
  background: #0077b5;
  color: white;
  border-color: #0077b5;
}

.share-button.whatsapp:hover {
  background: #25d366;
  color: white;
  border-color: #25d366;
}

.share-button.copy:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.copied-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RTL Support */
[dir="rtl"] .share-button {
  text-align: center;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .share-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .share-button {
    padding: 0.75rem 0.5rem;
  }
  
  .share-button .icon {
    font-size: 1.25rem;
  }
  
  .share-button .label {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .share-buttons {
    grid-template-columns: 1fr;
  }
}
</style>