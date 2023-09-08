import api from "@/axios/api";
import router from "@/router";

const state = {
    permissions: [],
    permission: {
        id: null,
        name: '',
        description: ''
    }
}
const getters = {
    permission: state => state.permission,
    permissions: state => state.permissions,
}
const actions = {
    getAllPermissions({commit, getters}, {page}) {
        api.post('/auth/permissions/index', {'page': page}).then(res => {
            console.log(res.data.data);
            commit('setPermissions', res.data.data);
            commit('setPagination', res.data.meta);
            commit('setPage', page);
        }).catch(error => {
            console.log(error);
        });
    },
    getAllPermissionsForAction({commit, getters}) {
        api.get('/auth/permissions/getAllPermissionsWithId').then(res => {
            commit('setPermissionsForActions', res.data.data);
            console.log(res.data.data)
        }).catch(error => {
            console.log(error);
        });
    },
    getPermissionById({commit}, id) {
        api.get(`/auth/permissions/${id}/show`,).then(res => {
            console.log(res.data.data);
            commit('setPermission', res.data.data)
        });
    },
    createPermission({commit, getters}, permission) {
        api.post("/auth/permissions/store/", {
            name: permission.name,
            description: permission.description
        }).then(res => {
            router.push({name: 'admin.permissions.index'})
        }).catch(error => {
            commit('setErrorsException', {error});
        })
    },
    updatePermission({commit}, permission) {
        api.patch(`/auth/permissions/${permission.id}/update/`, {
            name: permission.name,
            description: permission.description
        }).then(res => {
            router.push({name: 'admin.permissions.index'})
        }).catch(error => {
            commit('setErrorsException', {error});
        });
    },
    deletePermission({commit, getters, dispatch}, id) {
        api.delete(`/auth/permissions/${id}/delete`).then(res => {
            commit('setPermissions', getters.permissions.filter(permission => permission.id !== id))
            console.log(getters.permissions);
            if (getters.permissions.length === 0) {
                dispatch('getAllPermissions', {page: 1});
            }
        }).catch(error => {
            console.log(error);
        });
    }
}
const mutations = {
    setPermission(state, permission) {
        state.permission = permission;
    },
    setPermissions(state, permissions) {
        state.permissions = permissions;
    }
}


export default {
    state, getters, actions, mutations
}