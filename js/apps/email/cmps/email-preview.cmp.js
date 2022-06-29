
import { eventBus } from "../services/eventBus-service.js"

export default {
    props: ['email'],
    template: `
    <div class="email-preview">

    <div class="start-preview ">
       <div :class="{'star-active' : email.isStared , 'star-preview' : !email.isStared }" 
       class="symbol" @click="toggleMode('star',email.id)"
       ></div>
    </div>

        <div class="preview-from">{{email.from}}</div>
        <div class="preview-text">
        <div class="subject">{{email.subject}}-&nbsp;&nbsp;</div>
        <div class="body">{{email.body}}</div>
        </div>
        <div class="time-preview">{{getFormatedTime}}</div>
        <div class="end-preview">
            <div class="archive-email symbol"></div>
            <div class="Trash trash-email symbol" @click="toggleMode('Trash',email.id)"></div>
            <div class="mark-read symbol"></div>
        </div>
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
        toggleMode(mode, id) {
            eventBus.emit('toggleMode', { mode, id });
        },

    }, computed: {
        getFormatedTime() {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            const emailTime = new Date(this.email.sentAt);

            const month = months[emailTime.getMonth()];
            const date = emailTime.getDate();
            const hour = emailTime.getHours();
            const min = emailTime.getMinutes();

            const currTime = new Date(Date.now());
            const currMount = months[currTime.getMonth()];
            const currDate = currTime.getDate();

            if (currMount === month && currDate === date) return hour + ':' + min
            else return date + ' ' + month
        }
    },
    created() {
    },
    unmounted() {
    },
};