<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>Profil de {{ this.$user.prenom }} {{ this.$user.nom }}</h1>
		</b-jumbotron>
		<main>
			<b-container>
				<b-row>
					<b-col lg="9" xl="8" class="mx-auto" v-if="connected">
						<div class="mb-3">
							<div class="mb-3" v-if="modify == false">
								<b-list-group>
									<b-list-group-item>Prenom : {{ this.$user.prenom }}</b-list-group-item>
									<b-list-group-item>Nom : {{ this.$user.nom }}</b-list-group-item>
									<b-list-group-item>Email : {{ this.$user.email }}</b-list-group-item>
									<b-list-group-item v-if="this.$user.admin == 1">Admin : Vous etes modérateur</b-list-group-item>
								</b-list-group>
							</div>

							<UserForm
								v-if="modify"
								:prenomLabel="'Prenom actuel : ' + this.$user.prenom"
								:prenomPlaceholder="'Entrez votre prenom (optionnel)'"
								:prenomRequired="false"
								:nomLabel="'Nom actuel : ' + this.$user.nom"
								:nomPlaceholder="'Entrez votre nom (optionnel)'"
								:nomRequired="false"
								:emailLabel="'Email actuel : ' + this.$user.email"
								:emailPlaceholder="'Entrez votre email (optionnel)'"
								:emailRequired="false"
								:passwordLabel="'Mot de passe :'"
								:passwordPlaceholder="'Entrez votre mot de passe (optionnel)'"
								:passwordRequired="false"
								:passwordcheckLabel="'Vérification du mot de passe :'"
								:passwordcheckPlaceholder="'Entrez votre mot de passe'"
								:passwordcheckRequired="false"
								:avatarLabel="'Avatar : (optionnel)'"
								:avatarPlaceholder="'Choisissez ou glissez votre fichier ici... (optionnel)'"
								:avatarDropPlaceholder="'Glissez votre fichier ici... (optionnel)'"
								:adminLabel="'Code admin : (optionnel)'"
								:adminPlaceholder="'Entrez votre code admin (optionnel)'"
								:submitButton="'Publier les modifications'"
							/>
							<b-button class="mb-3" variant="danger" v-if="modify" @click="modify = false">Annuler les modifications</b-button>
							<div v-if="!modify">
								<div>
									<b-button class="mb-3" variant="primary" @click="modify = true">Modifier</b-button>
								</div>
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
import onFileUpload from "@/mixins/onFileUpload";
import UserForm from "@/components/UserForm";
import checkConnected from "@/mixins/checkConnected";

export default {
	name: "Profil",
	mixins: [checkConnected, onFileUpload],
	components: {
		UserForm,
	},

	data() {
		return {
			modify: false,
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
	},
};
</script>

<style scoped>
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url("../assets/profil-jumbotron.jpg");
	background-position: unset !important;
}
</style>
