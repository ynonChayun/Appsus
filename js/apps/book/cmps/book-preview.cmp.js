export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <img :src="book.thumbnail" alt="">
            <div class="text-container-book">
                <span class="title">{{book.title}}</span>
                <span class="writer">{{book.authors[0]}}</span>
            <div><span class="state">{{getRandState}}&nbsp;</span><span class="price">{{formatedPrice}}</span></div>
            </div>
        </section>
    `,
    computed: {
        formatedPrice() {
            const { currencyCode, amount } = this.book.listPrice
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
        },
        getRandState(){
                const states = ['Digital', 'Printed']
                return states[Math.floor(Math.random() * states.length)]
        }
    },
}