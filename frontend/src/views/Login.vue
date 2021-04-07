<template>
	<div id="main">
		<b-jumbotron container-fluid="true" class="bg-cover text-white">
			<h1>
				Connectez-vous pour accéder <br />
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
									<b-nav-item to="/" class="text-white" active>Se connecter</b-nav-item>
									<b-nav-item to="/signup">S'inscrire</b-nav-item>
								</b-nav>
							</nav>
							<b-form @submit.prevent="login()">
								<b-form-group id="input-group-email" label="Email :" label-for="login-email">
									<b-form-input id="login-email" v-model="form.email" type="email" placeholder="Entrez votre email" required></b-form-input>
								</b-form-group>
								<b-form-group id="input-group-password" label="Mot de passe :" label-for="login-password">
									<b-form-input id="login-password" v-model="form.password" type="password" placeholder="Entrez votre mot de passe" required></b-form-input>
								</b-form-group>

								<b-alert show variant="danger" v-if="message != ''">{{ message }}</b-alert>

								<b-button type="submit" variant="primary">Connexion</b-button>
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

export default {
	name: "Profil",

	data() {
		return {
			message: "",
			form: {
				email: "",
				password: "",
			},
		};
	},

	methods: {
		checkConnected() {
			if (localStorage.user == undefined) {
				this.connected = false;
			} else if (localStorage.user !== undefined) {
				this.connected = true;
			}
		},
		login() {
			const email = this.form.email;
			const password = this.form.password;

			axios
				.post(
					`http://localhost:3000/api/auth/login`,
					{
						email,
						password,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((res) => {
					let userData = res.data;
					localStorage.setItem("user", JSON.stringify(userData));
					location.href = "/";
				})
				.catch((error) => {
					if (error.response.status === 404) {
						this.message = "Utilisateur inconnu.";
					}
					if (error.response.status === 401) {
						this.message = "Email ou mot de passe invalide.";
					}
					if (error.response.status === 500) {
						this.message = "Erreur serveur.";
					}
				});
		},
	},
};
</script>

<style scoped>
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("../assets/accueil-jumbotron.jpg");
	background-size: cover;
}
</style>
