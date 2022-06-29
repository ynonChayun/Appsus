import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side.cmp.js'

import { emailService } from "../services/email.servics.js"

export default {
    template: `
    <section class="email-app">
    <email-side />
    <email-list />
    </section>
`,
    data() {
        return {};
    },
    methods: {},
    components: {
        emailSide,
        emailList,
    },
    created() {
        emailService._createEmails()
     },
    unmounted() { },
};