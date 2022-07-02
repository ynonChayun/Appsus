export default {
    props: ["book"],
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
    data() {
        return {};
    },
    methods: {},
    computed: {
        currencyIcon() {
            var currencyCode = this.book.listPrice.currencyCode
            if (currencyCode === 'USD') return '$'
            else if (currencyCode === 'ILS') return '₪'
            else if (currencyCode === 'EUR') return '€'
        },
        formatedPrice() {
            const { currencyCode, amount } = this.book.listPrice
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
        },
        getRandState() {
            const states = ['Digital', 'Printed']
            return states[Math.floor(Math.random() * states.length)]
        },
    },
    created() {
        // console.log(this.book)
    },
};