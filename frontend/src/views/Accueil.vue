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
						<div class="mb-3">
							<b-button id="toggle-post-modal" variant="primary" block @click="toggleModal">Créer une discussion ou partager une image</b-button>

							<b-modal ref="post-modal" hide-footer title="Créer une discussion ou partager une image">
								<div class="d-block text-center">
									<b-form @submit.prevent="onSubmit()">
										<b-form-file
											placeholder="Choisissez ou glissez votre fichier ici..."
											drop-placeholder="Glissez votre fichier ici..."
											accept="image/jpeg, image/png, image/gif"
											browse-text="Choisir"
											class="text-left"
											@change="onFileUpload"
										></b-form-file>

										<b-form-textarea id="textarea" v-model="content" placeholder="Que voulez-vous dire ?" rows="3" max-rows="6"></b-form-textarea>

										<b-alert class="mt-3" show variant="danger" v-if="message != ''">{{ message }}</b-alert>

										<b-button class="mt-3" variant="primary" type="submit" block>Publier</b-button>
									</b-form>
								</div>
							</b-modal>
						</div>
						<Post :getPosts="this.getAllPosts" :posts="posts" />
						<PostMedia :getPosts="this.getAllPosts" :posts="posts" />
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import axios from "axios";
import Post from "@/components/Post.vue";
import PostMedia from "@/components/PostMedia.vue";

export default {
	name: "Accueil",
	components: {
		Post,
		PostMedia,
	},
	data() {
		return {
			message: "",
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
		toggleModal() {
			this.$refs["post-modal"].toggle("#toggle-post-modal");
		},

		// Form
		onSubmit() {
			const formData = new FormData();
			formData.append("userId", this.$user.userId);
			formData.append("content", this.content);
			if (this.FILE != null) {
				formData.append("categoryId", 2);
				formData.append("image", this.FILE, this.FILE.name);
			} else {
				formData.append("categoryId", 1);
			}
			if (this.FILE === null && this.content === "") {
				this.message = "Les deux champs ne peuvent etre vide";
			} else {
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
			}
		},
		onFileUpload(event) {
			this.FILE = event.target.files[0];
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
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/accueil-jumbotron.jpg");
	background-size: cover;
}
</style>
