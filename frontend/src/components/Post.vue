<template>
	<div>
		<article v-for="post in posts" :key="post.id">
			<div v-if="post.postImage === null">
				<b-card class="mb-3" :liked="liked" :disliked="disliked">
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
							<b-button v-b-toggle="'accordion-' + post.id" class="m-1">
								<b-icon icon="chat-left-text" aria-label="Commentaires"></b-icon>
								<span class="pl-1" v-if="post.comments.length > 0"> {{ post.comments.length }}</span>
							</b-button>
						</b-col>
						<b-col cols="6" class="text-right" v-if="post.disliked != 1 && post.liked != 1">
							<b-button href="#" variant="primary" @click="addThumb(post.id, 1)"><b-icon icon="hand-thumbs-up" aria-label="Like"></b-icon> {{ post.likes }} </b-button>
							<b-button href="#" variant="danger" class="m-1" @click="addThumb(post.id, -1)"><b-icon icon="hand-thumbs-down" aria-label="Dislike"></b-icon> {{ post.dislikes }}</b-button>
						</b-col>
						<b-col cols="6" class="text-right" v-if="post.liked == 1">
							<b-button href="#" variant="primary" @click="deleteThumb(post.id, -1)"><b-icon icon="hand-thumbs-up" aria-label="Like"></b-icon> {{ post.likes }}</b-button>
							<b-button href="#" variant="danger" class="m-1" disabled><b-icon icon="hand-thumbs-down" aria-label="Dislike"></b-icon> {{ post.dislikes }}</b-button>
						</b-col>
						<b-col cols="6" class="text-right" v-if="post.disliked == 1">
							<b-button href="#" variant="primary" disabled><b-icon icon="hand-thumbs-up" aria-label="Like"></b-icon> {{ post.likes }}</b-button>
							<b-button href="#" variant="danger" class="m-1" @click="deleteThumb(post.id, 1)"><b-icon icon="hand-thumbs-down" aria-label="Dislike"></b-icon> {{ post.dislikes }}</b-button>
						</b-col>
					</b-row>

					<!-- Element to collapse -->
					<b-collapse :id="'accordion-' + post.id" :visible="visible" accordion="my-accordion" role="tabpanel">
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
						<div v-if="post.comments.length > 0">
							<b-card v-for="comment in post.comments" :key="comment.id">
								<div class="text-left">
									<b-button variant="outline-danger" class="float-right btn-sm" @click="$bvModal.show('modal-comment-' + post.id + comment.id)" v-if="comment.userId == $user.userId || $user.admin == 1">
										<b-icon icon="Trash" aria-label="Delete"></b-icon>
									</b-button>

									<b-modal :id="'modal-comment-' + post.id + comment.id">
										<template #modal-header="{ }">
											<h5>Confirmation de la suppression</h5>
										</template>
										<template>
											<p>Etes-vous sûr de vouloir supprimer ce commentaire ?</p>
										</template>

										<template #modal-footer="{ ok, cancel }">
											<b-button size="sm" variant="danger" @click="deleteComment(comment.id), ok()">Supprimer</b-button>
											<b-button size="sm" @click="cancel()">Annuler</b-button>
										</template>
									</b-modal>

									<b-avatar class="" href="#bar" src="https://placekitten.com/300/300"></b-avatar>
									<span> {{ comment.prenom }} {{ comment.nom }}</span>
									<span class="post-date"> - publié le {{ dateFormat(comment.date) }}</span>
									<b-card-text class="text-justify mt-3">{{ comment.content }}</b-card-text>
								</div>
							</b-card>
						</div>
					</b-collapse>
				</b-card>
			</div>
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
		visible: {
			type: Boolean,
		},
	},

	data() {
		return {
			liked: false,
			disliked: false,
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

		//Thumbs
		addThumb(postId, thumb) {
			const userId = this.$user.userId;
			axios
				.put(
					`http://localhost:3000/api/thumbs/${postId}`,
					{
						userId,
						thumb,
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
				});
		},
		deleteThumb(postId, thumb) {
			const userId = this.$user.userId;
			axios
				.put(
					`http://localhost:3000/api/thumbs/${postId}/delete-thumb`,
					{
						userId,
						thumb,
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
		deleteComment(commentId) {
			axios
				.delete(`http://localhost:3000/api/comments/${commentId}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.$token}`,
					},
				})
				.then(() => {
					this.getPosts();
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
