import { eventBus } from "../../../services/eventBus-service.js";
import colorSelect from './note-color-select.cmp.js'


export default {
    props: ['note'],
    template: `
    <section class="keep-menu">
        <div class="note-color-btn-container">
            <button title="Change Note Color" class=" note-menu-btn" ><i class="fas fa-palette"></i></button>
            <color-select class="color-select" @colorPicked="changeColor"/>
        </div>        
        <button title="Delete Note" class="note-menu-btn" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
        <button title="Duplicate Note" class="note-menu-btn" @click="duplicateNote"><i class="fas fa-solid fa-copy"></i></button>
        <button title="Pin Note" class="note-menu-btn" :class="pinnedClass" @click="togglePinned"><i class="fas fa-thumbtack"></i></button>

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
        },
        togglePinned() {
            eventBus.emit('togglePinned', this.note)
        }
    },
    computed: {
        pinnedClass() {
            return (this.note.isPinned) ? 'pinned-note' : ''
        }
    },
    unmounted() {},
};