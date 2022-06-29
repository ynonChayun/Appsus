import mainNav from './main-nav.cmp.js'
export default {
    template: `
            <header>
                <div class="logo" ><img src="/imgs/logo.png" class="logo-img">&nbsp;mail</div>
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
        mainNav,
    },
    methods: {},
    created() {},
    unmounted() {},
};