import Vue from "vue";
import VueRouter from "vue-router";
import Accueil from "../views/Accueil.vue";
import Discussions from "../views/Discussions.vue";
import Medias from "../views/Medias.vue";
import Signup from "../views/Signup.vue";

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
		path: "/signup",
		name: "Signup",
		component: Signup,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
