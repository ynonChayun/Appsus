import bookPreview from "../cmps/book-preview.cmp.js";


export default {
    props: ["books"],
    template: `
   <section class="book-list">
          <ul>
              <li v-for="(book,idx) in books" :key="book.id" class="book-preview-container">
                  <router-link :to="'/book/'+book.id">
                  <book-preview :book="book"/>
                   </router-link>
              </li>
          </ul>
      </section>
  `,
    components: {
        bookPreview,

    },

    data() {
        return {};
    },
    methods: {

    },
    computed: {},
};