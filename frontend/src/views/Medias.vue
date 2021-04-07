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
							<b-button id="show-btn" variant="primary" block @click="showModal">Partager une image</b-button>

							<b-modal ref="my-modal" hide-footer title="Partager une image">
								<div class="d-block text-center">
									<b-form-file
										v-model="file1"
										:state="Boolean(file1)"
										placeholder="Choisissez ou glissez votre fichier ici..."
										drop-placeholder="Glissez votre fichier ici..."
										accept="image/jpeg, image/png, image/gif"
										browse-text="Choisir"
										class="text-left"
									></b-form-file>
									<b-form-textarea id="textarea" v-model="text" placeholder="Que voulez-vous dire ?" rows="3" max-rows="6"></b-form-textarea>
									<b-form @submit="onSubmit" v-if="show">
										<pre class="mb-0">{{ text }}</pre>
									</b-form>
								</div>
								<b-button class="mt-3" type="submit" variant="primary" block @click="hideModal">Publier</b-button>
							</b-modal>
						</div>
						<PostMedia />
						<PostMedia />
						<PostMedia />
						<PostMedia />
						<PostMedia />
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/medias-jumbotron.jpg");
	background-size: cover;
}
</style>
