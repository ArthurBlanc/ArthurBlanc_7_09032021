import Vue from "vue";
import VueRouter from "vue-router";
import Accueil from "../views/Accueil.vue";
import Discussions from "../views/Discussions.vue";
import Medias from "../views/Medias.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Profil from "../views/Profil.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Accueil",
		component: Accueil,
	},
	{
		path: "/discussions",
		name: "Discussions",
		component: Discussions,
	},
	{
		path: "/medias",
		name: "Médias",
		component: Medias,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/signup",
		name: "Signup",
		component: Signup,
	},
	{
		path: "/profil",
		name: "Profil",
		component: Profil,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
