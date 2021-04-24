<template>
	<header>
		<div>
			<b-navbar toggleable="lg" type="light" variant="light">
				<b-navbar-brand to="/"><img src="/images/icon-left-font-monochrome-black.png" height="25" alt="Logo Groupomania"/></b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav>
						<b-nav-item class="nav-link" to="/">Accueil</b-nav-item>
						<b-nav-item class="nav-link" to="/discussions">Discussions</b-nav-item>
						<b-nav-item class="nav-link" to="/medias">Médias & Gif</b-nav-item>
					</b-navbar-nav>

					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto" v-if="connected">
						<b-nav-item-dropdown :text="this.$user.prenom + ' ' + this.$user.nom" right>
							<b-dropdown-item to="/profil">Profil</b-dropdown-item>
							<b-dropdown-item @click="disconnect()">Déconnexion</b-dropdown-item>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</div>
	</header>
</template>

<script>
import checkConnected from "@/mixins/checkConnected";

export default {
	name: "navBar",
	mixins: [checkConnected],

	methods: {
		disconnect() {
			localStorage.removeItem("user");
			location.href = "/";
		},
	},
};
</script>
