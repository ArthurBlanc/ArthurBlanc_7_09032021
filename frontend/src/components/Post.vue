<template>
	<div>
		<div class="mb-3">
			<b-button v-if="$route.name != 'Post'" id="toggle-post-modal" variant="primary" block @click="toggleModal">{{ postButton }}</b-button>

			<b-modal ref="post-modal" hide-footer :title="postButton">
				<div class="d-block text-center">
					<b-form @submit.prevent="onSubmit()">
						<b-form-file
							v-if="$route.name != 'Discussions'"
							placeholder="Choisissez ou glissez votre fichier ici..."
							drop-placeholder="Glissez votre fichier ici..."
							accept="image/jpeg, image/png, image/gif"
							browse-text="Choisir"
							class="text-left"
							@change="onFileUpload"
							:required="imageRequired"
						></b-form-file>

						<b-form-textarea
							id="textarea"
							v-model="content"
							placeholder="Que voulez-vous dire ?"
							rows="3"
							max-rows="6"
							maxlength="512"
							aria-label="Formulaire publication"
							:required="textRequired"
						></b-form-textarea>

						<b-alert class="mt-3" show variant="danger" v-if="message != ''">{{ message }}</b-alert>

						<b-button class="mt-3" variant="primary" type="submit" block>Publier</b-button>
					</b-form>
				</div>
			</b-modal>
		</div>

		<article v-for="post in posts" :key="post.id">
			<img v-if="post.postImage != null" :src="'/images/uploads/' + post.postImage" :alt="'Photo de la publication n°' + post.id + ' de ' + post.prenom + ' ' + post.nom" class="card-img" />
			<b-card class="mb-3" :liked="liked" :disliked="disliked">
				<b-button variant="outline-danger" class="float-right btn-sm" aria-label="Supprimer la publication" v-if="post.userId == $user.userId || $user.admin == 1" @click="$bvModal.show('delete-post-' + post.id)">
					<b-icon icon="Trash" aria-label="Delete"></b-icon>
				</b-button>
				<div class="text-left offset-1">
					<b-avatar class="float-left" :src="'/images/uploads/' + post.userImage" :alt="'Avatar de ' + post.prenom + ' ' + post.nom"></b-avatar>
					<b-row>
						<b-col cols="12" lg="auto" class="pr-lg-1">
							<span> {{ post.prenom }} {{ post.nom }}</span>
						</b-col>
						<b-col lg="auto" class="px-0 d-none d-lg-block">
							<span class="post-date"> - </span>
						</b-col>
						<b-col cols="12" lg="auto" class="pl-lg-1">
							<span class="post-date">le {{ dateFormat(post.date) }}</span>
						</b-col>
					</b-row>

					<b-modal :id="'delete-post-' + post.id">
						<template #modal-header="{}">
							<h5>Confirmation de la suppression</h5>
						</template>
						<template>
							<p>Etes-vous sûr de vouloir supprimer cette publication ?</p>
						</template>

						<template #modal-footer="{ ok, cancel }">
							<b-button size="sm" variant="danger" aria-label="Confirmer la suppression de la publication" @click="deleteOnePost(post.id), ok()">Supprimer</b-button>
							<b-button size="sm" aria-label="Annuler la suppression de la publication" @click="cancel()">Annuler</b-button>
						</template>
					</b-modal>
				</div>

				<b-card-text class="text-justify mt-3">
					<h2>{{ post.content }}</h2>
				</b-card-text>

				<b-row>
					<b-col cols="6" class="text-left">
						<b-button v-if="$route.name !== 'Post'" :to="{ name: 'Post', params: { id: post.id } }" aria-label="Page de la publication"
							><b-icon icon="three-dots-vertical" aria-label="Info"></b-icon
						></b-button>
						<b-button v-b-toggle="'accordion-' + post.id" class="m-1" aria-label="Commentaires">
							<b-icon icon="chat-left-text"></b-icon>
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
								<b-col cols="2" md="1" class="pr-0">
									<b-avatar :src="'/images/uploads/' + post.userImage" :alt="'Avatar de ' + $user.prenom + ' ' + $user.nom"></b-avatar>
								</b-col>
								<b-col>
									<b-form @submit.prevent="createComment(post.id)">
										<b-form-input
											:id="'new-comment-' + post.id"
											v-model="commentContent"
											aria-label="Ecrivez votre commentaire"
											placeholder="Ecrivez votre commentaire"
											minlength="1"
											maxlength="256"
											required
										></b-form-input>
										<b-button type="submit" id="send-comment" style="display:none" tabindex="-1">Envoyer</b-button>
									</b-form>
								</b-col>
							</b-row>
						</div>
						<b-alert class="mt-3" show variant="danger" v-if="messageComment != ''">{{ messageComment }}</b-alert>
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

								<b-avatar :src="'/images/uploads/' + comment.image" :alt="'Avatar de ' + comment.prenom + ' ' + comment.nom"></b-avatar>
								<span> {{ comment.prenom }} {{ comment.nom }}</span>
								<span class="post-date"> - publié le {{ dateFormat(comment.date) }}</span>
								<b-card-text class="text-justify mt-3">{{ comment.content }}</b-card-text>
							</div>
						</b-card>
					</div>
				</b-collapse>
			</b-card>
		</article>
	</div>
</template>

<script>
import axios from "axios";
import onFileUpload from "@/mixins/onFileUpload";

export default {
	name: "post",
	mixins: [onFileUpload],
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
		imageRequired: {
			type: Boolean,
		},
		textRequired: {
			type: Boolean,
		},
		postButton: {
			type: String,
		},
	},

	data() {
		return {
			message: "",
			messageComment: "",
			liked: false,
			disliked: false,
			content: "",
			commentContent: "",
		};
	},

	mounted() {
		if (localStorage.user != undefined) {
			this.getPosts();
		}
	},

	methods: {
		dateFormat(date) {
			const event = new Date(date);
			const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
			return event.toLocaleDateString("fr-FR", options);
		},
		toggleModal() {
			this.$refs["post-modal"].toggle("#toggle-post-modal");
			this.message = "";
		},

		// Form
		onSubmit() {
			const formData = new FormData();
			const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'\-()%:/]*$/;
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
			} else if ((this.content != "") & (this.content.length < 3)) {
				this.message = "Votre publication doit contenir au minimum 3 caractères";
			} else if ((this.content != "") & !regex.test(this.content)) {
				this.message = "Votre publication semble etre invalide";
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
							(this.content = ""), (this.FILE = null), this.getPosts();
						}, 200)
					);
			}
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
			const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'\-()%:/]*$/;
			if (!regex.test(content)) {
				this.messageComment = "Votre commentaire semble etre invalide";
			} else {
				this.messageComment = "";
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
			}
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
