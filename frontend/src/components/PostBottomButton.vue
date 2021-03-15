<template>
	<div>
		<b-row>
			<b-col cols="6" class="text-left">
				<b-button href="#"><b-icon icon="exclamation-circle" aria-label="Help"></b-icon></b-button>
				<b-button v-b-toggle.collapse-2 class="m-1"><b-icon icon="chat-left-text" aria-label="Commentaires"></b-icon> 2</b-button>
			</b-col>
			<b-col cols="6" class="text-right">
				<b-button href="#" variant="primary"><b-icon icon="hand-thumbs-up" aria-label="Like"></b-icon> 1</b-button>
				<b-button href="#" variant="danger" class="m-1"><b-icon icon="hand-thumbs-down" aria-label="Dislike"></b-icon> 0</b-button>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	name: "PostBottomButton",
};
</script>
