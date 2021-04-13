<template>
	<div>
		<article v-for="post in posts" :key="post.id">
			<b-card class="mb-3">
				<div class="text-left offset-1">
					<b-avatar class="" href="#bar" src="https://placekitten.com/300/300"></b-avatar>
					<span> {{ post.prenom }} {{ post.nom }}</span>
					<span class="post-date"> - publié le {{ dateFormat(post.date) }}</span>
					<b-button variant="outline-danger" class="float-right btn-sm" v-if="post.userId == $user.userId || $user.admin == 1" @click="$bvModal.show('delete-post-' + post.id)">
						<b-icon icon="Trash" aria-label="Delete"></b-icon>
					</b-button>
					<b-modal :id="'delete-post-' + post.id">
						<template #modal-header="{}">
							<h5>Confirmation de la suppression</h5>
						</template>
						<template>
							<p>Etes-vous sûr de vouloir supprimer cette publication ?</p>
						</template>

						<template #modal-footer="{ ok, cancel }">
							<b-button size="sm" variant="danger" @click="deleteOnePost(post.id), ok()">Supprimer</b-button>
							<b-button size="sm" @click="cancel()">Annuler</b-button>
						</template>
					</b-modal>
				</div>

				<b-card-text class="text-justify mt-3">
					<h2>{{ post.content }}</h2>
				</b-card-text>

				<b-row>
					<b-col cols="6" class="text-left">
						<b-button v-if="$route.name !== 'Post'" :to="{ name: 'Post', params: { id: post.id } }"><b-icon icon="three-dots-vertical" aria-label="Info"></b-icon></b-button>
						<b-button v-b-toggle.collapse-2 class="m-1"><b-icon icon="chat-left-text" aria-label="Commentaires"></b-icon></b-button>
					</b-col>
					<b-col cols="6" class="text-right">
						<b-button href="#" variant="primary"><b-icon icon="hand-thumbs-up" aria-label="Like"></b-icon> 1</b-button>
						<b-button href="#" variant="danger" class="m-1"><b-icon icon="hand-thumbs-down" aria-label="Dislike"></b-icon> 0</b-button>
					</b-col>
				</b-row>
				<!-- Element to collapse -->
				<b-collapse id="collapse-2">
					<b-card class="post-comment">
						<div class="text-left">
							<b-row>
								<b-col lg="1" cols="2" class="pr-0">
									<b-avatar class="" href="#bar" src="https://placekitten.com/300/300"></b-avatar>
								</b-col>
								<b-col lg="11" cols="10">
									<b-form @submit.prevent="createComment(post.id)">
										<b-form-input v-model="commentContent" placeholder="Ecrivez votre commentaire" required></b-form-input>
										<b-button type="submit" id="send-comment" style="display:none" tabindex="-1">Envoyer</b-button>
									</b-form>
								</b-col>
							</b-row>
						</div>
					</b-card>
				</b-collapse>
			</b-card>
		</article>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "post",

	props: {
		getPosts: {
			type: Function,
		},
		posts: {
			type: Array,
		},
	},

	data() {
		return {
			commentContent: "",
		};
	},

	methods: {
		dateFormat(date) {
			const event = new Date(date);
			const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
			return event.toLocaleDateString("fr-FR", options);
		},

		// Post
		deleteOnePost(postId) {
			axios
				.delete(`http://localhost:3000/api/posts/${postId}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.$token}`,
					},
				})
				.then(() => {
					if (this.$route.name == "Post") {
						this.$router.replace("/");
					} else {
						this.getPosts();
					}
				});
		},

		//Comments
		createComment(postId) {
			const userId = this.$user.userId;
			const content = this.commentContent;
			axios
				.post(
					`http://localhost:3000/api/comments/${postId}`,
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
				.then(() => {
					this.getPosts();
					this.commentContent = "";
					document.activeElement.blur();
				});
		},
	},
};
</script>
<style scoped lang="scss">
article h2 {
	font-size: 1.5rem;
}
.post-comment .form-control:invalid {
	border-color: #ced4da;
	box-shadow: none;
}
.post-date {
	font-style: italic;
	color: grey;
}
</style>
