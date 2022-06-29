import noteCreate from './cmps/note-create.cmp.js'
import noteList from './cmps/note-list.cmp.js'
import { noteService } from './service/note-service.js'

export default {
    template: `
    <section class="note-app">
        hi
        <note-create></note-create>
        <note-list :notes="notes"/>
    </section>
`,
    data() {
        return {
            notes: null,
        };
    },
    components: {
        noteList,
        noteCreate,
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