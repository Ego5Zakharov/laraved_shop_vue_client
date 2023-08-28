
const state = {
    errors: [],
}
const getters = {
    errors: state => state.errors
}
const actions = {
    closeError({commit, getters}, error) {
        let index = getters.errors.indexOf(error);
        if (index !== -1) {
            getters.errors.splice(index, 1);
            commit('setErrors', getters.errors);
        }
    }
}

const mutations = {
    setErrors(state, errors) {
        state.errors = errors;
    },
    setErrorsException(state, {error}) {
        state.errors = [];
        let errors = [];
        if (error.response && error.response.data && error.response.data.errors) {
            const serverErrors = error.response.data.errors;

            for (const key in serverErrors) {
                if (serverErrors.hasOwnProperty(key)) {
                    const messages = serverErrors[key];
                    errors.push(...messages.map(message => ({id: Date.now, message})));
                }
            }
        } else {
            errors.push({id: Date.now(), message: 'Ошибка!'});
        }

        this.commit('setErrors', errors);
    },

}


export default {
    state, getters, actions, mutations
}