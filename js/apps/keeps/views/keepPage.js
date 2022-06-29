import keepCreate from '../cmps/keep-create.cmp.js'
import keepList from '../cmps/keep-list.cmp.js'
import { keepService } from '../service/keep-service.js'


export default {
    template: `
    <section class="keep-app">
        <keep-create class="container" @noteAdded="addNote"/>
        <keep-list class="container" :notes="notes"/>
    </section>
`,
    data() {
        return {
            notes: null,
        };
    },
    components: {
        keepCreate,
        keepList,
    },
    created() {
        keepService.getNotes().then((notes) => {
            console.log('notes: ', notes)
            this.notes = notes
        })
    },
    methods: {
        addNote() {
            keepService.getNotes().then((notes) => {
                console.log('notes: ', notes)
                this.notes = notes
            })
        }
    },
    computed: {},
    unmounted() {},
};