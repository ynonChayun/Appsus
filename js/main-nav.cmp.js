export default {
    template: `
            <nav class="main-nav">
                <router-link to="/book" @click.native="$emit('clicked')" class="nav-link ">
                    
                <img src="imgs/book-stack.png">
                </router-link>
                <router-link to="/mail" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/gmail.png">
                
                </router-link>
                <router-link to="/" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/house.png">

                </router-link>
                <router-link to="/keep" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/keeps.png" >

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