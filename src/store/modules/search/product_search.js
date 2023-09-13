import router from "@/router";
import axios from "axios";

const state = {
    searchProducts: [],
    product_search_field: '',
    search_result: {
        search_result_field: '',
        submited: false
    },
}
const getters = {
    searchProducts: state => state.searchProducts,
    search_result_field: state => state.search_result.search_result_field,
    search_result_submited: state => state.search_result.submited,
    product_search_field: state => state.product_search_field,
}

const actions = {

    getAllSearchProducts({commit}) {
        axios.get('/getAllProducts').then(res => {
            commit('setSearchProducts', res.data.data.data);
        }).catch(error => {
            console.log(error)
        })
    },
    searchProducts({commit, getters, dispatch}, {product_search_field}) {
        if (product_search_field.length === 0) {
            return 0;
        }

        console.log(router.currentRoute.value)
        const searchValue = router.currentRoute.value.query.q;
        const sortOption = router.currentRoute.value.query.sort;
        const sortOrder = router.currentRoute.value.query.order;

        console.log(searchValue + 'СТРОКА');
        console.log(sortOption + 'Сортировка');

        axios.post(`/searchProducts/`,
            {
                'search_field': product_search_field,
                q: {searchValue},
                sort: {sortOption},
                order: {sortOrder}
            },
        ).then(res => {
            console.log(res.data);

            commit('setProductSearchField', product_search_field);
            commit('setSearchResultField', product_search_field)

            commit('setSearchResultSubmited', true);
            commit('setSearchProducts', res.data.data.data);

            router.push({
                name: 'searchProducts',
                params: {},
                query: {
                    q: searchValue,
                    sort: sortOption,
                    sortOrder: sortOrder
                }
            })
        }).catch(error => {
            console.log(error);
        });
    },


}

const mutations = {
    setSearchProducts(state, searchProducts) {
        state.searchProducts = searchProducts;
    },
    setSearchResultField(state, searchResult) {
        state.search_result.search_result_field = searchResult;
    },
    setSearchResultSubmited(state, bool) {
        state.search_result.submited = bool;
    },
    setProductSearchField(state, product_search_field) {
        state.product_search_field = product_search_field;
    }
}


export default {
    state, getters, actions, mutations
}