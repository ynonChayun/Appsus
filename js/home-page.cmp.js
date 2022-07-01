export default {
    template: `
    <section>
        <div class="my-body">
        <section class="main-grid">
        <article class="venue">
            <h3>A bit about our email pro, Ynon Chayun.</h3>
            <p>A very skilled email sender</p>
            <img class="home-page-img" src="imgs/postman.png">
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
            <p>The best notes writer in the middle east</p>
            <img class="home-page-img" src="imgs/writer.png">
        </article>
        <article class="venue">
            <h3>Go share this fantastic website with your friends.</h3>
            <img @click="copyLink" style="cursor: pointer" class="home-page-img" src="imgs/link.png">
        </article>
        <article class="venue">
            <h3>You made it all the way down here, right?</h3>
            <p>I assume you really enjoy the design of our home page.</p>
        </article>
        <article class="venue">
            <h3>Fun facts:</h3>
            <p>Almost 2.7 million emails are sent per second</p>
            <p>There are around 130 million published books.</p>
            <p>Notetaking is directly related to academic achievement</p>
        </article>
    </section>
        </div>
        </section>
`,
    data() {
        return {};
    },
    created() {},
    methods: {
        copyLink() {
            const url = window.location.href
            navigator.clipboard.writeText(url)
        },
    },
    computed: {},
    unmounted() {},
};