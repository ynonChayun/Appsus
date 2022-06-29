import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'

import { eventBus } from "../services/eventBus-service.js"
import { emailService } from "../services/email.servics.js"
import { emailFilter } from "../services/emailFilter.service.js"

export default {
    template: `
    <section class="email-app">
    <email-side @setStatus="setStatus" />
    <email-list :emails="emails"/>
    <email-compose />
    </section>
`,
    data() {
        return {
            emails: null,
        };
    },
    methods: {
        setNewEmails() {
            emailService.getEmailsToDisplay().then(emails => { this.emails = emails })
        },
        setStatus(status) {
            emailFilter.setStatus(status)
            this.setNewEmails()
        },
        setEmailAs(action) {
            emailService.setEmailAs(action)
            this.setNewEmails()
        },
        addNewEmail(emailContent) {
            emailService.addComposeEmail(emailContent)
        },
    },
    components: {
        emailSide,
        emailList,
        emailCompose
    },
    created() {
        this.setNewEmails()
        eventBus.on('setEmailAs', this.setEmailAs)
        eventBus.on('addNewEmail', this.addNewEmail)

    },
    unmounted() { },
};