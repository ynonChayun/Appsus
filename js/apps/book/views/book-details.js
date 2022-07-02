import { bookService } from "../service/book-service.js";
import longText from '../cmps/long-text.cmp.js'
import reviewAdd from "../cmps/review-add.cmp.js";


export default {
    template: `
    <section v-if="book" class="book-details-container">
        <div class="book-details">
                <div class="img-box">
                  <img :src="bookImgUrl" alt="">
                </div>

                <div class="book-desc">
                    <h2>{{ book.title }} <span class="price" :class="priceSytle">{{formatedPrice}}</span></h2>
                    <p class="author">By <span v-for="author in book.authors">{{author}}</span></p>
                    <h4>{{ book.subtitle }}</h4>
                    <p class="bookDate">Published at: {{ formatedPublishedDate }} </p>
                    
                    <long-text :text="book.description"></long-text>
                    
                    <div class="more-details">
                        <div>
                            <span class="detail">{{ formatedPageCount }}</span>
                            <span class="detail">{{ book.language }}</span>
                        </div>
                        <ul class="tags">
                            <li v-for="category in book.categories ">
                                <span class="tag">{{category}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="more-details">
                    <router-link :to="'/book/' + prevBookId">Prev book</router-link>
        <router-link :to="'/book/' + nextBookId">Next book</router-link>

        <router-link class="info-btn" to="/book">back</router-link>
                    </div>
    
            </div>
        </div>
        <review-add />
    </section>
    `,
    data() {
        return {
            book: null,
            eurRate: 3.60,
            usdRate: 3.41,
            prevBookId: null,
            nextBookId: null,
        }
    },
    components: {
        reviewAdd,
        longText
    },
    computed: {
        bookImgUrl() {
            return `${this.book.thumbnail}`
        },
        formatedPageCount() {
            const { pageCount } = this.book
            if (pageCount > 500) return `${pageCount} pages - Long reading`
            if (pageCount > 200) return `${pageCount} pages - Decent Reading`
            if (pageCount < 100) return `${pageCount} pages - Light Reading`
            else return `${pageCount} pages`
        },
        formatedPublishedDate() {
            const { publishedDate } = this.book
            const currDate = new Date
            const yearsPassed = currDate.getFullYear() - publishedDate
            if (yearsPassed > 10) return `${publishedDate} - Veteran Book`
            if (yearsPassed < 1) return `${publishedDate} - New!`
            return publishedDate
        },
        formatedPrice() {
            const { amount, currencyCode } = this.book.listPrice
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
        },
        priceSytle() {
            var bookPrice
            const { amount, currencyCode } = this.book.listPrice
            switch (currencyCode) {
                case 'EUR':
                    bookPrice = amount * this.eurRate
                    break;

                case 'USD':
                    bookPrice = amount * this.usdRate
                    break;

                default:
                    bookPrice = amount
                    break;
            }
            return { 'low-price': bookPrice < 20, 'high-price': bookPrice > 150 }
        }
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params

                bookService.get(bookId)
                    .then(book => this.book = book)

                bookService.getNextBookId(bookId)
                    .then(nextBookId => this.nextBookId = nextBookId)

                bookService.getPrevBookId(bookId)
                    .then(prevBookId => this.prevBookId = prevBookId)
            },
            immediate: true
        }

    }
}
// export default {
//     template: `
//         <section v-if="book" class="book-details">
//             <div class="book-details main-layout flex">
//                 <div class=img-box>
//                     <img :src="bookImgUrl" alt="">
//                 </div>
//                  <div class="book-txt-details">
//                      <h2>{{ book.title }} <span class="price" :class="priceClass">{{book.listPrice.amount}}{{currencyIcon}}</span></h2>
//                      <p class="author">By: <span>{{ authors }}</span></p>
//                      <h4>{{ book.subtitle }}</h4>
//                      <p>Published at: {{ book.publishedDate }} {{date}}.</p>
//                      <long-text v-if="book.description" :text="book.description"></long-text>

//                     <div class="more-details">
//                       <div>
//                         <span class="detial">{{book.pageCount}} pages, {{pageCount}}</span>
//                         <br>
//                         <span class="detial">{{book.language}}</span>
//                       </div>
//                       <ul >
//                         <li v-for="category in book.categories ">
//                           <span>{{category}}</span>
//                         </li>
//                       </ul>
//                     </div>
//                     <router-link :to="'/book/' + nextBookId">Next Book</router-link>
//                     <router-link :to="'/book/' + previousBookId">Previous Book</router-link>
//                     <router-link to="/book"><button>Back</button></router-link>
//                 </div>

//             </div>
//         </section>
//   `,
//     components: {
//         longText,
//     },
//     data() {
//         return {
//             book: null,
//             Id: null,
//             difficulty: '',
//             bookStatus: '',
//             isLongText: false,
//             nextBookId: null,
//             previousBookId: null,
//         };
//     },
//     created() {
//         const id = this.$route.params.bookId
//         this.Id = id
//         bookService.get(id).then(book => this.book = book)
//     },
//     methods: {},
//     computed: {
//         colorPrice() {
//             if (this.book.listPrice.amount > 140) return 'red'
//             else if (this.book.listPrice.amount < 20) return 'green'
//         },
//         currencyIcon() {
//             var currencyCode = this.book.listPrice.currencyCode
//             if (currencyCode === 'USD') return '$'
//             else if (currencyCode === 'ILS') return '₪'
//             else if (currencyCode === 'EUR') return '€'
//         },
//         date() {
//             let date = this.book.publishedDate
//             let currYear = new Date().getFullYear()
//             let diff = currYear - date

//             if (diff > 10) {
//                 this.bookStatus = ', Veteran Book'
//                 return this.bookStatus
//             } else if (diff <= 1) {
//                 this.bookStatus = ', New'
//                 return this.bookStatus
//             }
//         },
//         bookImgUrl() {
//             return `${this.book.thumbnail}`
//         },
//         categories() {
//             let categories = this.book.categories
//             if (!categories) return 'general'
//             return categories.join(', ')

//         },
//         authors() {
//             let authors = this.book.authors
//             if (!authors) return 'unknon'

//             return authors.join(', ')

//         },
//         pageCount() {
//             let readingLength = this.book.pageCount
//             if (readingLength > 500) {
//                 this.difficulty = 'Long Reading'
//                 return this.difficulty
//             } else if (readingLength > 200) {
//                 this.difficulty = 'Decent Reading'
//                 return this.difficulty
//             } else if (readingLength > 200) {
//                 this.difficulty = 'Medium Reading'
//                 return this.difficulty
//             } else if (readingLength < 100) {
//                 this.difficulty = 'Light Reading'
//                 return this.difficulty
//             }
//         },
//     },
//     watch: {
//         '$route.params.bookId': {
//             handler() {
//                 const id = this.$route.params.bookId
//                 if (!id) return
//                 bookService.get(id).then((book) => {
//                     this.book = book
//                     bookService.getNextBookId(book.id)
//                         .then(nextBookId => this.nextBookId = nextBookId)
//                     bookService.getPrevBookId(book.id)
//                         .then(prevBookId => this.previousBookId = prevBookId)
//                 })
//             },
//             immediate: true
//         }

//     }
// };