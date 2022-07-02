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
                console.log('this.$route.fullPath: ', this.$route.fullPath)
                if (this.$route.fullPath === '/mail') {
                    eventBus.emit('currPage', 'mail')
                } else if (this.$route.fullPath === '/keep') {
                    eventBus.emit('currPage', 'keep')
                } else if (this.$route.fullPath === '/') {
                    eventBus.emit('currPage', 'home')
                } else {
                    eventBus.emit('currPage', 'book')
                }

                //    if(this.$route.fullPath === '/mail'){eventBus.emit('showFilter')
                //    console.log('wow');
                // }
                //    else eventBus.emit('offFilter')
            },
            immediate: true
        }
    }
};

const app = Vue.createApp(options);
app.use(router)
app.mount("#app");