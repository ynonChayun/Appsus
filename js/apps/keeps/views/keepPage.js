import keepCreate from '../cmps/keep-create.cmp.js'
import keepList from '../cmps/keep-list.cmp.js'
import { keepService } from '../service/keep-service.js'
import { eventBus } from "../../../services/eventBus-service.js";



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
            this.notes = notes
        })
        eventBus.on('addTodo', this.updateNote)
        eventBus.on('removeTodo', this.removeTodo)
        eventBus.on('toggleTodoComplete', this.updateNote)
    },
    methods: {
        addNote() {
            keepService.getNotes().then((notes) => {
                console.log('notes: ', notes)
                this.notes = notes
            })
        },
        updateNote(note) {
            keepService.updateNote(note)
        },
        removeTodo({ idx, newNote }) {
            keepService.removeTodo(newNote, idx).then(() => {
                keepService.getNotes().then((notes) => {
                    this.notes = notes
                })
            })

        },
    },
    computed: {},
    unmounted() {},
};