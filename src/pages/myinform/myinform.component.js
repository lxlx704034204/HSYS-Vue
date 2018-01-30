import storage from "store2";
export default {
    name: 'myinform',
    components: {},
    props: [],
    data() {
        return {
            form: {},
            name: "",
            num: "",
        }
    },
    computed: {

    },
    created() {
        this.fetch();
    },
    mounted() {

    },
    methods: {
        fetch() {
            this.name = storage.get("userName");
            this.num = storage.get("mobileNo");
        },
        span() {
            this.$router.push({ path: '/companycenter/myinform1' })
        },
        update() {
            this.$router.push({ path: '/companycenter/myinform4' })
        },

    }
}