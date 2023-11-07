// https://unocss.dev/ 原子 css 库
import '@unocss/reset/tailwind-compat.css' // unocss reset
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

// 你自定义的 css
import './styles/main.css'

import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)
app.use(MotionPlugin)

app.mount('#app')
