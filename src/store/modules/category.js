import axios from "@/axios";

const state = {
    category: {
        title: ''
    },
    page: null,
    categories: [],
    pagination: []
}

const getters = {
    category: state => state.category,
    categories: state => state.categories,
    page: state => state.page,
    pagination: state => state.pagination
}

const actions = {
    getAllCategories({commit}, {page}) {
        axios.post('/categories/index/', {'page': page}).then(res => {
            commit('setCategories', res.data.data);
            commit('setPagination', res.data.meta);
            commit('setPage', page);
        });
    }
}

const mutations = {
    setCategory(state, category) {
        state.category = category;
    },
    setPage(state, page) {
        state.page = page;
    },
    setCategories(state, categories) {
        state.categories = categories;
    },
    setPagination(state, pagination) {
        state.pagination = pagination;
    }
}

export default {
    state, mutations, getters, actions
}
