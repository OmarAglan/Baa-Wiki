import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import BaaExample from './components/BaaExample.vue'
import InteractiveBaa from './components/InteractiveBaa.vue'
import BaaPlayground from './components/BaaPlayground.vue'
import ProgressIndicator from './components/ProgressIndicator.vue'
import SocialShare from './components/SocialShare.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Register custom components for Baa code examples
    app.component('BaaExample', BaaExample)
    app.component('InteractiveBaa', InteractiveBaa)
    app.component('BaaPlayground', BaaPlayground)
    app.component('ProgressIndicator', ProgressIndicator)
    app.component('SocialShare', SocialShare)
  }
}
