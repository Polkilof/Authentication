<template>
	<div class="v-wrapper">
		<v-app-bar
			app
			clipped-right
			padless
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none mr-2"></v-app-bar-nav-icon>
			<v-toolbar-title class="pa-0"><router-link to="/" tag="div">Logo</router-link></v-toolbar-title>
			<v-spacer></v-spacer>
			<div class="pa-0 elevation-0 d-none d-md-flex justify-end mx-n2">
				<v-btn class="ma-2"
					v-for="(link, index) in links" :key="index"
					:to="link.url"
					>
					<v-icon left>{{ link.icon }}</v-icon>
					{{ link.title }}
				</v-btn>
				<v-dialog
					v-model="dialog"
					persistent
					max-width="290"
					v-if="isUserLoggedIn"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn class="ma-2"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon left>mdi-exit-to-app</v-icon>
							Logout
						</v-btn>
					</template>
					<v-card>
						<v-card-title class="headline">
							Confirmation of exit
						</v-card-title>
						<v-card-text>Are you sure you want to sign out or change your account?</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
									color="green darken-1"
									text
									@click="dialog = false"
							>
								Disagree
							</v-btn>
							<v-btn
									color="green darken-1"
									text
									@click="onLogout"
							>
								Agree
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
			
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			fixed
			left
			temporary
		>
			<v-list dense>
				<v-list-item link @click.stop="left = !left" v-for="(link, index) in links" :key="index" :to="link.url">
					<v-list-item-action>
						<v-icon>{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ link.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item
					@click="dialog = true"
					v-if="isUserLoggedIn"
				>
					<v-list-item-action>
						<v-icon>mdi-exit-to-app</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>

		</v-navigation-drawer>

		<v-main>
			<router-view></router-view>
		</v-main>

		<v-footer padless>
			<v-col
				class="text-center"
				cols="12"
			>
				{{ timestamp }} — <strong>Vuetify</strong>
			</v-col>
		</v-footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				drawer: null,
				left: false,
				dialog: false,
				urlHome: '/',
				timestamp: ""
			}
		},
		created() {
			setInterval(this.getNow, 1000);
		},
		computed: {
			isUserLoggedIn(){
				return this.$store.getters.isUserLoggedIn;
			},
			links(){
				if (this.isUserLoggedIn) {
					return [
						{ title: 'About', icon: 'mdi-information', url: '/about' },
					]
				}
				return [
					{ title: 'Account', icon: 'mdi-account-circle', url: '/login' },
					{ title: 'Register', icon: 'mdi-account-plus', url: '/register' },
				]
			},

		},
		methods: {
			onLogout() {
				this.$store.dispatch('logoutUser');
				this.$router.push("/").catch(()=>{});
				this.drawer = false;
				this.dialog = false;
			},
			formatted(num, digit) {
				let zero = '';
				for(let i = 0; i < digit; i++) {
					zero += '0';
				}
				return (zero + num).slice(-digit);
			},
			getNow() {
				const today = new Date();
				const date = this.formatted(today.getDate(), 2) + '-' + this.formatted(today.getMonth()+1, 2) + '-' + this.formatted(today.getFullYear(), 4);
				const time = this.formatted(today.getHours(), 2) + ":" + this.formatted(today.getMinutes(), 2) + ":" + this.formatted(today.getSeconds(), 2);
				const dateTime = date +' '+ time;
				this.timestamp = dateTime;
			},
		}
	}
</script>

<style scoped>
	.v-toolbar__title{cursor: pointer;}
	.v-wrapper{
		display: flex;
		flex-flow: column;
		height: 100%;
	}
	.v-main__wrap > div.full-height{
		height: 100%;
	}
</style>