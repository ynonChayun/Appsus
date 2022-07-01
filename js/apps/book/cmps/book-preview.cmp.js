export default {
    props: ['book'],
    template: `
        <section class="book-preview" v-if="book.mode === 'list'">
            <img :src="book.book.thumbnail" alt="">
            <div class="text-container-book">
                <span class="title">{{book.book.title}}</span>
                <span class="writer">{{book.book.authors[0]}}</span>
            <div><span class="state">{{getRandState}}&nbsp;</span><span class="price">{{formatedPrice}}</span></div>
            </div>
        </section>
        <!-- <section class="book-preview" v-else>
            <img :src="book.book.imageLinks.thumbnail">
            <div class="text-container-book">
                <span class="title">{{book.book.volumeInfo.title}}</span>
                <span class="writer">{{book.book.volumeInfo.authors[0]}}</span>
            <div><span class="state">{{getRandState}}&nbsp;</span><span class="price">{{formatedPrice}}</span></div>
            </div>
        </section> -->
    `,
    computed: {
        formatedPrice() {
            const { currencyCode, amount } = this.book.book.listPrice
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
        },
        getRandState(){
                const states = ['Digital', 'Printed']
                return states[Math.floor(Math.random() * states.length)]
        },
    },
    created() {
        console.log(this.book)
        console.log(this.book.book)
    },
}