export default {
    template: `
     <section class="book-filter">
        <div class="filter-by-title">
            <input v-model="filterBy.txt" type="text" placeholder="search by book title">
        </div>
        <div class="filter-by min-price">
            <span>Min Price: {{filterBy.fromPrice}}</span>
            <input type="range"  v-model="filterBy.fromPrice" min="0" max="500" name="" id="">
        </div>
        <div class="filter-by max-price">
            <span>Max Price: {{filterBy.toPrice}}</span>
            <input type="range" v-model="filterBy.toPrice" min="0" max="500" name="" id="">
        </div>
    </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                fromPrice: 0,
                toPrice: Infinity
            }
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.$emit('filtered', this.filterBy)
            },
            deep: true
        }
    }
}