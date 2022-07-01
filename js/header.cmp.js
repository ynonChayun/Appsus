import emailFilter from '../js/apps/email/cmps/email-filter.cmp.js'
import mainNav from './main-nav.cmp.js'
import { eventBus } from "./services/eventBus-service.js"
export default {
    template: `
        <header>
                <div class="logo-and-filter">
                    <div class="logo" ><img src="/imgs/logo.png" class="logo-img">&nbsp;mail</div>
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
            isEmailPage:false,
            isMenuOpen: false,
        };
    },
    components: {
        emailFilter,
        mainNav,
    },
    methods: {
        showFilter(){
            console.log('yes');
            this.isEmailPage = true
            console.log(this.isEmailPage);
        },
        offFilter(){
            console.log(this.isEmailPage);
            this.isEmailPage = false
        },
    },
    created() {
        eventBus.on('showFilter',this.showFilter)
        eventBus.on('offFilter',this.offFilter)
    },
    unmounted() {},
};