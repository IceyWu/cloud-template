// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

// 你自定义的 css
import './styles/main.css'
import { MotionPlugin } from '@vueuse/motion'
import i18n from './plugins/i18n'
import routes from './plugins/router'
import pinia from './plugins/pinia'

import App from './App.vue'

const app = createApp(App)
app.use(routes)
app.use(MotionPlugin)
app.use(i18n)
app.use(pinia)

app.mount('#app')
