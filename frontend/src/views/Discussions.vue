<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Dernières discussions</h1>
		</b-jumbotron>
		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2">
						<div class="mb-3">
							<b-button id="show-btn" variant="primary" block @click="showModal">Créer une discussion</b-button>

							<b-modal ref="my-modal" hide-footer title="Créer une discussion">
								<div class="d-block text-center">
									<b-form @submit="onSubmit" v-if="show">
										<b-form-textarea id="textarea" v-model="text" placeholder="Que voulez-vous dire ?" rows="3" max-rows="6"></b-form-textarea>

										<pre class="mb-0">{{ text }}</pre>
									</b-form>
								</div>
								<b-button class="mt-3" type="submit" variant="primary" block @click="hideModal">Publier</b-button>
							</b-modal>
						</div>
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import Post from "@/components/Post.vue";

export default {
	name: "Discussions",
	components: {
		Post,
	},
	data() {
		return {
			form: {
				text: "",
			},
			show: true,
		};
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			alert(JSON.stringify(this.form));
		},
		showModal() {
			this.$refs["my-modal"].show();
		},
		hideModal() {
			this.$refs["my-modal"].hide();
		},
		toggleModal() {
			// We pass the ID of the button that we want to return focus to
			// when the modal has hidden
			this.$refs["my-modal"].toggle("#toggle-btn");
		},
	},
};
</script>

<style scoped lang="scss">
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/discussions-jumbotron.jpg");
	background-size: cover;
}
</style>
