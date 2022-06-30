import noteText from './keep-preview-text.cmp.js'
import noteImg from './keep-preview-image.cmp.js'
import noteTodos from './keep-preview-todos.cmp.js'
import noteMenu from './keep-menu.cmp.js'


export default {
    props: ['note'],
    template: `
                <section v-if="!note.isPinned" class="keep-preview" :style="{ backgroundColor: noteBgColor }">
                    <div class="keep-type-container" >
                        <component :is="note.type"
                            :class="note.type"
                            :note="note">
                        </component>
                        <note-menu :note="note"/>
                    </div>
                </section>
            `,
    data() {
        return {};
    },
    components: {
        noteText,
        noteImg,
        noteTodos,
        noteMenu
    },
    created() {},
    methods: {},
    computed: {
        noteBgColor() {
            return this.note.style.backgroundColor
        }
    },
    unmounted() {},
};