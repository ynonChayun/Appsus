import emailList from '../cmps/email-list.cmp.js'
import emailSide from '../cmps/email-side.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import emailRight from '../cmps/email-right.cmp.js'
import previewDetails from '../cmps/preview-details.cmp.js'

import { eventBus } from "../services/eventBus-service.js"
import { emailService } from "../services/email.servics.js"
import { emailFilter } from "../services/emailFilter.service.js"

export default {
    template: `
    <section class="email-app">
    <email-side @setStatus="setStatus" class="email-side" />

    <div class="email-list">
    <email-list :emails="emails" v-if="!selectedEmail"/>
    <preview-details :email='selectedEmail' v-else />
    </div>

    <email-right />
    <email-compose />
    </section>
`,
    data() {
        return {
            emails: null,
            selectedEmail: null
        };
    },
    methods: {
        setNewEmails(levelFilter) {
            emailService.getEmailsToDisplay().then(emails => {
                this.emails = emails
            })
        },
        setStatus(status) {
            emailFilter.setStatus(status)
            emailFilter.setLevelFilter('light')
            eventBus.emit('clearMultiFilter')
            this.setNewEmails()
        },
        setMultiFilter(multiFilter) {
            multiFilter.then(filter => {
                let thereIs = false
                for (var key in filter) {
                    if (filter[key]) {
                        thereIs = true
                        break
                    }
                }
                if (!thereIs)return 

                emailFilter.setMultiFilter(multiFilter).then(
                    res => {
                        emailFilter.setLevelFilter('multi')
                        this.setNewEmails()
                }
                    )
            })
        },
        toggleMode(action) {
           
            emailService.toggleMode(action).then(emails => {
                this.emails = emails
                if(!action.mode === 'star')  this.backToList()
            })
        },
        addedNewEmail(emails) {
            this.emails = emails
        },
        searchEmail(txt) {
            emailFilter.setTxt(txt)
            emailFilter.setLevelFilter('light')
            eventBus.emit('clearMultiFilter')
            this.setNewEmails()
        },
        selectEmail(email) {
            this.selectedEmail = email
        },
        backToList() {
            this.selectedEmail = null
        },
    },
    components: {
        emailSide,
        emailList,
        emailCompose,
        emailRight,
        previewDetails
    },
    created() {
        this.setNewEmails()
        eventBus.on('toggleMode', this.toggleMode)
        eventBus.on('addedNewEmail', this.addedNewEmail)
        eventBus.on('searchEmail', this.searchEmail)
        eventBus.on('backToList', this.backToList)
        eventBus.on('selectEmail', this.selectEmail)
        eventBus.on('setMultiFilter', this.setMultiFilter)
    },
    unmounted() { },
};