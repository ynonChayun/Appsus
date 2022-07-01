import { eventBus } from "../services/eventBus-service.js"

export default {
    template: `
<section>
 <div class="compose-container" @click="openComposeEmail">

<div class="compose-email"><div class="compose-img"></div> Compose</div>
</div>

<button @click="setStatus('Inbox')" :class="isActive('Inbox')" class="bold"><div :class= "logoStyle('Inbox')" ></div>Inbox <span class="count">34</span></button>
<button @click="setStatus('Starred')" :class="isActive('Starred')"><div :class= "logoStyle('Starred')" ></div>Starred</button>
<button @click="setStatus('Sent')" :class="isActive('Sent')"><div :class= "logoStyle('Sent')" ></div>Sent</button>
<button @click="setStatus('Drafts')" :class="isActive('Drafts')" class="bold"><div :class= "logoStyle('Drafts')" ></div>Drafts<span class="count">23</span></button>
<button @click="setStatus('Trash')" :class="isActive('Trash')"><div :class= "logoStyle('Trash')" ></div>Trash</button>
<button @click="setStatus('All')" :class="isActive('All')"><div :class= "logoStyle('All')" ></div>All</button>
 </section>
`,
    data() {
        return {
            statuses:
                ['Inbox', 'Starred', 'Sent', 'Drafts', 'Trash', 'All'],
            active: ''
        };
    },
    components: {
    },
    methods: {
        setStatus(status) {
            this.active = status
            this.$emit('setStatus', status)
        },
        openComposeEmail() {
            eventBus.emit('openComposeEmail');
        },
        isActive(state) {

            if (state === 'Inbox' && state === this.active) return 'Inbox-active'
            if (state === this.active) return 'btn-active'
        },
        logoStyle(status) {
            if (status === 'Inbox' && status === this.active) return 'index-logo'
            return status
        },
        withNums(state) {
            if (state === 'Drafts' || state === 'Inbox') {
                console.log(state);
                return true
            }
        },
        isBold(state){
            if(state === 'Drafts' || state === 'Inbox')return 'bold-btn'
        }
    },
    created() {
    },
    unmounted() {
    },
    computed: {
    }

}