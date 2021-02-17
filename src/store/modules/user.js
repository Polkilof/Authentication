import * as fb from 'firebase'

class User {
	constructor(id) {
		this.id = id;
	}
}

export default {
	state: {
		user: null
	},
	getters: {
		user: state => {
			return state.user;
		},
		isUserLoggedIn: state => {
			return state.user != null;
		}
	},
	mutations: {
		setUser (state, payload){
			state.user = payload;
		}
	},
	actions: {
		async registerUser({commit}, {email, password}){
			commit('clearError');
			commit('setLoading', true);
			try {
				const user = await fb.auth().createUserWithEmailAndPassword(email, password);
				commit('setUser', new User(user.uid));
				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error
			}
		},
		async loginUser({commit}, {email, password}){
			commit('clearError');
			commit('setLoading', true);
			try {
				const user = await fb.auth().signInWithEmailAndPassword(email, password);
				commit('setUser', new User(user.uid));
				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error
			}
		},
		async socialLogin({commit}){
			commit('clearError');
			commit('setLoading', true);
			try {
				const provider = new fb.auth.GoogleAuthProvider();
				provider.addScope('profile');
				provider.addScope('email');
				await fb.auth().signInWithPopup(provider).then(function(result) {
					commit('setUser', new User(result.user));
				});
				commit('setLoading', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', error.message);
				throw error
			}
		},
		autoLoginUser({commit}, payload) {
			commit('setUser', new User(payload.uid));
		},
		logoutUser({commit}) {
			fb.auth().signOut();
			commit('setUser', null);
		}
	}
}