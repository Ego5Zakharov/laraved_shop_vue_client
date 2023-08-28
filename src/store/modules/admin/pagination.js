const state = {
    pagination: [],
    page: 1,
}
const getters = {
    pagination: state => state.pagination,
    page: state => state.page,
}
const actions = {}
const mutations = {
    setPagination(state, pagination) {
        state.pagination = pagination;
    },
    setPage(state, page) {
        state.page = page;
    }
}

export default {
    state, getters, actions, mutations
}