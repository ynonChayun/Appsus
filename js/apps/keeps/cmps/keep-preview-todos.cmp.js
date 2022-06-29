export default {
    props: ['note'],
    template: `
    <section>
        <h4>{{note.info.title}}</h4>
        <ul>
            <li v-for="(todo, idx) in note.info.todos">
                {{todo.txt}}
                </li>
        </ul>
    </section>
`,
    data() {
        return {};
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
};