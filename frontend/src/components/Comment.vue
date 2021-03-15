<template>
	<div>
		<b-card>
			<div class="text-left">
				<b-row>
					<b-col lg="1" cols="2" class="pr-0">
						<b-avatar class="" href="#bar" src="https://placekitten.com/300/300"></b-avatar>
					</b-col>
					<b-col lg="11" cols="10">
						<b-form-input id="input-1" placeholder="Ecrivez votre commentaire" required></b-form-input>
					</b-col>
				</b-row>
			</div>
		</b-card>
		<b-card>
			<div class="text-left">
				<b-button href="#" variant="outline-danger" class="float-right btn-sm"><b-icon icon="Trash" aria-label="Delete"></b-icon></b-button>
				<b-avatar class="" href="#bar" src="https://placekitten.com/300/300"></b-avatar>
				admin
				<b-card-text class="text-justify mt-3">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non vulputate dui, in aliquet neque. Donec posuere dignissim mauris, et dignissim lorem tristique nec. Vestibulum arcu leo, cursus
					tincidunt vulputate cursus,
				</b-card-text>
			</div>
			<div class="text-right">
				<b-button href="#" variant="primary" class="btn-sm"><b-icon icon="hand-thumbs-up" aria-label="Like"></b-icon> 1</b-button>
				<b-button href="#" variant="danger" class="m-1 btn-sm"><b-icon icon="hand-thumbs-down" aria-label="Dislike"></b-icon> 0</b-button>
			</div>
		</b-card>

		<b-card>
			<div class="text-left">
				<b-button href="#" variant="outline-danger" class="float-right btn-sm"><b-icon icon="Trash" aria-label="Delete"></b-icon></b-button>
				<b-avatar class="" href="#bar" src="https://placekitten.com/300/300"></b-avatar>
				Charlie
				<b-card-text class="text-justify mt-3">
					Phasellus non vulputate dui, in aliquet neque. Donec posuere dignissim mauris
				</b-card-text>
			</div>
			<div class="text-right">
				<b-button href="#" variant="primary" class="btn-sm"><b-icon icon="hand-thumbs-up" aria-label="Like"></b-icon> 1</b-button>
				<b-button href="#" variant="danger" class="m-1 btn-sm"><b-icon icon="hand-thumbs-down" aria-label="Dislike"></b-icon> 0</b-button>
			</div>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "comments",
};
</script>
