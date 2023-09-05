import axios from "@/axios";
import router from "@/router";
import api from "@/axios/api";

const state = {
    auth: {
        email: '',
        name: '',
        password: '',
        password_confirm: ''
    },
}
const getters = {
    auth: state => state.auth,
    name: state => state.auth.name,
    email: state => state.auth.email,
    password: state => state.auth.password,
    password_confirm: state => state.auth.password_confirm,
}
const actions = {
    login({commit, getters}, {auth}) {
        axios.post('/auth/login/', {
            email: auth.email, password: auth.password,
        }).then(res => {
            commit('setErrors', [])
            localStorage.setItem('access_token', res.data.access_token);
            console.log('successful')
            router.push({name: 'home'})
        }).catch(
            error => {
                commit('setErrorsException', {error})
            }
        )
    },
    register({commit, getters}, {auth}) {
        axios.post('/auth/register', {
            name: auth.name,
            email: auth.email,
            password: auth.password,
            password_confirmation: auth.password_confirmation
        }).then(res => {
            commit('setErrors', [])
            localStorage.setItem('access_token', res.data.access_token);
            router.push({name: 'home'});
        }).catch(error => {
            commit('setErrorsException', {error});
        })
    }
}
const mutations = {
    setAuth(state, auth) {
        state.auth = auth;
    },
    setName(state, name) {
        state.auth.name = name;
    },
    setEmail(state, email) {
        state.auth.email = email;
    },
    setPassword(state, password) {
        state.auth.password = password;
    },
    setPasswordConfirm(state, password_confirm) {
        state.auth.password_confirm = password_confirm;
    },

}


export default {
    state, getters, actions, mutations
}