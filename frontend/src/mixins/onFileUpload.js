export default {
	data() {
		return {
			FILE: null,
		};
	},
	methods: {
		onFileUpload(event) {
			this.FILE = event.target.files[0];
		},
	},
};
