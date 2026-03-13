// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ✅ 引入 Element Plus
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(router)
app.use(ElementPlus) // 👈 注册
app.mount('#app')