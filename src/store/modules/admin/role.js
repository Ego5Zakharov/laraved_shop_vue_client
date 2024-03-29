import api from "@/axios/api";
import router from "@/router";
import permission from "@/store/modules/admin/permission";

const state = {
    roles: [],
    role: {
        id: null,
        name: '',
        permissions: []
    },

    permissionsForActions: [],
}
const getters = {
    role: state => state.role,
    roles: state => state.roles,
    permissionsForActions: state => state.permissionsForActions,
}
const actions = {
    getAllRoles({commit, getters}, {page}) {
        api.post('/auth/roles/index', {'page': page}).then(res => {
            console.log(res.data.data);
            commit('setRoles', res.data.data);
            commit('setPagination', res.data.meta);
            commit('setPage', page);
        }).catch(error => {
            console.log(error);
        });
    },
    getRoleById({commit}, id) {
        api.get(`/auth/roles/${id}/show`,).then(res => {
            console.log(res.data.data);
            commit('setRole', res.data.data)
        });
    },

    getAllRolesForAction({commit}) {
        api.get('/auth/roles/getAllRolesWithId').then(res => {
            commit('setRolesForActions', res.data.data);
        }).catch(error => {
            console.log(error)
        });
    },

    createRole({commit, getters}, {role}) {
        const formData = new FormData();
        formData.append('name', role.name);

        if (role.permissions.length > 0) {
            const permissions = role.permissions;

            permissions.forEach((permission) => {
                formData.append(`permissions[]`, permission)
            });
        }

        api.post('/auth/roles/store', formData)
            .then((res) => {
                router.push({name: 'admin.roles.index'});
            })
            .catch((error) => {
                commit('setErrorsException', {error});
            });
    },
    updateRole({commit, getters}, {role}) {
        const dataToSend = {
            name: role.name,
        }

        if (role.permissions.length > 0) {
            dataToSend.permissions = role.permissions;
        }
        api.patch(`/auth/roles/${role.id}/update`, dataToSend)
            .then(res => {
                router.push({name: 'admin.roles.index'})
            }).catch(error => {
            console.log(error);
            commit('setErrorsException', {error})
        });

    },
    deleteRole({commit, getters, dispatch}, id) {
        api.delete(`/auth/roles/${id}/delete`).then(res => {
            commit('setRoles', getters.roles.filter(role => role.id !== id));
            if (getters.roles.length === 0) {
                dispatch('getAllRoles', {page: 1});
            }
        });
    },
    detachPermissionFromRole({commit, getters, dispatch}, {roleId, permissionId}) {
        const url = `/auth/roles/${roleId}/${permissionId}/detachPermissionFromRole`;
        api.delete(url).then(res => {
            commit('setRolePermissions', getters.role.permissions.filter(
                permission => permission.id !== permissionId)
            )
        });
    }
}
const mutations = {
    setRole(state, role) {
        state.role = role;
    },
    setRoles(state, roles) {
        state.roles = roles;
    },

    setPermissionsForActions(state, permissionsForActions) {
        state.permissionsForActions = permissionsForActions;
    },
    setRolePermissions(state, rolePermissions) {
        state.role.permissions = rolePermissions;
    }
}


export default {
    state, getters, actions, mutations
}