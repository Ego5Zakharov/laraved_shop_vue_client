import api from "@/axios/api";
import router from "@/router";

const state = {
    users: [],
    user: {
        id: null,
        email: '',
        name: '',
        roles: [],
        permissions: [],
        permissionsWithoutRolesRelation: []
    },
    rolesForActions: []
}

const getters = {
    users: state => state.users,
    user: state => state.user,
    permissionsWithoutRolesRelation: state => state.user.permissionsWithoutRolesRelation,
    rolesForActions: state => state.rolesForActions,
}

const actions = {
    async getAllUsers({commit}, {page}) {
        try {
            const res = await api.post('/auth/users/index', {'page': page});
            commit('setUsers', res.data.data);
            commit('setPagination', res.data.meta);
            commit('setPage', page);
        } catch (error) {
            console.error(error);
        }
    },

    async getUserById({commit, getters}, id) {
        try {
            const res = await api.get(`/auth/users/${id}/show`);
            const user = res.data.data;

            commit('setUser', user);
            commit('setUserPermissions', user.roles);
            console.log(user.permissionsWithoutRolesRelation);
            commit('permissionsWithoutRolesRelation', user.permissionsWithoutRolesRelation);
        } catch (error) {
            console.error(error);
        }
    },
    async attachRolesToUser({commit, getters, dispatch}, {userId, selectedRoles}) {
        console.log(userId, selectedRoles)
        try {
            const res = await api.post(`/auth/users/${userId}/attachRolesToUser`,
                {'roles': selectedRoles}
            );
            commit('setUser', res.data.data);
            dispatch('getUserById', userId);

        } catch (error) {
            commit('setErrorsException', {error});
        }
    },
    async attachPermissionsToUser({commit, getters, dispatch}, {userId, selectedPermissions}) {
        console.log(userId, selectedPermissions)
        try {
            const res = await api.post(`/auth/users/${userId}/attachPermissionToUser`,
                {'permissions': selectedPermissions}
            );
            dispatch('getUserById', userId);
        } catch (error) {
            commit('setErrorsException', {error});
        }
    },

    async detachRoleFromUser({commit, getters,dispatch}, {userId, roleId}) {
        console.log(userId, roleId);
        try {
            const res = await api.delete(`/auth/users/${userId}/${roleId}/detachRoleFromUser`);

            commit('setUserRoles', res.data.data.roles);
            dispatch('getUserById', userId);
        } catch (error) {
            console.log(error)
        }
    },
    async detachPermissionFromUser({commit, getters}, {userId, permissionId}) {
        console.log(userId, permissionId);
        try {
            const res = await api.delete(`/auth/users/${userId}/${permissionId}/detachPermissionFromUser`);

            commit('permissionsWithoutRolesRelation', res.data.data.permissionsWithoutRolesRelation);
        } catch (error) {
            console.log(error)
        }
    }

}

const mutations = {
    setUsers(state, users) {
        state.users = users;
    },

    setUser(state, user) {
        state.user = user;
    },

    setUserPermissions(state, roles) {

        const userPermissions = roles.reduce((permissions, role) => {
            permissions.push(...role.permissions);
            return permissions;
        }, []);

        state.user.permissions = [...new Set(userPermissions)];
    },
    setUserRoles(state, userRoles) {
        state.user.roles = userRoles;
    },
    setRolesForActions(state, rolesForActions) {
        state.rolesForActions = rolesForActions;
    },
    permissionsWithoutRolesRelation(state, permissionsWithoutRolesRelation) {
        state.user.permissionsWithoutRolesRelation = permissionsWithoutRolesRelation;
    }

}

export default {
    state, getters, actions, mutations
}
