import { bookService } from '../service/book-service.js'
import bookFilter from "../cmps/book-filter.cmp.js"
import bookList from "../cmps/book-list.cmp.js"


export default {
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter" />
            <router-link to='/book/bookAdd'>Add Book</router-link>
            <book-list :books="booksToShow" />
        </section>
            `,
    components: {
        bookFilter,
        bookList,
    },
    data() {
        return {
            books: null,
            filterBy: null,
        };
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter
        }
    },
    computed: {
        booksToShow() {
            let books = this.books

            if (!this.filterBy) return books
            if (this.filterBy.txt) {
                const regex = new RegExp(this.filterBy.txt, "i")
                books = books.filter((book) => regex.test(book.title))
            }
            if (this.filterBy.fromPrice || this.filterBy.toPrice) {
                books = books.filter(book => (book.listPrice.amount > this.filterBy.fromPrice) && (book.listPrice.amount < this.filterBy.toPrice))
            }
            return books
        },
    },
    unmounted() {},
};