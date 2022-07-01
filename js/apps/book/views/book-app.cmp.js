import { bookService } from '../service/book-service.js'

import addModal from '../views/book-add.cmp.js'
import bookList from "../cmps/book-list.cmp.js"

import { eventBus } from '../../email/services/eventBus-service.js';


export default {
    template: `
        <section class="book-app">
            
        <div class="add-book-container">
        <div class="add-book-txt" >
        <div @click ="setAddBookModal" class="add-book">
            <div class="compose-img"></div> 
       <span class="add-book-txt"> Add Book</span></div>
    </div>
        
    </div>

             <add-modal/>
            <book-list :books="booksToShow" />
        </section>
            `,
    components: {
        bookList,
        addModal
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
        eventBus.on('filtered', this.setFilter)
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter
        },
        setAddBookModal(){
            this.isAddModal = !this.isAddModal
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
    unmounted() { },
};