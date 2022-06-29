export default {
    template: `
            <nav class="main-nav">
                <router-link to="/mail" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/gmail.png">
                        Email
                </router-link>
                <router-link to="/keep" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/keeps.png" >
                        Keep
                </router-link>
                <router-link to="/" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/book-stack.png">
                        Books
                </router-link>
                <router-link to="/" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/house.png">
                        Home
                </router-link>
            </nav>
`,
    data() {
        return {};
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
};