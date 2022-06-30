import { router } from './router.js'
import mainHeader from './header.cmp.js'

const options = {
    template: `
    <section class="main-page">
    <main-header />
    <router-view class="main-cmp" />
    </section>
`,
    data() {
        return {};
    },
    created() {},
    components: {
        mainHeader
    },
    methods: {},
    computed: {},
    unmounted() {},
};

const app = Vue.createApp(options);
app.use(router)
app.mount("#app");