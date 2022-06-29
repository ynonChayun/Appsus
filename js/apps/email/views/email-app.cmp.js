import emailList from '../cmps/email-list.cmp.js'
import EmailHeader from '../cmps/header.cmp.js'
import emailSide from '../cmps/email-sidebar.cmp.js'


export default {
    template: `

    <Email-header />
    <email-side />
    <email-list />
`,
    data() {
        return {};
    },
    methods: {},
    components: {
        EmailHeader,
        emailSide,
        emailList,
    },
    created() { },
    unmounted() { },
};