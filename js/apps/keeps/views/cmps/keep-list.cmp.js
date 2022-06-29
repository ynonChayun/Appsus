import keepPreview from './keep-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
            <section>
                <keep-preview v-for="note in notes"
                    :note="note"
                    :key="note.id"/>
            </section>
            `,
    data() {
        return {};
    },
    components: {
        keepPreview,
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
};