<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Publication n° {{ post.id }}</h1>
		</b-jumbotron>

		<main>
			<b-container>
				<b-row>
					<b-col lg="9" xl="8" class="mx-auto" v-if="connected">
						<OnePost :getPosts="this.getOnePost" :posts="posts" :visible="visible" />
						<b-alert show variant="danger" v-if="message != ''">{{ message }}</b-alert>
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
								<b-form-textarea id="modify-content" rows="3" max-rows="6" :value="post.content" maxlength="512" required></b-form-textarea>

								<div>
									<b-button class="mt-3" variant="primary" type="submit" @click="modifyOnePost(), (modify = false)">Publier les modifications</b-button>
								</div>
								<div>
									<b-button class="mt-3 mb-3" variant="danger" v-if="modify" @click="modify = false">Annuler les modifications</b-button>
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
import checkConnected from "@/mixins/checkConnected";
import onFileUpload from "@/mixins/onFileUpload";

export default {
	name: "Post",
	mixins: [checkConnected, onFileUpload],
	components: {
		OnePost,
	},

	data() {
		return {
			message: "",
			authorized: false,
			modify: false,
			visible: true,

			posts: [],
			post: [],
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

		modifyOnePost() {
			const postId = this.$route.params.id;
			const content = document.querySelector("#modify-content").value;
			const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'\-()%:/!?]*$/;
			const formData = new FormData();
			formData.append("postId", this.$user.userId);
			formData.append("content", content);
			if (this.FILE != null) {
				formData.append("image", this.FILE, this.FILE.name);
			}
			if ((content != "") & (content < 3)) {
				this.message = "Votre publication doit contenir au minimum 3 caractères";
			} else if ((content != "") & !regex.test(content)) {
				this.message = "Votre modification semble etre invalide";
			} else {
				this.message = "";
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
			}
		},
	},
};
</script>

<style scoped>
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url("../assets/post-jumbotron.jpg");
}
</style>
