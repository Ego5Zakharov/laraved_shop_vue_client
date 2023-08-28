import axios from "@/axios";
import router from "@/router";

const state = {
    category: {
        id: null,
        title: ''
    },
    categories: [],
}

const getters = {
    category: state => state.category,
    categories: state => state.categories,
}

const actions = {
    getAllCategories({commit, getters}, {page}) {
        axios.post('/categories/index/', {'page': page}).then(res => {
            commit('setCategories', res.data.data);
            commit('setPagination', res.data.meta);
            commit('setPage', page);
        });
    },
    getCategoryById({state, commit, dispatch}, id) {
        axios.get(`/categories/${id}/`).then(res => {
            const categoryData = res.data.data;
            commit('setCategory', {id: categoryData.id, title: categoryData.title});
        });
    },
    deleteCategory({dispatch, commit, getters}, id) {
        axios.delete(`/categories/${id}`).then(data => {
            const categories = getters.categories.filter(category => category.id !== id);
            if (categories.length === 0) {
                dispatch('getAllCategories', {'page': 1});
            } else {
                commit('setCategories', categories);
            }
        });
    },
    createCategory({commit, getters}, category) {
        axios.post('categories/', {title: category.title})
            .then(res => {
                router.push({name: 'admin.categories.index'});
            })
            .catch(error => {
                commit('setErrorsException', {error});
            });
    },

    updateCategory({commit}, {category}) {
        axios.patch(`/categories/${category.id}`, {title: category.title}).then(res => {
            router.push({name: 'admin.categories.index'});
        }).catch(error => {
                commit('setErrorsException', {error});
            }
        );
    },

}

const mutations = {
    setCategory(state, category) {
        state.category = category;
    },
    setCategories(state, categories) {
        state.categories = categories;
    },
}

export default {
    state, mutations, getters, actions
}
