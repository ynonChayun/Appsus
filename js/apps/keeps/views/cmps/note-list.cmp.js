export default {
    props: ['notes'],
    template: `
    <div v-for="note in notes">
        <p>{{note.info.title}}</p>
        <p>{{note.info.txt}}</p>
    </div>
`,
    data() {
        return {};
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
};