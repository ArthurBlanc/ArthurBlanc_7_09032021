<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Derniers médias</h1>
		</b-jumbotron>

		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2" v-if="connected">
						<Post :getPosts="this.getAllCategoryPosts" :posts="posts" :postButton="'Partager une image'" :imageRequired="true" :textRequired="false" />
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
	name: "Medias",
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
		getAllCategoryPosts() {
			const categoryId = 2;
			axios
				.get(`http://localhost:3000/api/posts/category/${categoryId}`, {
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

<style scoped lang="scss">
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/medias-jumbotron.jpg");
	background-size: cover;
}
</style>
