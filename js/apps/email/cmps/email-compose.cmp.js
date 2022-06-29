import { eventBus } from "../services/eventBus-service.js"

export default {
    template: `
 <form class="email-compose-container" @submit.prevent="addNewEmail" v-if='this.shouldShow'>
    <header>New Message <div class="close-compose" @click="shouldShow = false">x</div></header>
    <div class="content">
    <input type="text" placeholder="Recipients" v-model="to">
    <input type="text" placeholder="Subject" v-model="subject">
    <input type="text" v-model="body" class="body-input">
    <button class="send">Send</button>
    </div>
    </form>
`,
    data() {
        return {
            to: null,
            subject: null,
            body: null,
            shouldShow : false
        };
    },
    components: {
    },
    methods: {
        addNewEmail() {
            if (!this.to) {
                alert('Error Please specify at least one recipient')
                return
            }
            if (!this.subject && !this.body
                && !confirm('Send this message without a subject or text in the body?')) return

            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (this.to.match(regexEmail)) {
                eventBus.emit('addNewEmail', { to: this.to, subject: this.subject, body: this.body });
                this.shouldShow = false
            }
            else alert('The address ' + this.to + ' in the "To" field was not recognized')
        },
        openComposeEmail(){
            this.shouldShow = true
            
        }
    },
    created() {
        eventBus.on('openComposeEmail', this.openComposeEmail)
    },
    unmounted() {
    },
};