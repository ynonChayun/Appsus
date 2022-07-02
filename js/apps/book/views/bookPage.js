import { bookService } from "../service/book-service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import addBook from "../cmps/add-book.cmp.js";
import addBookList from "../cmps/add-book-list.cmp.js";
import addModal from '../views/book-add.cmp.js'


export default {
    template: `
    <section>
        <section>
            <div>
            <div class="add-book-container">
                <div class="add-book-txt" >
                <div @click ="setAddBookModal" class="add-book">
                    <div class="compose-img"></div> 
                     <span class="add-book-txt"> Add Book</span>
                    </div>
                </div>
            </div>
            <add-modal v-if="isAddModal" @closeModal="isAddModal = !isAddModal"/>
        

                <!-- <add-book @searchNewBook="onSearchNewBook"/>
                <add-book-list v-if="searchedResults" :results="searchedResults" @bookAdded="onAddBook"/> -->
                <book-filter @filtered="filterBook"/>
                <book-list :books="booksToDisplay" />
            </div>
        </section> -
    </section>
  `,
    components: {
        bookList,
        bookFilter,
        addBook,
        addBookList,
        addModal
    },
    data() {
        return {
            books: null,
            filterBy: null,
            searchedTitle: null,
            searchedResults: null,
            isAddModal: false,
        };
    },
    created() {
        bookService.query().then(books => this.books = books)
    },
    methods: {
        filterBook(filterBy) {
            this.filterBy = filterBy;
        },
        onSearchNewBook(title) {
            // this.searchedTitle = title
            bookService.getSearchResults(title).then((results) => {
                this.searchedResults = results
            })

        },
        newBooks() {
            let title = this.searchedTitle
            bookService.getSearchResults(title).then((results) => {
                this.searchedResults = results
            })

        },
        onAddBook(id) {
            let results = this.searchedResults
            let bookIdx = results.findIndex((result) => result.id === id)
            let currBook = results[bookIdx]
            this.books.push(currBook)
            bookService.save(currBook)
        },
        setAddBookModal() {
            this.isAddModal = !this.isAddModal
            console.log('this.isAddModal: ', this.isAddModal)
        }
    },
    computed: {
        booksToDisplay() {
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
};