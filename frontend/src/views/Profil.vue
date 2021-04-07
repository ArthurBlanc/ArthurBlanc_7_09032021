<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Profil de {{ this.$user.prenom }} {{ this.$user.nom }}</h1>
		</b-jumbotron>
		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2" v-if="connected">
						<div class="mb-3">
							<div class="mb-3">
								<b-list-group>
									<b-list-group-item>Prenom : {{ this.$user.prenom }}</b-list-group-item>
									<b-list-group-item>Nom : {{ this.$user.nom }}</b-list-group-item>
									<b-list-group-item>Email : {{ this.$user.email }}</b-list-group-item>
								</b-list-group>
							</div>

							<div>
								<div>
									<b-button variant="danger" @click="$bvModal.show('modal-comment-')">
										<span>Supprimer le compte</span>

										<b-modal :id="'modal-comment-'">
											<template #modal-header="{ }">
												<h5>Confirmation de la suppression</h5>
											</template>
											<template>
												<p>Etes-vous sûr de vouloir supprimer ce compte ?</p>
											</template>

											<template #modal-footer="{ ok, cancel }">
												<b-button size="sm" variant="danger" @click="deleteUser(), ok()">Supprimer</b-button>
												<b-button size="sm" @click="cancel()">Annuler</b-button>
											</template>
										</b-modal>
									</b-button>
								</div>
							</div>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Profil",

	data() {
		return {
			connected: false,
		};
	},

	methods: {
		deleteUser() {
			const userId = this.$user.userId;
			axios
				.delete(`http://localhost:3000/api/auth/delete_user/${userId}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.$token}`,
					},
				})
				.then(() => {
					localStorage.removeItem("user");
					location.href = "/";
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
};
</script>

<style scoped>
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/accueil-jumbotron.jpg");
	background-size: cover;
}
</style>
