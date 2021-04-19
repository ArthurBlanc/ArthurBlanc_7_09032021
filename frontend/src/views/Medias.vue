<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Derniers médias</h1>
		</b-jumbotron>

		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2" v-if="connected">
						<div class="mb-3">
							<b-button v-if="$route.name != 'Post'" id="toggle-post-modal" variant="primary" block @click="toggleModal">Partager une image</b-button>

							<b-modal ref="post-modal" hide-footer title="Partager une image">
								<div class="d-block text-center">
									<b-form @submit.prevent="onSubmit()">
										<b-form-file
											placeholder="Choisissez ou glissez votre fichier ici..."
											drop-placeholder="Glissez votre fichier ici..."
											accept="image/jpeg, image/png, image/gif"
											browse-text="Choisir"
											class="text-left"
											@change="onFileUpload"
											required
										></b-form-file>

										<b-form-textarea id="textarea" v-model="content" placeholder="Que voulez-vous dire ?" rows="3" max-rows="6"></b-form-textarea>

										<b-button class="mt-3" variant="primary" type="submit" block>Publier</b-button>
									</b-form>
								</div>
							</b-modal>
						</div>
						<PostMedia :getPosts="this.getAllPosts" :posts="posts" />
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import axios from "axios";
import PostMedia from "@/components/PostMedia.vue";

export default {
	name: "Medias",
	components: {
		PostMedia,
	},
	data() {
		return {
			text: "",
			file1: null,
			show: true,
			connected: false,
			posts: [],
			content: "",
			FILE: null,
		};
	},
	methods: {
		// Form
		onSubmit() {
			const formData = new FormData();
			formData.append("userId", this.$user.userId);
			formData.append("content", this.content);
			formData.append("image", this.FILE, this.FILE.name);
			axios
				.post(`http://localhost:3000/api/posts/`, formData, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.$token}`,
					},
				})
				.then(
					this.toggleModal(),
					setTimeout(() => {
						(this.content = ""), (this.FILE = null), this.getAllPosts();
					}, 200)
				);
		},
		toggleModal() {
			this.$refs["post-modal"].toggle("#toggle-post-modal");
		},
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
		onFileUpload(event) {
			this.FILE = event.target.files[0];
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
			this.getAllPosts();
		}
	},
};
</script>

<style scoped lang="scss">
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/medias-jumbotron.jpg");
	background-size: cover;
}
</style>
