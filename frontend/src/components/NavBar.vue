<template>
	<header>
		<div>
			<b-navbar toggleable="lg" type="light" variant="light">
				<b-navbar-brand href="/"><img src="/images/icon-left-font-monochrome-black.png" height="25" alt="Logo Groupomania"/></b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav>
						<b-nav-item href="#"><router-link class="nav-link" to="/">Accueil</router-link></b-nav-item>
						<b-nav-item href="#"><router-link class="nav-link" to="/discussions">Discussions</router-link></b-nav-item>
						<b-nav-item href="#"><router-link class="nav-link" to="/medias">Médias & Gif</router-link></b-nav-item>
					</b-navbar-nav>

					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto">
						<b-nav-item-dropdown right>
							<!-- Using 'button-content' slot -->
							<template #button-content>
								<em>Username</em>
							</template>
							<b-dropdown-item href="#">Profil</b-dropdown-item>
							<b-dropdown-item href="#">Déconnexion</b-dropdown-item>
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
