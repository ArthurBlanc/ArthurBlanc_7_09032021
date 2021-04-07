<template>
	<header>
		<div>
			<b-navbar toggleable="lg" type="light" variant="light">
				<b-navbar-brand href="/"><img src="/images/icon-left-font-monochrome-black.png" height="25" alt="Logo Groupomania"/></b-navbar-brand>

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
							<b-dropdown-item href="#">Profil</b-dropdown-item>
							<b-dropdown-item @click="disconnect()">Déconnexion</b-dropdown-item>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</div>
	</header>
</template>

<script>
export default {
	name: "navBar",

	data() {
		return {
			connected: false,
		};
	},

	methods: {
		checkConnected() {
			if (localStorage.user == undefined || this.$route.name == "Login") {
				if (this.$route.name != "Login") {
					this.$router.replace("/login");
				}
				this.connected = false;
			} else if (localStorage.user !== undefined) {
				this.connected = true;
			}
		},
		disconnect() {
			localStorage.removeItem("user");
			location.href = "/";
		},
	},
	created() {
		this.checkConnected();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
