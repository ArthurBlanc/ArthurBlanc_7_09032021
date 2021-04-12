<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Publication n° {{ post.id }}</h1>
		</b-jumbotron>

		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2" v-if="connected">
						<OnePost :getPosts="this.getOnePost" :posts="posts" />
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import axios from "axios";
import OnePost from "@/components/Post.vue";

export default {
	name: "Post",
	components: {
		OnePost,
	},

	data() {
		return {
			posts: [],
			post: [],
			connected: false,
		};
	},

	methods: {
		getOnePost() {
			const postId = this.$route.params.id;

			axios
				.get(`http://localhost:3000/api/posts/${postId}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.$token}`,
					},
				})
				.then((res) => {
					this.posts = res.data;
					this.post = res.data[0];
				});
		},
		checkConnected() {
			if (localStorage.user == undefined) {
				this.$router.replace("/login");
				this.connected = false;
			} else if (localStorage.user !== undefined) {
				this.connected = true;
			}
		},
	},
	created() {
		this.checkConnected();
	},

	mounted() {
		if (localStorage.user != undefined) {
			this.getOnePost();
		}
	},
};
</script>

<style scoped>
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/accueil-jumbotron.jpg");
	background-size: cover;
}
</style>
