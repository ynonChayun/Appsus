export default {
    template: `
    <section class="keep-template">
        <h4>{{note.info.title}}</h4>
        <p>{{note.info.txt}}</p>
    </section>
`,
    props: ['note'],
};