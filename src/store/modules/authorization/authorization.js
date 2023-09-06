import api from "@/axios/api";

const state = {
    roles: [], permissions: []
}
const getters = {
    roles: state => state.roles,
    permissions: state => state.permissions
}
const actions = {
    getPermissionsData({commit, getters}) {
        api.get('/auth/permissions').then(res => {
            commit('setPermissions', res.data.permissions);
            console.log(getters.permissions)
        }).catch(error => {
            console.log('Ошибка полномочий')
        });
    },

    getRolesData({commit, getters}) {
        api.get('/auth/roles').then(res => {
            commit('setRoles', res.data.roles);
            console.log(getters.roles)

        }).catch(error => {
            console.log('Ошибка ролей')
        });
    },

    findPermission({getters, commit}, permissionName) {
        return getters.permissions.find(permission => permission.name === permissionName);
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
        state.permissions = permissions;
    }
}


export default {
    state, getters, actions, mutations
}
