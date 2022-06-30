import { eventBus } from "../services/eventBus-service.js"

export default {
    template: `
    <section @click="searchEmail" class="email-filter-text" :class="{'email-filter-text-active' : isActive}">
            <svg  class="filter-symbol"  focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path>
        </svg>
        <input type="text" placeholder="Search mail" v-model="filterByTxt" @click="isActive = !isActive">
    
        <svg class="close-symbol" @click="clearInput" focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>

        <svg class="filter-symbol" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>
    
    </section>
`,
    data() {
        return {
            isActive: false,
            filterByTxt: ''
        };
    },
    components: {
    },
    methods: {
        searchEmail() {
            eventBus.emit('searchEmail', this.filterByTxt)
        },
        clearInput(){
            this.filterByTxt = ''
            eventBus.emit('searchEmail', this.filterByTxt)
        }
    },
    created() {
    },
    unmounted() {
    },
    computed: {

    }
};