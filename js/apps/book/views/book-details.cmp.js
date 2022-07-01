import { bookService } from "../service/book-service.js";
import reviewAdd from "../cmps/review-add.cmp.js";

export default {
    template: `
    <section v-if="book" class="book-details">
        <div class="img-holder">
            <div v-if="book.listPrice.isOnSale" class="sale-sign">
                <img src="../../assets/icons/saleTag.svg" alt="" srcset="">
            </div>
            <img :src="bookImgUrl" alt="" srcset="">
        </div>
        <div class="book-info">
            <table>
                <tr><td>Title</td><td>{{book.title}}</td></tr>
                <tr><td>ID</td><td>{{book.id}}</td></tr>
                <tr><td>Subtitle</td><td>{{book.subtitle}}</td></tr>
                <tr><td>language</td><td>{{book.language}}</td></tr>
                <tr><td>Published Date</td><td>{{formatedPublishedDate}}</td></tr>
                <tr><td>Page Count</td><td>{{formatedPageCount}}</td></tr>
                <tr><td>Description</td><td>{{book.description}}</td></tr>
                <tr><td>price</td><td :class="priceSytle">{{formatedPrice}}</td></tr>
            </table>
            <h4>Author</h4>
            <ul>
                <li v-for="author in book.authors">{{author}}</li>
            </ul>
            <h4>category</h4>
            <ul>
                <li v-for="category in book.categories">{{category}}</li>
            </ul>
        </div>

        <router-link :to="'/book/' + prevBookId">Prev book</router-link>
        <router-link :to="'/book/' + nextBookId">Next book</router-link>

        <router-link class="info-btn" to="/book">back</router-link>
    </section>

    <section class="book-reviwes">
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
        reviewAdd
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