import emailPreview from './email-preview.cmp.js'

export default {
    props:['emails'],
    template: `
 <section class="email-list">
        <ul v-if="emails">
            <li v-for="email in emails">
                <email-preview :email="email"/>
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