import { bookService } from "../service/book-service.js"
import { eventBus } from "../service/eventBus-service.js"

export default {
    template: `
    <section class="book-review-form">
        <pre>{{review}}</pre>
        <form @submit.prevent="add">
            <table>
                <tr>
                    <td>Full Name</td>
                    <td>
                        <input ref="input" type="text" v-model="review.rederName" 
                        placeholder="Full Name" required/>
                    </td>
                </tr>

                <tr>
                    <td>Book Rate</td>
                    <td>
                        <div class="rate">
                            <span v-for="num in 5" :class="{star: num <= review.rate}" @click="setRating(num)">★</span>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>Reading Date</td>
                    <td><input v-model="review.readingDate" type="date" name="ReadingDate" id="ReadingDate" required/></td>
                </tr>

                <tr>
                    <td>Your Review</td>
                    <td>
                    <textarea v-model="review.bookReview" id="bookReview" name="bookReview" rows="4" cols="50" required></textarea>
                    </td>
                </tr>
            </table>
            <button>add</button>
        </form>
    </section>

    <section v-if="book" class="review-list">
        BOOK REVIEW
        <ul v-if="book.reviews">
            <li v-for="review in book.reviews">
                <button @click="remove(review.id)">X</button>
                <pre>{{review}}</pre>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            book: null,
            review: {
                rederName: '',
                rate: '',
                readingDate: '',
                bookReview: ''
            }
        }
    },
    created() {
        const { bookId } = this.$route.params
        bookService.get(bookId)
            .then(book => this.book = book)
    },
    mounted() {
        console.log(this.$refs);
        this.$refs.input.focus()
    },
    methods: {
        setRating(val) {
            this.review.rate = val
        },
        add() {
            bookService.addReview(this.book.id, this.review)
                .then(book => {
                    this.book = book;
                    this.review = bookService.getEmptyReview()
                    eventBus.emit('show-msg', { txt: `A review on book ${this.book.id} was successfully added`, type: 'success' });
                })
        },
        remove(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book;
                    eventBus.emit('show-msg', { txt: `A review on book ${this.book.id} was successfully removed`, type: 'success' });
                })
        }
    },
}