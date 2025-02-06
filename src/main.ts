import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import i18n from './plugins/i18n'

import pinia from './plugins/pinia'
import routes from './plugins/router'

// 你自定义的 css
import './styles/main.css'

const app = createApp(App)
app.use(routes)
app.use(MotionPlugin)
app.use(i18n)
app.use(pinia)

app.mount('#app')
