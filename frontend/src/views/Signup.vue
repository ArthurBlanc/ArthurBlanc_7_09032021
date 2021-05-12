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
					<b-col lg="9" xl="8" class="mx-auto">
						<div class="mb-3">
							<nav>
								<b-nav pills align="center" class="mb-3">
									<b-nav-item to="/" class="navlink">Se connecter</b-nav-item>
									<b-nav-item to="/signup" class="text-white" active>S'inscrire</b-nav-item>
								</b-nav>
							</nav>
							<UserForm
								:prenomLabel="'Prenom :'"
								:prenomPlaceholder="'Entrez votre prenom'"
								:prenomRequired="true"
								:nomLabel="'Nom :'"
								:nomPlaceholder="'Entrez votre nom'"
								:nomRequired="true"
								:emailLabel="'Email :'"
								:emailPlaceholder="'Entrez votre email'"
								:emailRequired="true"
								:passwordLabel="'Mot de passe :'"
								:passwordPlaceholder="'Entrez votre mot de passe'"
								:passwordRequired="true"
								:passwordcheckLabel="'Vérification du mot de passe :'"
								:passwordcheckPlaceholder="'Entrez votre mot de passe'"
								:passwordcheckRequired="true"
								:avatarLabel="'Avatar : (optionnel)'"
								:avatarPlaceholder="'Choisissez ou glissez votre fichier ici...'"
								:avatarDropPlaceholder="'Glissez votre fichier ici...'"
								:adminLabel="'Code admin : (optionnel)'"
								:adminPlaceholder="'Entrez votre code admin'"
								:submitButton="'S\'incrire'"
							/>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</main>
	</div>
</template>

<script>
import UserForm from "@/components/UserForm";
import onFileUpload from "@/mixins/onFileUpload";

export default {
	name: "Signup",
	mixins: [onFileUpload],
	components: {
		UserForm,
	},
};
</script>

<style scoped lang="scss">
.bg-cover {
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url("../assets/signup-jumbotron.jpg");
}
</style>
