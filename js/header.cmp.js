import emailFilter from '../js/apps/email/cmps/email-filter.cmp.js'
import mainNav from './main-nav.cmp.js'
import { eventBus } from "./services/eventBus-service.js"
import bookFilter from "../js/apps/book/cmps/book-filter.cmp.js"

export default {
    template: `
        <header>
                <div class="logo-and-filter">
                    <div class="logo"><img src="/imgs/logo.png" class="logo-img">&nbsp;<span>{{currPageTxt}}</span></div>
                     <email-filter v-if='isEmailPage'/>
                     <book-filter v-if='isBookPage'/>
                </div>
            
                <div class="menu-icon-container">
                    <img class="menu-icon" @click="isMenuOpen = !isMenuOpen"
                    src="imgs/dots-menu.png" />
                </div>
                <main-nav v-if="isMenuOpen" @clicked="this.isMenuOpen = !this.isMenuOpen"/>
         </header>
`,
    data() {
        return {
            isEmailPage: false,
            isBookPage : true,
            isMenuOpen: false,
            currPageTxt: 'home'
        };
    },
    components: {
        emailFilter,
        mainNav,
        bookFilter
    },
    methods: {
        setCurrPage(txt) {
            this.currPageTxt = txt

            this.isEmailPage = txt === "mail" ? true : false
            this.isBookPage = txt === "book" ? true : false
        }
    },
    created() {
        eventBus.on('currPage', this.setCurrPage)
    },
    unmounted() {},
};