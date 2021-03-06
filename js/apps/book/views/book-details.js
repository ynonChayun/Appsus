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
                        <div class="page-btn">
                            <router-link class="info-btn" :to="'/book/' + prevBookId">&laquo; Previous</router-link>
                            <router-link class="info-btn" :to="'/book/' + nextBookId">Next &raquo;</router-link>
                        </div>
                        <div class="page-btn">
                            <router-link class="info-btn" to="/book">Back to book shop</router-link>
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