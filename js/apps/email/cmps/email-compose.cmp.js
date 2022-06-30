import { eventBus } from "../services/eventBus-service.js"
import { emailService } from "../services/email.servics.js"

export default {
    template: `
 <form class="email-compose-container" @submit.prevent="addNewEmail" v-if='this.shouldShow'>
    <header>New Message <div class="close-compose" @click="shouldShow = false" @click="setNewEmptyEmail">x</div></header>
    <div class="content">
    <input type="text" placeholder="Recipients" v-model="newEmail.to">
    <input type="text" placeholder="Subject" v-model="newEmail.subject">
    <input type="text" v-model="newEmail.body" class="body-input">
    <button class="send" >Send</button>
    </div>
    </form>
`,
    data() {
        return {
            shouldShow: false,
            newEmail: {},
            myInterval: null
        };
    },
    components: {
    },
    methods: {
        addNewEmail() {
            if (!this.newEmail.to) {
                alert('Error Please specify at least one recipient')
                return
            }
            if (!this.newEmail.subject && !this.newEmail.body
                && !confirm('Send this message without a subject or text in the body?')) return

            if (this.checkDestination) {
                this.newEmail.status = 'Sent'
                emailService.addComposeEmail(Promise.resolve(this.newEmail) ).then(res =>
                    eventBus.emit('addedNewEmail', res))
                this.setNewEmptyEmail()
                console.log(this.newEmail);
                this.shouldShow = false
            }
            else alert('The address ' + this.newEmail.to + ' in the "To" field was not recognized')
        },
        openComposeEmail() {
            this.shouldShow = true
        },
        isDraft() {
            if (!this.checkDestination()) return
            emailService.addComposeEmail(Promise.resolve(this.newEmail) )
            .then(res=> {
                console.log(res);
                 eventBus.emit('addedNewEmail',res )})
        },
        setNewEmptyEmail() {
            emailService.getEmptyEmail().then(res => this.newEmail = res)
        },
        checkDestination() {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return (!this.newEmail.to || !this.newEmail.to.match(regexEmail)) ? false : true
        }
    },
    created() {
        eventBus.on('openComposeEmail', this.openComposeEmail)
        this.setNewEmptyEmail()
    },
    watch: {
        newEmail: {
            handler() {
                this.isDraft()
            },
            deep: true
        },

    },
    unmounted() {
    },
};