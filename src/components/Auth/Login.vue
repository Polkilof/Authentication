<template>
	<v-container class="fill-height" fluid>
		<v-row
			align="center"
			justify="center"
		>
			<v-col
				cols="12"
				sm="8"
				md="6"
			>
				<v-card class="elevation-0">
					<v-toolbar
						flat
					>
						<v-toolbar-title>Login</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form ref="form" v-model="valid">
							<v-text-field
								label="Email"
								name="email"
								prepend-icon="mdi-account"
								type="email"
								v-model="email"
								:error-messages="emailErrors"
								@input="$v.email.$touch()"
								@blur="$v.email.$touch()"
								required
							></v-text-field>

							<v-text-field
								label="Password"
								name="password"
								prepend-icon="mdi-lock"
								type="password"
								v-model="password"
								:counter="6"
								:error-messages="passwordErrors"
								@input="$v.password.$touch()"
								@blur="$v.password.$touch()"
								required
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click="onSubmit" :disabled="!valid || loading" :loading="loading">Login</v-btn>
					</v-card-actions>

					<div class="text-center pa-4">
						<div>
							<span>or</span>
						</div>
						<v-btn
							class="ma-2"
							outlined
							large
							fab
							color="indigo"
							@click="onSubmitGoogle"
							:disabled="loading"
							:loading="loading"
						>
							<v-icon>mdi-google</v-icon>
						</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
export default {
	mixins: [validationMixin],

	validations: {
		password: { required, maxLength: maxLength(6) },
		email: { required, email },
	},
	data() {
		return{
			email: '',
			password: '',
			valid: true,
		}
	},
	created: function () {
		if ( this.$route.query['loginError'] ){
			this.$store.dispatch('setError', 'Please log in to access this page');
		}
	},
	computed: {
		passwordErrors(){
			const errors = [];
			if (!this.$v.password.$dirty) return errors;
			!this.$v.password.maxLength && errors.push('Password must be at most 6 characters long');
			!this.$v.password.required && errors.push('Password is required.');
			return errors
		},
		emailErrors(){
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push('Must be valid e-mail');
			!this.$v.email.required && errors.push('E-mail is required');
			return errors
		},
		loading(){
			return this.$store.getters.loading;
		}
	},
	methods: {
		onSubmit(){
			this.$v.$touch();
			if( this.$refs.form.validate() && this.$v.email.$dirty && this.$v.password.$dirty ){
				const user = {
					email: this.email,
					password: this.password
				};
				this.$store.dispatch('loginUser', user)
				.then(() => {
					this.$router.push('/');
				})
				.catch(() => {})
			}
		},
		onSubmitGoogle(){
			this.$store.dispatch('socialLogin')
			.then(() => {
				this.$router.push('/');
			})
			.catch(() => {})
		},
	}
}
</script>