
import emailFilter from '../js/apps/email/cmps/email-filter.cmp.js'
import mainNav from './main-nav.cmp.js'

export default {
    template: `
 <header>
 <div class="logo" ><img src="/imgs/logo.png" class="logo-img">&nbsp;mail</div>
 <email-filter/>
                <div class="menu-icon-container">
                    <img class="menu-icon" @click="isMenuOpen = !isMenuOpen"
                    src="imgs/dots-menu.png" />
                </div>
                <main-nav v-if="isMenuOpen" @clicked="this.isMenuOpen = !this.isMenuOpen"/>
            </header>
`,
    data() {
        return {
            isMenuOpen: false,
        };
    },
    components: {
        emailFilter,
        mainNav,
    },
    methods: {},
    created() { },
    unmounted() { },
};