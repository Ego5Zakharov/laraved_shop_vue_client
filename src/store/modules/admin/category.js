import router from "@/router";
import api from "@/axios/api";

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
    getAllCategories({commit, getters, dispatch}, {page}) {
        api.post('/auth/categories/index/', {'page': page})
            .then(res => {
                commit('setCategories', res.data.data);
                commit('setPagination', res.data.meta);
                commit('setPage', page);

            }).catch(error => {
        });
    },
    getCategoryById({state, commit, dispatch}, id) {
        api.get(`/auth/categories/${id}/`).then(res => {
            const categoryData = res.data.data;
            commit('setCategory', {id: categoryData.id, title: categoryData.title});
        });
    },
    deleteCategory({dispatch, commit, getters}, id) {
        api.delete(`/auth/categories/${id}`).then(data => {
            const categories = getters.categories.filter(category => category.id !== id);
            if (categories.length === 0) {
                dispatch('getAllCategories', {'page': 1});
            } else {
                commit('setCategories', categories);
            }
        });
    },
    createCategory({commit, getters}, category) {
        api.post('/auth/categories/', {title: category.title})
            .then(res => {
                router.push({name: 'admin.categories.index'});
            })
            .catch(error => {
                commit('setErrorsException', {error});
            });
    },

    updateCategory({commit}, {category}) {
        api.patch(`/auth/categories/${category.id}`, {title: category.title}).then(res => {
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
