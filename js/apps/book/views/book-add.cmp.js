import { bookService } from '../service/book-service.js'
import addBookSearch from "../cmps/add-book-search.cmp.js";
import addBookSearchList from "../cmps/add-book-search-list.cmp.js";


export default {
    template: `
    <section class="book-add" v-if="false">
    <header>Add Book <div class="close-compose">x</div></header>
        <div class="book-add-content">
           <add-book-search @searchNewBook="onSearchNewBook"/>
           <add-book-search-list v-if="searchedResults"
            :books="searchedResults" @bookAdded="onAddBook"/>
</div>
    </section>`
    
    
    ,
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