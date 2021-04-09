<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Dernières discussions</h1>
		</b-jumbotron>
		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2" v-if="connected">
						<div class="mb-3">
							<b-button variant="primary" block @click="toggleModal">Créer une discussion</b-button>

							<b-modal ref="post-modal" hide-footer title="Créer une discussion">
								<div class="d-block text-center">
									<b-form @submit.prevent="onSubmit()">
										<b-form-textarea id="textarea" v-model="content" placeholder="Que voulez-vous dire ?" rows="3" max-rows="6" required></b-form-textarea>

										<b-button class="mt-3" variant="primary" type="submit" block>Publier</b-button>
									</b-form>
								</div>
							</b-modal>
						</div>
						<Post :posts="posts" />
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import axios from "axios";
import Post from "@/components/Post.vue";

export default {
	name: "Discussions",
	components: {
		Post,
	},
	data() {
		return {
			text: "",
			show: true,
			connected: false,
			content: "",
			posts: [],
		};
	},
	methods: {
		// Form
		onSubmit() {
			let userId = this.$user.userId;
			let content = this.content;
			axios
				.post(
					`http://localhost:3000/api/posts/`,
					{
						userId,
						content,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${this.$token}`,
						},
					}
				)
				.then(
					this.toggleModal(),
					setTimeout(() => {
						(this.content = ""), this.getAllPosts();
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
					this.posts = res.data;
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
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/discussions-jumbotron.jpg");
	background-size: cover;
}
</style>
