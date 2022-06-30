import emailPreview from './email-preview.cmp.js'

export default {
    props:['emails'],
    template: `
        <ul v-if="emails">
            <li v-for="email in emails">
                <email-preview :email="email"/>
            </li>
        </ul>
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