
import emailFilter from '../js/apps/email/cmps/email-filter.cmp.js'
export default {
    template: `
 <header>
 <div class="logo" ><img src="/imgs/logo.png" class="logo-img">&nbsp;mail</div>
 <email-filter/>
 </header>
`,
    data() {
        return {};
    },
    components: {
        emailFilter
    },
    methods: {
    },
    created() {
    },
    unmounted() {
    },
};