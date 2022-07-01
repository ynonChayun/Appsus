import { eventBus } from "../services/eventBus-service.js"

export default {
    template: `
    <div class="filter-containers ">
    <section @click="searchEmail" class="email-filter-text" :class="{'email-filter-text-active' : isActive}">
            <svg class="filter-symbol"  focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path>
        </svg>
        <input @blur="isActive = false" type="text" placeholder="Search mail" v-model="filterByTxt" @click="isActive = !isActive">
    
        <svg class="close-symbol" @click.stop="clearInput" focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>

        <svg class="filter-symbol" @click.stop="isMultiFilter = !isMultiFilter"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>
    
    </section>
    
    <section v-if="isMultiFilter" class="multi-filter">
        <form action="submit" class="filter-form" @submit.prevent="saveMultiFilter">
            <div class="form-container">
               <div class="input"><label for="from">From</label><input type="text" id="from" v-model='multiFilter.from' ></div>
               <div class="input"><label for="to">To</label><input type="text" id="to" v-model='multiFilter.to'></div>
               <div class="input"><label for="subject">Subject</label><input type="text" id="subject" v-model='multiFilter.subject'></div>
               <div class="input"><label for="has">Has The Words</label><input type="text" id="has" v-model='multiFilter.has'></div>
               <div class="input"><label for="doesnt">Doesn't have</label><input type="text" id="doesnt-have" v-model='multiFilter.doesnt'></div>
                <div class="date">
                    <span>Date within</span>
                    <select v-model='multiFilter.dateSelect'>
                        <option v-for="date in options.date">{{date}}</option>
                    </select>
                    <input type="date" v-model='multiFilter.dateTxt'>
                </div>
                <div class="status"><label >Status</label>
                 <select v-model='multiFilter.status'>
                 <option v-for="status in options.statuses">{{status}}</option>
                 </select></div>
            <button class="search">Search</button>
        </form>
    </section>
    </div>
`,
    data() {
        return {
            isActive: false,
            filterByTxt: '',
            isMultiFilter: false,
            options: {
                date: ['Always','1 Hour', '1 Day', '3 Days', '1 Week', '2 Weeks', '1 Month', '2 Months', '6 Months', '1 year'],
                statuses: ['All', 'Inbox', 'Starred', 'Sent', 'Drafts', 'Trash', 'Archive'],
            },
            multiFilter: {
                from: '',
                to: '',
                subject: '',
                has: '',
                doesnt: '',
                dateSelect: null,
                dateTxt: '',
                status: '',

            }
        };
    },
    components: {
    },
    methods: {
        

        closeMultiFilter() {
            this.isMultiFilter = false
        },
        searchEmail() {
            this.closeMultiFilter()
            eventBus.emit('searchEmail', this.filterByTxt)
        },
        clearInput() {
            this.closeMultiFilter()
            this.filterByTxt = ''
            eventBus.emit('searchEmail', this.filterByTxt)
        },
        saveMultiFilter() {
            this.isMultiFilter = false
            eventBus.emit('setMultiFilter', Promise.resolve(this.multiFilter))
        },
        clearMultiFilter(){
            console.log('bibi');
            this.multiFilter = {
                from: '',
                to: '',
                subject: '',
                has: '',
                doesnt: '',
                dateSelect: null,
                dateTxt: '',
                status: '',

            }
        }
    },
    created() {
        eventBus.on('clearMultiFilter', this.clearMultiFilter)
       
    },
    computed: {
    }
};