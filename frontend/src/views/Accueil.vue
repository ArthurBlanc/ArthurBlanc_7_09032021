<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>
				Bienvenue sur le réseau social interne <br />
				de Groupomania !
			</h1>
		</b-jumbotron>
		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2" v-if="connected">
						<Post :getPosts="this.getAllPosts" :posts="posts" :postButton="'Créer une discussion ou partager une image'" :imageRequired="false" :textRequired="false" />
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import axios from "axios";
import Post from "@/components/Post.vue";
import checkConnected from "@/mixins/checkConnected";

export default {
	name: "Accueil",
	mixins: [checkConnected],
	components: {
		Post,
	},

	data() {
		return {
			posts: [],
		};
	},

	methods: {
		getAllPosts() {
			axios
				.get(`http://localhost:3000/api/posts/`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.$token}`,
					},
				})
				.then((res) => {
					//this.posts = res.data; Get posts without comments
					let commentsList = res.data;

					this.posts = commentsList.map((comment) => {
						comment.comments = 0;
						commentsList.forEach((post) => {
							axios
								.get(`http://localhost:3000/api/comments/${post.id}/`, {
									headers: {
										"Content-Type": "application/json",
										Authorization: `Bearer ${this.$token}`,
									},
								})
								.then((res) => {
									post["comments"] = res.data;
								});
						});
						return comment;
					});
				});
		},
	},
};
</script>

<style scoped>
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/accueil-jumbotron.jpg");
	background-size: cover;
}
</style>
