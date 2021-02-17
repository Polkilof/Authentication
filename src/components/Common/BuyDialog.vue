<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				class="ml-2"
				color="blue-grey"
				dark
				v-bind="attrs"
				v-on="on"
			>Buy</v-btn>
			<!-- Add to cart -->
		</template>
		<v-card>
			<v-card-title>
				<h1 class="headline">Do you want to buy it?</h1>
			</v-card-title>
			<v-card-text>
				<v-row>
					<v-col cols="12" sm="12" md="12">
						<v-text-field
							name="name"
							label="Your Name"
							type="text"
							v-model="name"
						></v-text-field>
						<v-text-field
							name="phone"
							label="Your Phone"
							type="text"
							v-model="phone"
						></v-text-field>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="blue-grey"
					text
					@click="onCancel"
					:disabled="localLoading"
				>Close</v-btn>
				<v-btn
					color="blue-grey"
					text
					@click="onSave"
					:disabled="localLoading"
					:loading="localLoading"
				>Buy It!</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['product'],
	data(){
		return{
			dialog: false,
			name: '',
			phone: '',
			localLoading: false
		}
	},
	methods: {
		onCancel(){
			this.name = '';
			this.phone = '';
			this.dialog = false;
		},
		onSave(){
			if (this.name !== '' && this.phone !== ''){
				this.localLoading = true
				this.$store.dispatch('createOrder', {
					name: this.name,
					phone: this.phone,
					productId: this.product.id,
					ownerId: this.product.ownerId
				})
				.finally(() => {
					this.name = '';
					this.phone = '';
					this.localLoading = false;
					this.dialog = false;
				})
			}
		}
	}
}
</script>