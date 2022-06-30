export default {
    template: `
    <section class="keep-template">
        <h4 v-if="note.info.title" class="title-txt">{{note.info.title}}</h4>
        <img class="note-img" :src="note.info.img" alt="">
    </section>
`,
    props: ['note'],

};