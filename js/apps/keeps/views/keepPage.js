import keepCreate from './cmps/keep-create.cmp.js'
import keepList from './cmps/keep-list.cmp.js'
import { noteService } from './service/note-service.js'

export default {
    template: `
    <section class="note-app">
        <keep-create/>
        <keep-list :notes="notes"/>
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
        noteService.getNotes().then((notes) => {
            this.notes = notes
        })
    },
    methods: {},
    computed: {},
    unmounted() {},
};