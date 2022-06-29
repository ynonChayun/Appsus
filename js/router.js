import homePage from './home-page.cmp.js'
import keepPage from './apps/keeps/views/keepPage.js'
import mailPage from './apps/email/views/mailPage.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/keep',
        component: keepPage
    },
    {
        path: '/mail',
        component: mailPage
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})
