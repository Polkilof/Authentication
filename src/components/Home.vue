<template>
	<div v-if="!loading">
		<v-container fluid>
			<h2 class="text-h2">Home</h2>
		</v-container>
	</div>
	<div v-else class="full-height">
		<v-container fill-height>
			<v-row>
				<v-col class="text-center">
					<v-progress-circular
						:size="70"
						:width="7"
						color="purple"
						indeterminate
					></v-progress-circular>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	computed: {
		loading() {
			return this.$store.getters.loading
		}
	}
}
</script>

<style scoped>

</style>
