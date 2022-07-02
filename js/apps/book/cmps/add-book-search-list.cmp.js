import bookPreview from "./book-preview.cmp.js"

export default {
    props: ["books"],
    template: `
    <section>
          <ul class="add-book-list">
              <li v-for="book in books" :key="book.id" class="add-book-item">
                  <p>{{book.title}}  </p>
                  <button class="add-book-btn" @click="addBook(book.id)">ADD BOOK</button>
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