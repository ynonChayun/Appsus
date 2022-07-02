export default {
    template: `
    <input type="text" v-model="bookTitle" @input="searchNewBook" placeholder="Search for a book..">
`,
    data() {
        return {
            bookTitle: '',
        };
    },
    created() {},
    methods: {
        searchNewBook() {
            // console.log('this.bookTitle: ', this.bookTitle)
            this.$emit("searchNewBook", this.bookTitle);
        },
    },
    computed: {},
    unmounted() {},
};