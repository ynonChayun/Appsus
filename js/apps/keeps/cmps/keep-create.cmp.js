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
                    <button title="Text Note" class="change-btn" @click="changeType('noteText')">
                        <i class="far fa-comment"></i>
                    </button>
                    <button title="Image Note" class="change-btn" @click="changeType('noteImg')">
                        <i class="far fa-image"></i>
                    </button>
                    <button title="Video(YT) Note" class="change-btn" @click="changeType('noteVideo')">
                    <i  class="fab fa-youtube"></i>
                    </button>
                    <button title="List Note" class="change-btn" @click="changeType('noteTodos')">
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
            } else if (this.note.noteType === 'video') {
                info.title = this.titleValue
                info.video = this.getId(this.txtValue)
                console.log('info.video: ', info.video)
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
        },
        getId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            console.log('match: ', match)

            return (match && match[2].length === 11) ? match[2] : null
        }
    },
    computed: {
        placeholderTxt() {
            if (this.note.type === 'noteText') {
                return 'What\'s on your mind...'
            } else if (this.note.type === 'noteImg') {
                return 'Enter image url...'
            } else if (this.note.type === 'noteVideo') {
                return 'Enter Youtube url...'
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