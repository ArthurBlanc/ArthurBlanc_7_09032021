<!--COMPONENT AFFICHANT LE FOOTER, PRESENT SUR TOUTES LES PAGES-->

<template>
	<footer class="page-footer bg-dark shadow">
		<b-container class="text-center">
			<b-row>
				<b-col cols="4" class="mx-auto mt-3">
					<a class="h5 text-light font-weight-bold text-uppercase" href="#">A propos</a>
				</b-col>
				<b-col cols="4" class="mx-auto mt-3">
					<a class="h5 text-light font-weight-bold text-uppercase" href="mailto:admin@groupomania.fr">Contacter un administrateur</a>
				</b-col>
				<b-col cols="4" class="mx-auto mt-3">
					<a class="h5 text-light font-weight-bold text-uppercase" href="#">CGU</a>
				</b-col>
			</b-row>
		</b-container>

		<div class="footer-copyright text-center py-3 text-light">
			<span>Site réalisé par </span>
			<a class="footer-dev-name" href="https://github.com/ArthurBlanc/">Arthur BLANC</a>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer",
};
</script>
