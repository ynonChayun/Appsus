import { keepService } from '../service/keep-service.js'

export default {
    template: `
    <section>
        <div class="note-add">
            <div class="note-content-inputs"  @keyup.enter="createNote" >
                 <input class="txt-input" placeholder="Title" v-model="titleValue">
                 <input class="txt-input" :placeholder="placeholderTxt" v-model="txtValue">
            </div>
            <div class="note-type-btns">
                    <button class="change-btn" @click="changeType('noteText')">
                        <i class="far fa-comment"></i>
                    </button>
                    <button class="change-btn" @click="changeType('noteImg')">
                        <i class="far fa-image"></i>
                    </button>
                    <button class="change-btn" @click="changeType('noteTodos')">
                        <i class="fas fa-list-ul"></i>
                    </button>    
            </div>
            <button @click="createNote">Add note</button>
        </div>
    </section>
    `,
    data() {
        return {
            note: {
                type: 'noteText',
                noteType: 'txt',
                isPinned: false,
                info: null,
            },
            titleValue: null,
            txtValue: null
        };
    },
    created() {},
    methods: {
        changeType(newType) {
            this.note.type = newType
            this.note.noteType = this.infoType
        },
        createNote() {
            const info = {
                title: '',
                txt: '',
                img: '',
                video: '',
                todos: null
            }
            const newNote = JSON.parse(JSON.stringify(this.note))
            if (this.note.noteType === 'todos') {
                const todosStr = this.txtValue.split(',')
                const todosList = todosStr.map((todo) => {
                    return { 'txt': todo }
                })
                info.title = this.titleValue
                info[this.note.noteType] = todosList
            } else {
                info.title = this.titleValue
                info[this.note.noteType] = this.txtValue
            }
            newNote.info = info
            keepService.createNote(newNote).then(() => {
                this.titleValue = ''
                this.txtValue = ''
                this.$emit('noteAdded')
            })
        }
    },
    computed: {
        placeholderTxt() {
            if (this.note.type === 'noteText') {
                return 'What\'s on your mind...'
            } else if (this.note.type === 'noteImg') {
                return 'Enter image url...'
            } else if (this.note.type === 'noteTodos') {
                return 'Enter list title...'
            }
        },
        infoType() {
            switch (this.note.type) {
                case 'noteText':
                    return 'txt'
                case 'noteImg':
                    return 'img'
                case 'noteVideo':
                    return 'video'
                case 'noteTodos':
                    return 'todos'
                default:
                    return 'txt'
            }
        }
    },
    unmounted() {},
};