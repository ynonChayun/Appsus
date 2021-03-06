export default {
    props: ["results"],
    template: `
    <section>
          <ul>
              <li v-for="result in results" :key="result.id">
                  <p>{{result.title}} <button class="info-btn" @click="addBook(result.id)">ADD... BOOK</button></p>
              </li>
          </ul>
      </section>
`,
    data() {
        return {};
    },
    created() {},
    methods: {
        addBook(id) {
            this.$emit('bookAdded', id)
        }
    },
    computed: {},
    unmounted() {},
};