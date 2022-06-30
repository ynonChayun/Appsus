export default {
    template: `
        <section class="keep-template">
            <h2 v-if="note.info.title" class="title-txt">{{note.info.title}}</h2>

            <iframe width="100%"
            :src="videoSrcLink"></iframe>
        </section>
    `,
    props: ['note'],
    methods: {},
    computed: {
        videoSrcLink() {
            let url = 'https://www.youtube.com/embed/' + this.note.info.video
            return url
        }
    }
}