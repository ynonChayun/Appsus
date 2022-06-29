import noteText from './keep-preview-text.cmp.js'
import noteImg from './keep-preview-image.cmp.js'
import noteTodos from './keep-preview-todos.cmp.js'


export default {
    props: ['note'],
    template: `
                <section class="keep-preview">
                    <div class="keep-type-container" :style="{ backgroundColor: noteBgColor }">
                        <component :is="note.type"
                            :class="note.type"
                            :note="note">
                        </component>
                    </div>
                </section>
            `,
    data() {
        return {};
    },
    components: {
        noteText,
        noteImg,
        noteTodos
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