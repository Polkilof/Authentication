import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import AuthGuard from './auth-guard';
import Home from '@/components/Home';
import About from '@/components/About';
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';



const routes = [
	{
		path: '',
		name: 'home',
		component: Home
	},
	{
		path: '/about',
		name: 'about',
		component: About,
		beforeEnter: AuthGuard
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	}
]

export default new VueRouter({
	routes,
	mode: 'history'
});