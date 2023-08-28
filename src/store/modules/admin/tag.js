import axios from "@/axios";
import router from "@/router";

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
        axios.post('/tags/index/', {'page': page}).then(res => {
            commit('setTags', res.data.data);
            commit('setPagination', res.data.meta)
            commit('setPage', page);
        });
    },
    getTagById({commit}, id) {
        axios.get(`/tags/${id}`).then(res => {
            commit('setTag', res.data.data);
        })
    },
    updateTag({commit}, tag) {
        axios.patch(`/tags/${tag.id}`, {title: tag.title}).then(res => {
            router.push({name: 'admin.tags.index'});
        }).catch(error => {
            commit('setErrorsException', {error});
        });
    },
    createTag({commit, getters}, tag) {
        axios.post('/tags/', {title: tag.title}).then(res => {
            router.push({name: 'admin.tags.index'})
        }).catch(error => {
            commit('setErrorsException', {error})
        });
    },
    deleteTag({commit, getters, dispatch}, id) {
        axios.delete(`/tags/${id}`).then(res => {
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