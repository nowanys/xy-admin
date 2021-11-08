import {createApp} from 'vue'
import {setupRouter} from '@/router'
import {setupStore} from '@/store'

import App from '@/App.vue'
import antd from 'ant-design-vue'
import {XLoading} from '@/plugins/XLoading'
import '@/core/permission'

import 'ant-design-vue/dist/antd.less'
import '@/assets/styles/index.scss'

if ('true' === process.env.VUE_APP_MOCK_ENABLE) require('@/mock')

const bootstrap = () => {
    const app = createApp(App)
    app.use(antd)
    app.use(XLoading)
    setupStore(app)
    setupRouter(app)
    app.mount('#app')
}

bootstrap()
