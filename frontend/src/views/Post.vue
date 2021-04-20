<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Publication n° {{ post.id }}</h1>
		</b-jumbotron>

		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2" v-if="connected">
						<OnePost :getPosts="this.getOnePost" :posts="posts" :visible="visible" />
						<OnePostMedia :getPosts="this.getOnePost" :posts="posts" :visible="visible" />
						<div v-if="modify">
							<b-form>
								<b-form-file
									v-if="post.postImage != null"
									placeholder="Choisissez ou glissez votre fichier ici..."
									drop-placeholder="Glissez votre fichier ici..."
									accept="image/jpeg, image/png, image/gif"
									browse-text="Choisir"
									class="text-left"
									@change="onFileUpload"
								></b-form-file>
								<b-form-textarea id="modify-content" rows="3" max-rows="6" :value="post.content" required></b-form-textarea>

								<div>
									<b-button class="mt-3" variant="primary" type="submit" @click="modifyOnePost(), (modify = false)">Publier les modifications</b-button>
								</div>
								<div>
									<b-button class="mt-3" variant="danger" v-if="modify" @click="modify = false">Annuler les modifications</b-button>
								</div>
							</b-form>
						</div>

						<b-button class="mb-3" variant="danger" v-if="authorized && !modify" @click="modify = true">Modifier</b-button>
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import axios from "axios";
import OnePost from "@/components/Post.vue";
import OnePostMedia from "@/components/PostMedia.vue";

export default {
	name: "Post",
	components: {
		OnePost,
		OnePostMedia,
	},

	data() {
		return {
			authorized: false,
			modify: false,
			visible: true,

			posts: [],
			post: [],
			connected: false,
			FILE: null,
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
					//this.posts = res.data; Get posts without comments
					let commentsList = res.data;

					this.posts = commentsList.map((comment) => {
						comment.comments = 0;
						commentsList.forEach((post) => {
							axios
								.get(`http://localhost:3000/api/comments/${post.id}`, {
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

					this.post = res.data[0];

					if (this.$user.userId === this.post.userId || this.$user.admin == 1) {
						this.authorized = true;
					} else {
						this.authorized = false;
					}
				});
		},

		onFileUpload(event) {
			this.FILE = event.target.files[0];
		},

		modifyOnePost() {
			const postId = this.$route.params.id;
			const content = document.querySelector("#modify-content").value;
			const formData = new FormData();
			formData.append("postId", this.$user.userId);
			formData.append("content", content);
			if (this.FILE != null) {
				formData.append("image", this.FILE, this.FILE.name);
			}
			axios
				.put(`http://localhost:3000/api/posts/${postId}`, formData, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.$token}`,
					},
				})

				.then(() => {
					this.getOnePost();
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
