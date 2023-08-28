import axios from "@/axios";
import router from "@/router";

const state = {
    category: {
        id: null,
        title: ''
    },
    page: null,
    categories: [],
    pagination: [],
    errors: []
}

const getters = {
    category: state => state.category,
    categories: state => state.categories,
    page: state => state.page,
    pagination: state => state.pagination,
    errors: state => state.errors,
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
        axios.post('categories/', {title: category.title}).then(res => {
            router.push({name: 'admin.categories.index'});
        }).catch(error => {
                commit('setErrorsException', {error});
            }
        );
    },
    updateCategory({commit}, {category}) {
        axios.patch(`/categories/${category.id}`, {title: category.title}).then(res => {
            router.push({name: 'admin.categories.index'});
        }).catch(error => {
                commit('setErrorsException', {error});
            }
        );
    },
    closeError({commit, getters}, error) {
        let index = getters.errors.indexOf(error);
        if (index !== -1) {
            getters.errors.splice(index, 1);
            commit('setErrors', getters.errors);
        }
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
    },
    setErrors(state, errors) {
        state.errors = errors;
    },
    setErrorsException(state, {error}) {
        state.errors = [];
        let errors = [];
        console.log(error);
        if (error.response && error.response.data && error.response.data.errors) {
            const serverErrors = error.response.data.errors;

            for (const key in serverErrors) {
                if (serverErrors.hasOwnProperty(key)) {
                    const messages = serverErrors[key];
                    errors.push(...messages.map(message => ({id: Date.now, message})));
                }
            }
        } else {
            errors.push({id: Date.now(), message: 'Ошибка редактирования категории.'});
        }

        this.commit('setErrors', errors);
    }

}

export default {
    state, mutations, getters, actions
}
