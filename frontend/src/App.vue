<template>
	<div id="app">
		<NavBar />
		<router-view />
		<Footer />
	</div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/NavBar.vue";

export default {
	name: "App",
	components: {
		Footer,
		NavBar,
	},
};
</script>

<style lang="scss">
html,
body,
#app {
	height: 100%;
}

body {
	margin: 0;
}

#main {
	flex: 1 0 auto;
	background-color: #eaeaea;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	display: flex;
	flex-direction: column;
}

#nav {
	padding: 30px;
	background: grey;

	a {
		font-weight: bold;
		color: white;

		&.router-link-exact-active {
			color: blueviolet;
		}
	}
}
</style>
