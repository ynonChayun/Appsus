import { eventBus } from "../services/eventBus-service.js"

export default {
    template: `
<section class="email-side">
 <div class="compose-container" @click="openComposeEmail">

<div class="compose-email"><div class="compose-img"></div> Compose</div>
</div>
<button class="list-status" v-for="status in statuses" @click="setStatus(status)"><div :class='status'></div>{{status}}</button>

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
        },
        openComposeEmail(){
            eventBus.emit('openComposeEmail');
        }
    },
    created() {
    },
    unmounted() {
    }

}