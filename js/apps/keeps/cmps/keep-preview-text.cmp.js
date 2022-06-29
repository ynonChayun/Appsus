export default {
    template: `
    <section class="keep-template">
        <h4 class="title-txt">{{note.info.title}}</h4>
        <p>{{note.info.txt}}</p>
    </section>
`,
    props: ['note'],
};