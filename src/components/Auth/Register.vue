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
						<v-toolbar-title>Registration</v-toolbar-title>
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

							<v-text-field
								label="Confirm Password"
								name="confirm-password"
								prepend-icon="mdi-repeat"
								type="password"
								v-model="confirmPassword"
								:counter="6"
								:error-messages="confirmPasswordErrors"
								@input="$v.confirmPassword.$touch()"
								@blur="$v.confirmPassword.$touch()"
								required
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn @click="onSubmit" :disabled="!valid || loading" :loading="loading">Create account</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators';
export default {
	mixins: [validationMixin],

	validations: {
		password: { required, maxLength: maxLength(6) },
		confirmPassword: { required, maxLength: maxLength(6), sameAsPassword: sameAs('password') },
		email: { required, email },
	},
	data(){
		return{
			email: '',
			password: '',
			confirmPassword: '',
			valid: true,
		}
	},
	computed: {
		confirmPasswordErrors(){
			const errors = [];
			if (!this.$v.confirmPassword.$dirty) return errors;
			!this.$v.confirmPassword.maxLength && errors.push('Password must be at most 6 characters long');
			!this.$v.confirmPassword.required && errors.push('Password is required.');
			!this.$v.confirmPassword.sameAsPassword && errors.push('Password should match.');
			return errors
		},
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
			if( this.$v.email.required && this.$v.password.required ){
				const user = {
					email: this.email,
					password: this.password,
				};
				this.$store.dispatch('registerUser', user)
				.then(() => {
					this.$router.push('/');
				})
				.catch(() => {})
			}
		}
	}
}
</script>