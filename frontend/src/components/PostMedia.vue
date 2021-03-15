<template>
	<div>
		<b-card class="mb-3" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" tag="article">
			<div class="text-left offset-1">
				<b-avatar class="" href="#bar" src="https://placekitten.com/300/300"></b-avatar>
				admin <span style="font-style: italic;color: grey;">- publié le 10/03/2021 à 10h53</span>
				<b-button href="#" variant="outline-danger" class="float-right btn-sm"><b-icon icon="Trash" aria-label="Delete"></b-icon></b-button>
			</div>
			<b-card-text class="text-justify mt-3">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</b-card-text>

			<PostBottomButton />

			<!-- Element to collapse -->
			<b-collapse id="collapse-2">
				<Comment />
			</b-collapse>
		</b-card>
	</div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import PostBottomButton from "@/components/PostBottomButton";

export default {
	name: "postMedia",
	components: {
		Comment,
		PostBottomButton,
	},
};
</script>
