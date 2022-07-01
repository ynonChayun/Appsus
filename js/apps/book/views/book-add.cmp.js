import { bookService } from '../service/book-service.js'
import addBookSearch from "../cmps/add-book-search.cmp.js";
import addBookSearchList from "../cmps/add-book-search-list.cmp.js";


export default {
    template: `
    <section>
    <router-link to="/book"  > Back to book shop</router-link> 
           <h1>Find and Add new Books:</h1>
           <add-book-search @searchNewBook="onSearchNewBook"/>
           <add-book-search-list v-if="searchedResults"
            :results="searchedResults" @bookAdded="onAddBook"/>

    </section>`,
    components: {
        addBookSearch,
        addBookSearchList
    },
    data() {
        return {
            searchKey: '',
            booksTitles: null,
            searchedResults: null
        }
    },
    watch: {

    },
    methods: {
        onSearchNewBook(title) {
            bookService.getSearchResults(title).then((results) => {
                this.searchedResults = results
            })

        },
        onAddBook(id) {
            console.log('id: ', id)
            let results = this.searchedResults
            console.log('results: ', results)
            let bookIdx = results.findIndex((result) => result.id === id)
            console.log('bookIdx: ', bookIdx)
            let currBook = results[bookIdx]
            console.log('currBook: ', currBook)
            bookService.save(currBook)
        },


    }
}