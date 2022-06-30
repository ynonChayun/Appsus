export default {
    template: `
    <section>
        <!-- <router-link to="/keep">go to keep</router-link>
        <router-link to="/mail">go to mail</router-link> -->
        <div class="my-body">
        <section class="main-grid">
        <article class="venue">
            <h3>A bit about our email pro, Ynon Chayun.</h3>
            <p>A very skilled email sender</p>
        </article>
        <article class="venue">
            <h3>Come visit our book shop</h3>
            <router-link to="/" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/book-stack.png">
            </router-link>
            <p>You will find some really interesting books.</p>
        </article>
        <article class="venue">
            <h3>Did you see our EMAIL app?</h3>
            <router-link to="/mail" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/gmail.png">
            </router-link>
            <p>We think you have some unread emails from your boss..</p>
        </article>
        <article class="venue">
            <h3>Didn't you forget something?</h3>
            <router-link to="/keep" @click.native="$emit('clicked')" class="nav-link ">
                    <img src="imgs/keeps.png" >
            </router-link>
            <p>Go write it before you forget it.</p>
        </article>

        <article class="venue">
            <h3>A bit about our notes master, Yuval Vaknin Levi</h3>
            <p>Lorem ipsum dolor sit amet amet consectetur adipisicing.</p>
        </article>
        <article class="venue">
            <h3>Metropolitan Opera</h3>
            <p>Lorem ipsum sit amet consectetur adipisicing.</p>
            <p class="date">November 3 &middot; 8:30pm</p>
        </article>
        <article class="venue">
            <h3>Broadway Dance Center</h3>
            <p>Lorem ipsum dolor consectetur adipisicing.</p>
            <p class="date">November 5 &middot; 8pm</p>
        </article>
        <article class="venue">
            <h3>The Frye Company</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <p class="date">November 6 &middot; 7pm</p>
        </article>
    </section>
        </div>
        </section>
`,
    data() {
        return {};
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
};