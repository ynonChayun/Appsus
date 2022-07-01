export default {
    props: ['book'],
    template: `
        <section class="book-preview">
                <h2>{{book.title}}</h2>
                <span>{{formatedPrice}}</span>
        </section>
    `,
    computed: {
        formatedPrice() {
            const { currencyCode, amount } = this.book.listPrice
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
        }
    },
}