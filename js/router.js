import homePage from './home-page.cmp.js'
import keepPage from './apps/keeps/views/keepPage.js'
import mailPage from './apps/email/views/email-app.cmp.js'
import bookPage from './apps/book/views/bookPage.js'
import bookDetails from './apps/book/views/book-details.js'


const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/keep',
        component: keepPage
    },
    {
        path: '/mail',
        component: mailPage,
    },
    {
        path: '/book',
        component: bookPage
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})