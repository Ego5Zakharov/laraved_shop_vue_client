import api from "@/axios/api";

const state = {
    rolesAuth: [],
    permissionsAuth: []
}
const getters = {
    rolesAuth: state => state.rolesAuth,
    permissionsAuth: state => state.permissionsAuth
}
const actions = {
    async getPermissionsData({commit, getters}) {
        try {
            const res = await api.get('/auth/permissions/')
            commit('setAuthPermissions', res.data.permissions[0]);
            console.log(getters.permissionsAuth)
        } catch (error) {
            console.log(error);
            console.log('Ошибка полномочий')
        }
    },
    async getRolesData({commit,getters}) {
        try {
            const res = await api.get('/auth/roles/');
            commit('setAuthRoles', res.data.roles);
            console.log(getters.rolesAuth)
        } catch (error) {
            console.log(error)
            console.log('Ошибка ролей')
        }
    },
    findPermission({getters}, permissionName) {
        return getters.permissionsAuth.find(permission => permission === permissionName);
    },
    hasPermission({getters}, permissionName) {
        const permissionsAuth = Array.from(getters.permissionsAuth);
        return permissionsAuth.includes(permissionName);
    },
    findRole({getters}, roleName) {
        return getters.rolesAuth.find(role => role === roleName);
    },
    hasAnyPermission({getters}) {
        return getters.permissionsAuth.length > 0;
    },
    hasAnyRole() {
        return this.$store.getters.rolesAuth.length > 0;
    }
}
const mutations = {
    setAuthRoles(state, rolesAuth) {
        state.rolesAuth = rolesAuth;
    }, setAuthPermissions(state, permissionsAuth) {
        state.permissionsAuth = permissionsAuth
    }
}

export default {
    state, getters, actions, mutations
}
