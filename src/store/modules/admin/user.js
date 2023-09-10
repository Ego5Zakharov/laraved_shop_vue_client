import api from "@/axios/api";

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
    permissionsWithoutRolesRelation: state => state.permissionsWithoutRolesRelation,
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
    async attachRolesToUser({commit, getters}, {userId, selectedRoles}) {
        console.log(userId, selectedRoles)
        try {
            const res = await api.post(`/auth/users/${userId}/attachRolesToUser`,
                {'roles': selectedRoles}
            );
            console.log(res);
            // commit('setRolesToUser', res);

        } catch (error) {
            commit('setErrorsException', {error});
        }
    },
    async attachPermissionsToUser({commit, getters}, {userId, selectedPermissions}) {
        console.log(userId, selectedPermissions)
        try {
            const res = await api.post(`/auth/users/${userId}/attachPermissionToUser`,
                {'permissions': selectedPermissions}
            );
            console.log(res);

        } catch (error) {
            commit('setErrorsException', {error});
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

    setRolesForActions(state, rolesForActions) {
        state.rolesForActions = rolesForActions;
    },
    permissionsWithoutRolesRelation(state, permissionsWithoutRolesRelation) {
        state.permissionsWithoutRolesRelation = permissionsWithoutRolesRelation;
    }
}

export default {
    state, getters, actions, mutations
}
