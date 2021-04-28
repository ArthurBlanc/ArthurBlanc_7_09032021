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
							<div class="mb-3" v-if="modify == false">
								<b-list-group>
									<b-list-group-item>Prenom : {{ this.$user.prenom }}</b-list-group-item>
									<b-list-group-item>Nom : {{ this.$user.nom }}</b-list-group-item>
									<b-list-group-item>Email : {{ this.$user.email }}</b-list-group-item>
								</b-list-group>
							</div>

							<b-form @submit.prevent="userForm()" v-if="modify">
								<b-form-row>
									<div class="col">
										<b-form-group id="input-group-prenom" :label="'Prenom actuel : ' + this.$user.prenom" label-for="signup-prenom">
											<b-form-input id="signup-prenom" v-model="form.prenom" type="text" placeholder="Entrez votre prenom"></b-form-input>
										</b-form-group>
									</div>
									<div class="col">
										<b-form-group id="input-group-nom" :label="'Nom actuel : ' + this.$user.nom" label-for="signup-nom">
											<b-form-input id="signup-nom" v-model="form.nom" type="text" placeholder="Entrez votre nom"></b-form-input>
										</b-form-group>
									</div>
								</b-form-row>
								<b-form-group id="input-group-email" :label="'Email actuel : ' + this.$user.email" label-for="signup-email">
									<b-form-input id="signup-email" v-model="form.email" type="email" placeholder="Entrez votre email (optionnel)"></b-form-input>
								</b-form-group>
								<b-form-row>
									<div class="col">
										<b-form-group id="input-group-password" label="Mot de passe :" label-for="signup-password">
											<b-form-input id="signup-password" v-model="form.password" type="password" placeholder="Entrez votre mot de passe (optionnel)"></b-form-input>
										</b-form-group>
									</div>

									<div class="col">
										<b-form-group id="input-group-password-check" label="Vérification du mot de passe :" label-for="signup-password-check">
											<b-form-input id="signup-password-check" v-model="form.passwordCheck" type="password" placeholder="Entrez votre mot de passe"></b-form-input>
										</b-form-group>
									</div>
									<small tabindex="-1" class="form-text text-muted">Il doit contenir au moins 8 caractères dont au moins une minuscule, une majuscule, un chiffre et un caractère spécial.</small>
								</b-form-row>

								<b-form-group id="input-group-avatar" label="Avatar : (optionnel)" label-for="signup-avatar" class="mt-3">
									<b-form-file
										placeholder="Choisissez ou glissez votre fichier ici... (optionnel)"
										drop-placeholder="Glissez votre fichier ici... (optionnel)"
										accept="image/jpeg, image/png, image/gif"
										browse-text="Choisir"
										class="text-left"
										@change="onFileUpload"
									></b-form-file>
								</b-form-group>

								<b-form-group id="input-group-admin" label="Code admin : (optionnel)" label-for="signup-admin" description="Si vous etes administrateur, veuillez entrez votre code admin">
									<b-form-input id="signup-admin" v-model="form.admin" type="text" placeholder="Entrez votre code admin (optionnel)"></b-form-input>
								</b-form-group>

								<b-alert show variant="danger" v-if="message != ''">{{ message }}</b-alert>

								<b-button type="submit" variant="primary" class="mb-3">Publier les modifications</b-button>
							</b-form>

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

export default {
	name: "Profil",
	mixins: [onFileUpload],

	data() {
		return {
			message: "",
			connected: false,
			modify: false,
			form: {
				prenom: "",
				nom: "",
				password: "",
				passwordCheck: "",
				admin: "",
			},
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

		userForm() {
			let userId = this.$user.userId;
			let prenom = this.form.prenom;
			let nom = this.form.nom;
			let email = this.form.email;
			let password = this.form.password;
			const passwordCheck = this.form.passwordCheck;
			let admin = this.form.admin;
			let checkAdmin = false;
			let checkEmail = false;
			const formData = new FormData();
			if (prenom === undefined || prenom.length === 0) {
				prenom = this.$user.prenom;
			} else {
				formData.append("prenom", prenom);
			}
			if (nom === undefined || nom.length === 0) {
				nom = this.$user.nom;
			} else {
				formData.append("nom", nom);
			}
			if (email === undefined || email.length === 0) {
				email = this.$user.email;
				checkEmail = true;
			} else if (email == this.$user.email) {
				this.message = "Email déjà utilisé";
			} else {
				formData.append("email", email);
				checkEmail = true;
			}
			if (password != undefined || password.length != 0) {
				formData.append("password", password);
			}
			if (this.FILE != null) {
				formData.append("image", this.FILE, this.FILE.name);
			}
			if (admin === "admin") {
				formData.append("admin", 1);
				admin = 1;
				checkAdmin = true;
			} else if (admin === "0") {
				formData.append("admin", 0);
				admin = 0;
				checkAdmin = true;
			} else if (admin === undefined || admin.length === 0) {
				formData.append("admin", this.$user.admin);
				admin = this.$user.admin;
				checkAdmin = true;
			} else {
				this.message = "Le code admin saisi est invalide";
			}
			if (password === passwordCheck && checkAdmin === true && checkEmail === true) {
				axios
					.put(`http://localhost:3000/api/auth/modify_user/${userId}`, formData, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${this.$token}`,
						},
					})
					.then(() => {
						let user = JSON.parse(localStorage.getItem("user"));
						const token = user.token;
						localStorage.setItem("user", JSON.stringify({ userId: userId, nom: nom, prenom: prenom, admin: admin, token: token, email: email }));
						location.reload();
					})
					.catch((error) => {
						if (error.response.status === 401) {
							this.message = error.response.data.message;
						}
					});
			} else if (password != passwordCheck) {
				this.message = "Les mots de passe saisis ne correspondent pas";
			}
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
