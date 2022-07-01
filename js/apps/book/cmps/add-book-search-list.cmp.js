export default {
    props: ["results"],
    template: `
    <section>
          <ul>
              <li v-for="result in results" :key="result.id">
                  <p>{{result.title}}  <button @click="addBook(result.id)">ADD BOOK</button></p>
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
            // console.log('id: ', id)
            this.$emit('bookAdded', id)
        }
    },
    computed: {},
    unmounted() {},
};