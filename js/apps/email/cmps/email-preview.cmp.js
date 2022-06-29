
import { eventBus } from "../services/eventBus-service.js"

export default {
    props: ['email'],
    template: `
    <div class="email-preview">
    <p>{{email.subject}} 
        <span v-for="mode in modes" @click="setEmailAs(mode ,email.id)">{{mode}}</span>
        </p>
    </div>
`,
    data() {
        return {
            modes: ['Trash', 'Starred']
        };
    },
    components: {
    },
    methods: {
        setEmailAs(mode, id) {
            eventBus.emit('setEmailAs', { mode, id });
        },

    },
    created() {
    },
    unmounted() {
    },
};