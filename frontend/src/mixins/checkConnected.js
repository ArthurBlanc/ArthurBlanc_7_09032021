export default {
	data() {
		return {
			connected: false,
		};
	},
	created() {
		this.checkConnected();
	},
	methods: {
		checkConnected() {
			if (localStorage.user == undefined || this.$route.name == "Login") {
				if (this.$route.name != "Login") {
					this.$router.replace("/login");
				}
				this.connected = false;
			} else if (localStorage.user !== undefined) {
				this.connected = true;
			}
		},
	},
};
