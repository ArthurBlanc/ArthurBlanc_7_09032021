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

.bg-cover {
	background-size: cover;
	background-position: center;
}

.btn-primary {
	background-color: #0056b3 !important;
	border-color: #0056b3 !important;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
	background-color: #0056b3 !important;
}

.navlink .nav-link {
	color: #0056b3 !important;
}

.post-date {
	color: #595959 !important;
}

.text-user-form {
	color: #474d52;
}

.footer-dev-name {
	color: #cfcfd3;
}
</style>
