import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import BaaExample from './components/BaaExample.vue'
import InteractiveBaa from './components/InteractiveBaa.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Register custom components for Baa code examples
    app.component('BaaExample', BaaExample)
    app.component('InteractiveBaa', InteractiveBaa)
  }
}
