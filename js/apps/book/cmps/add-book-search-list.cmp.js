import bookPreview from "./book-preview.cmp.js"

export default {
    props: ["books"],
    template: `
    <section>
          <ul>
              <li v-for="book in books" :key="book.id">
                  <p>{{book.title}}  <button @click="addBook(book.id)">ADD BOOK</button></p>
                  <!-- <book-preview :book="{book,mode:'search'}"/> -->
              </li>
          </ul>
      </section>
`,
    data() {
        return {};
    },
    created() {},
    methods: {
        addBook(id) {
            this.$emit('bookAdded', id)
        }
    },
    computed: {},
    unmounted() {},
    components: {
        bookPreview
    }
};