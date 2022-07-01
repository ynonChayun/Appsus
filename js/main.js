import { router } from './router.js'
import mainHeader from './header.cmp.js'
import { eventBus } from './services/eventBus-service.js';

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
    created() {

    },
    components: {
        mainHeader
    },
    methods: {},
    computed: {},
    unmounted() {},
    watch: {
        '$route.params': {
            handler() {
                eventBus.emit('currPage', this.$route.fullPath.substring(1))
            },
            immediate: true
        }
    }
};

const app = Vue.createApp(options);
app.use(router)
app.mount("#app");