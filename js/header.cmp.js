import emailFilter from '../js/apps/email/cmps/email-filter.cmp.js'
import mainNav from './main-nav.cmp.js'
import { eventBus } from "./services/eventBus-service.js"
export default {
    template: `
        <header>
                <div class="logo-and-filter">
                    <div class="logo"><img src="/imgs/logo.png" class="logo-img">&nbsp;<span>{{currPageTxt}}</span></div>
                     <email-filter v-if='isEmailPage'/>
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
            isMenuOpen: false,
            currPageTxt: 'home'
        };
    },
    components: {
        emailFilter,
        mainNav,
    },
    methods: {
        setCurrPage(txt) {
            this.currPageTxt = txt
            if (txt === "mail") {
                this.isEmailPage = true
            } else {
                this.isEmailPage = false
            }
        }
    },
    created() {
        eventBus.on('currPage', this.setCurrPage)
    },
    unmounted() {},
};