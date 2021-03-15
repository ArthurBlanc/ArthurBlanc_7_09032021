<template>
	<div>
		<b-card class="mb-3">
			<div class="text-left offset-1">
				<b-avatar class="" href="#bar" src="https://placekitten.com/300/300"></b-avatar>
				admin <span style="font-style: italic;color: grey;">- publié le 10/03/2021 à 10h53</span>
				<b-button href="#" variant="outline-danger" class="float-right btn-sm"><b-icon icon="Trash" aria-label="Delete"></b-icon></b-button>
			</div>

			<b-card-text class="text-justify mt-3">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non vulputate dui, in aliquet neque. Donec posuere dignissim mauris, et dignissim lorem tristique nec. Vestibulum arcu leo, cursus
				tincidunt vulputate cursus, malesuada id sapien. Nam mattis libero vel massa suscipit iaculis. Vestibulum porta dolor at justo molestie feugiat. Maecenas a suscipit turpis. Interdum et malesuada fames ac
				ante ipsum primis in faucibus. Fusce convallis eleifend nisl, vel maximus purus pretium id. Integer mattis sapien et fermentum tristique. Quisque cursus suscipit pellentesque. Mauris pellentesque eros
				est, in tristique est molestie et.
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
	name: "post",
	components: {
		Comment,
		PostBottomButton,
	},
};
</script>
