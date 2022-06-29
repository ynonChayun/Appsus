import { noteText, noteImg } from "../service/template-service.js"
export default {
    props: ['note'],
    template: `
                <section>
                    <div>
                        <component :is="note.type"
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
        noteImg
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
};