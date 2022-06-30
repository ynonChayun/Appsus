import { eventBus } from "../../../services/eventBus-service.js";
import colorSelect from './note-color-select.cmp.js'


export default {
    props: ['note'],
    template: `
    <section class="keep-menu">
        <div class="note-color-btn-container">
            <button class=" note-menu-btn" ><i class="fas fa-palette"></i></button>
            <color-select class="color-select" @colorPicked="changeColor"/>
        </div>        
        <button class="note-menu-btn" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
        <button class="note-menu-btn" @click="duplicateNote"><i class="fas fa-solid fa-copy"></i></button>
    </section>

`,
    data() {
        return {};
    },
    components: {
        colorSelect
    },
    created() {},
    methods: {
        removeNote() {
            eventBus.emit('removeNote', this.note.id)
        },
        duplicateNote() {
            const newNote = this.createNoteCopy()
            eventBus.emit('duplicateNote', this.note)
        },
        createNoteCopy() {
            return JSON.parse(JSON.stringify(this.note))
        },
        changeColor(colorId) {
            let NoteAndColor = {
                note: this.note,
                color: colorId
            }
            eventBus.emit('changeNoteColor', NoteAndColor)

        }
    },
    computed: {},
    unmounted() {},
};