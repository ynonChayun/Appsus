import bookPreview from "./book-preview.cmp.js"

export default {
    props: ['books'],
    template: `
    <section class="book-list">
        <ul>
            <li v-for="book in books" :key="book.id" class="book-preview-container">
                    <router-link class="info-btn" :to="'/book/'+book.id"><book-preview :book="{book ,mode:'list'}"/></router-link>
            </li>
        </ul>
    </section>
    `,
    components: {
        bookPreview,
    },
}