import  {router}  from './router.js'

const options = {
    template: `
    <router-view />
`,
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};

const app = Vue.createApp(options);
app.use(router)
app.mount("#app");
