import { eventBus } from "../../../services/eventBus-service.js";
export default {
    props: ['note'],
    template: `
    <section class="keep-template">
        <h4 v-if="note.info.title" class="title-txt">{{note.info.title}}</h4>
        <ul v-if="note.info.todos" class="todos-ul">
            <li v-for="(todo, idx) in note.info.todos"
            :class=" {'todo-complete' : todo.isComplete, 'todo-uncomplete' : !todo.isComplete}"
            @click="toggleTodoComplete(idx)"
            class="todo-li">
                {{todo.txt}}
                <button @click.stop="removeTodo(idx)"
                class="todo-remove-btn">
                    <i class="fas fa-times"></i>
                </button>
            </li>
            
        </ul>
        <input @keyup.enter="addTodo" 
            v-model="nextTodo" 
            class="next-todo-input"
            placeholder="I need to do..." >
    </section>
`,
    data() {
        return {
            nextTodo: '',
        };
    },
    created() {},
    methods: {
        addTodo() {
            const todo = {
                txt: this.nextTodo,
                isComplete: false,
            }
            if (!this.note.info.todos) this.note.info.todos = []
            this.note.info.todos.push(todo)
            const newNote = this.createNoteCopy()
            eventBus.emit('addTodo', newNote)
            this.nextTodo = ''
        },
        removeTodo(idx) {
            const newNote = this.createNoteCopy()
            const noteT = {
                idx,
                newNote,
            }
            eventBus.emit('removeTodo', noteT)
        },
        toggleTodoComplete(TodoIdx) {
            this.note.info.todos[TodoIdx].isComplete = !this.note.info.todos[TodoIdx].isComplete
            const newNote = this.createNoteCopy()
            eventBus.emit('toggleTodoComplete', newNote)
        },
        createNoteCopy() {
            return JSON.parse(JSON.stringify(this.note))
        }
    },
    computed: {},
    unmounted() {},
};