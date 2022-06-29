export default {
    template: `
    <section class="keep-create">
        <div class="keep-create-container">
            <input class="txt-input">

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
            inputValue: null
        };
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
};