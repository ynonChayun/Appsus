import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import emailRight from '../cmps/email-right.cmp.js'

import { eventBus } from "../services/eventBus-service.js"
import { emailService } from "../services/email.servics.js"
import { emailFilter } from "../services/emailFilter.service.js"

export default {
    template: `
    <section class="email-app">
    <email-side @setStatus="setStatus" />
    <div class="email-list-container">
    <email-list :emails="emails"/>
    </div>
    <email-right />
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
            emailService.getEmailsToDisplay().then(emails => {
                this.emails = emails
            })
        },
        setStatus(status) {
            emailFilter.setStatus(status)
            this.setNewEmails()
        },
        toggleMode(action) {
            emailService.toggleMode(action).then(emails => this.emails = emails)
        },
        addNewEmail(emailContent) {
            emailService.addComposeEmail(emailContent)
        },
        searchEmail(txt) {
            emailFilter.setTxt(txt)
            this.setNewEmails()
        }
    },
    components: {
        emailSide,
        emailList,
        emailCompose,
        emailRight
    },
    created() {
        this.setNewEmails()
        eventBus.on('toggleMode', this.toggleMode)
        eventBus.on('addNewEmail', this.addNewEmail)
        eventBus.on('searchEmail', this.searchEmail)

    },
    unmounted() { },
};