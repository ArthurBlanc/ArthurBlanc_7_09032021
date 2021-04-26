<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>
				Créez votre compte pour accéder <br />
				au réseau social de Groupomania !
			</h1>
		</b-jumbotron>
		<main>
			<b-container>
				<b-row>
					<b-col md="8" offset-md="2">
						<div class="mb-3">
							<nav>
								<b-nav pills align="center" class="mb-3">
									<b-nav-item to="/">Se connecter</b-nav-item>
									<b-nav-item to="/signup" class="text-white" active>S'inscrire</b-nav-item>
								</b-nav>
							</nav>
							<b-form @submit.prevent="userForm()">
								<b-form-row>
									<div class="col">
										<b-form-group id="input-group-prenom" label="Prenom :" label-for="signup-prenom">
											<b-form-input id="signup-prenom" v-model="form.prenom" type="text" placeholder="Entrez votre prenom" required></b-form-input>
										</b-form-group>
									</div>
									<div class="col">
										<b-form-group id="input-group-nom" label="Nom :" label-for="signup-nom">
											<b-form-input id="signup-nom" v-model="form.nom" type="text" placeholder="Entrez votre nom" required></b-form-input>
										</b-form-group>
									</div>
								</b-form-row>
								<b-form-group id="input-group-email" label="Email :" label-for="signup-email">
									<b-form-input id="signup-email" v-model="form.email" type="email" placeholder="Entrez votre email" required></b-form-input>
								</b-form-group>
								<b-form-row>
									<div class="col">
										<b-form-group id="input-group-password" label="Mot de passe :" label-for="signup-password">
											<b-form-input id="signup-password" v-model="form.password" type="password" placeholder="Entrez votre mot de passe" required></b-form-input>
										</b-form-group>
									</div>

									<div class="col">
										<b-form-group id="input-group-password-check" label="Vérification du mot de passe :" label-for="signup-password-check">
											<b-form-input id="signup-password-check" v-model="form.passwordCheck" type="password" placeholder="Entrez votre mot de passe" required></b-form-input>
										</b-form-group>
									</div>
									<small tabindex="-1" class="form-text text-muted">Il doit contenir au moins 8 caractères dont au moins une minuscule, une majuscule, un chiffre et un caractère spécial.</small>
								</b-form-row>

								<b-form-group id="input-group-avatar" label="Avatar : (optionnel)" label-for="signup-avatar" class="mt-3">
									<b-form-file
										placeholder="Choisissez ou glissez votre fichier ici..."
										drop-placeholder="Glissez votre fichier ici..."
										accept="image/jpeg, image/png, image/gif"
										browse-text="Choisir"
										class="text-left"
										@change="onFileUpload"
									></b-form-file>
								</b-form-group>

								<b-alert show variant="danger" v-if="message != ''">{{ message }}</b-alert>

								<b-button type="submit" variant="primary" class="mb-3">S'inscrire</b-button>
							</b-form>
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
	name: "Signup",
	mixins: [onFileUpload],

	data() {
		return {
			message: "",
			form: {
				prenom: "",
				nom: "",
				email: "",
				password: "",
				passwordCheck: "",
			},
		};
	},
	methods: {
		userForm() {
			let prenom = this.form.prenom;
			let nom = this.form.nom;
			let email = this.form.email;
			let password = this.form.password;
			const passwordCheck = this.form.passwordCheck;
			const formData = new FormData();
			formData.append("prenom", prenom);
			formData.append("nom", nom);
			formData.append("email", email);
			formData.append("password", password);
			if (this.FILE != null) {
				formData.append("image", this.FILE, this.FILE.name);
			}
			if (password === passwordCheck) {
				axios
					.post(`http://localhost:3000/api/auth/signup`, formData, {
						headers: {
							"Content-Type": "application/json",
						},
					})
					.then((res) => {
						if (res.status === 201) {
							location.href = "/";
						}
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
	},
};
</script>

<style scoped lang="scss">
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/accueil-jumbotron.jpg");
	background-size: cover;
}
</style>
