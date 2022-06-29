import emailPreview from './email-preview.cmp.js'

export default {
    template: `
 <section class="email-list">
        <ul>
            <li v-for="num in 10">
                <email-preview/>
            </li>
        </ul>
    </section>
`,
    data() {
        return {};
    },
    components: {
        emailPreview
    },
    methods: {
    },
    created() {
    },
    unmounted() {
    },
};