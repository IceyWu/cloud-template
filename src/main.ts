import { MotionPlugin } from '@vueuse/motion' // unocss reset
import App from './App.vue'
import i18n from './plugins/i18n'

import pinia from './plugins/pinia'
import routes from './plugins/router'
// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

// 你自定义的 css
import './styles/main.css'

// shadcn-vue
import './assets/index.css'

const app = createApp(App)
app.use(routes)
app.use(MotionPlugin)
app.use(i18n)
app.use(pinia)

app.mount('#app')
