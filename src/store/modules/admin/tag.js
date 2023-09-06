import router from "@/router";
import api from "@/axios/api";

const state = {
    tags: [],
    tag: {
        id: null,
        title: ''
    },
}

const getters = {
    tag: state => state.tag,
    tags: state => state.tags,
}

const actions = {
    getAllTags({commit, getters}, {page}) {
        api.post('/auth/tags/index/', {'page': page}).then(res => {
            commit('setTags', res.data.data);
            commit('setPagination', res.data.meta)
            commit('setPage', page);
        });
    },
    getTagById({commit}, id) {
        api.get(`/auth/tags/${id}`).then(res => {
            commit('setTag', res.data.data);
        })
    },
    updateTag({commit}, tag) {
        api.patch(`/auth/tags/${tag.id}`, {title: tag.title}).then(res => {
            router.push({name: 'admin.tags.index'});
        }).catch(error => {
            commit('setErrorsException', {error});
        });
    },
    createTag({commit, getters}, tag) {
        api.post('/auth/tags/', {title: tag.title}).then(res => {
            router.push({name: 'admin.tags.index'})
        }).catch(error => {
            commit('setErrorsException', {error})
        });
    },
    deleteTag({commit, getters, dispatch}, id) {
        api.delete(`/auth/tags/${id}`).then(res => {
            const tags = getters.tags.filter(tag => tag.id !== id);
            if (tags.length === 0) {
                dispatch('getAllTags', 1);
            } else {
                commit('setTags', tags);
            }
        });
    }
}

const mutations = {
    setTag(state, tag) {
        state.tag = tag;
    },
    setTags(state, tags) {
        state.tags = tags;
    },
}

export default {
    state, getters, actions, mutations
}