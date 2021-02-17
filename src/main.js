import Vue from 'vue';
import App from './App.vue';
import Routes from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import * as fb from 'firebase/app';
import Vuelidate from 'vuelidate';
import BuyDialogComponent from '@/components/Common/BuyDialog';

Vue.use(Vuelidate);
Vue.component('app-buy-dialog', BuyDialogComponent);
Vue.config.productionTip = false;

new Vue({
	router: Routes,
	vuetify,
	store,
	render: h => h(App),
	created() {
		// Your web app's Firebase configuration
		const firebaseConfig = {
			apiKey: "AIzaSyCZBcUvyHb9ZE9HiI-qkGHgoZ54lKUGXmo",
			authDomain: "authentication-2382c.firebaseapp.com",
			projectId: "authentication-2382c",
			storageBucket: "authentication-2382c.appspot.com",
			messagingSenderId: "388079577920",
			appId: "1:388079577920:web:ae87a2004438b3d1ed68a5",
			measurementId: "G-SSSW77XFTJ"
		};
		// Initialize Firebase
		fb.initializeApp(firebaseConfig);
		fb.analytics();
		fb.auth().onAuthStateChanged( user => {
			if ( user ) {
				this.$store.dispatch('autoLoginUser', user)
			}
		});
	}
}).$mount('#app');