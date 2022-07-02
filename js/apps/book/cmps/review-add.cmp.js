import { bookService } from "../service/book-service.js"
import { eventBus } from "../service/eventBus-service.js"

export default {
    template: `
    <section class="review-add">
        <form @submit.prevent="add">

            <div class="stars-date">
                <div class="rate">
                <span v-for="num in 5" :class="{star: num <= review.rate}" @click="setRating(num)"><i class="far fa-star"></i></span>
                </div>
                <input required type="date" ref="date" class="date-input" v-model="review.readingDate">
            </div>
            <div class="review-input">

                <input required type="text" v-model="review.name" ref="userName" placeholder="Type your name" class="user-name">
                <textarea required v-model="review.bookReview" placeholder="Type your review."class="free-txt" cols="20" rows="5"></textarea>
            </div>
            <button type="submit" class="submit-btn">Submit</button>
        </form>
    </section>

    <section v-if="book" class="reviews-container">
        <ul v-if="book.reviews" class="book-reviews">
            <li v-for="review in book.reviews" class="review">
            <p class="name">{{review.name}}</p> <span>{{review.readingDate}}</span>
            <div class="rate">
                <span>{{review.rate}}/5 <i class="far fa-star star"></i></span>
            </div>
            <div class="review-txt">
            <p>{{review.bookReview}}</p>
        </div>
        <button @click="remove(review.id)" class="close-btn">X</button>
            </li>
        </ul>
    </section> 
    `,
    data() {
        return {
            book: null,
            review: {
                name: 'Book Reader',
                rate: 0,
                readingDate: '',
                bookReview: '',
            },
        }
    },
    created() {
        const { bookId } = this.$route.params
        bookService.get(bookId)
            .then(book => this.book = book)
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
                        // eventBus.emit('show-msg', { txt: `A review on book ${this.book.id} was successfully added`, type: 'success' });
                })
        },
        remove(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book;
                    // eventBus.emit('show-msg', { txt: `A review on book ${this.book.id} was successfully removed`, type: 'success' });
                })
        }
    },
}