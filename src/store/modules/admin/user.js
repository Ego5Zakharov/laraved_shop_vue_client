import api from "@/axios/api";

const state = {
    users: [],
    user: {
        id: null,
        email: '',
        name: '',
        roles: [],
        permissions: []
    }
}

const getters = {
    users: state => state.users,
    user: state => state.user,
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
        } catch (error) {
            console.error(error);
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
    }
}

export default {
    state, getters, actions, mutations
}
