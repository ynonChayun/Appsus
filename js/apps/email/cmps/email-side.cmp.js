export default {
    template: `
<section class="email-side">
 
<div class="compose-email">Compose</div>
<button v-for="status in statuses" @click="setStatus(status)">{{status}}</button>
 

 </section>
`,
    data() {
        return {
            statuses:
                ['Inbox', 'Starred', 'Sent', 'Drafts', 'Trash', 'All'],
        };
    },
    components: {
    },
    methods: {
        setStatus(status) {
            this.$emit('setStatus', status)
        }
    },
    created() {
    },
    unmounted() {
    }

}