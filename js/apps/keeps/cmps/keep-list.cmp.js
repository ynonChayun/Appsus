import keepPreview from './keep-preview.cmp.js'
import keepPreviewUnpinned from './keep-preview-notPinned.cmp.js'

export default {
    props: ['notes'],
    template: `
            <section class="keep-list">
                    <keep-preview v-for="note in notes"
                    :note="note"
                    :key="note.id"/>
                    <keep-preview-unpinned v-for="note in notes"
                    :note="note"
                    :key="note.id"/>
            </section>
            `,
    data() {
        return {};
    },
    components: {
        keepPreview,
        keepPreviewUnpinned
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
};