import api from "@/axios/api";

const state = {
    roles: [], permissions: []
}
const getters = {
    roles: state => state.roles,
    permissions: state => state.permissions
}
const actions = {
    async getPermissionsData({commit,getters}) {
        try {
            const res = await api.get('/auth/permissions')
            commit('setPermissions', res.data.permissions[0]);
            console.log(getters.permissions);
            console.log(res.data.permissions[0]);
            return res.data.permissions[0];
        } catch (error) {
            console.log('Ошибка полномочий')
        }
    },
    async getRolesData({commit}) {
        try {
            const res = await api.get('/auth/roles');
            commit('setRoles', res.data.roles[0]);
            console.log(res.data.roles[0]);
            return res.data.roles[0];
        } catch (error) {
            console.log('Ошибка ролей')
        }
    },
    findPermission({getters}, permissionName) {
        return getters.permissions.find(permission => permission === permissionName);
    },
    hasPermission({getters},permissionName) {
          const permissions = Array.from(getters.permissions);
          return permissions.includes(permissionName);
    },
    findRole({getters}, roleName) {
        return getters.roles.find(role => role === roleName);
    },
    hasAnyPermission({getters}) {
        return getters.permissions.length > 0;
    },
    hasAnyRole() {
        return this.$store.getters.roles.length > 0;
    }
}
const mutations = {
    setRoles(state, roles) {
        state.roles = roles;
    }, setPermissions(state, permissions) {
        state.permissions = permissions
    }
}

export default {
    state, getters, actions, mutations
}
