import Vuex from 'vuex';
import Category from './modules/admin/category'
import Tag from "@/store/modules/admin/tag";
import Error from "@/store/modules/admin/error";
import Pagination from "@/store/modules/admin/pagination";
import Product from "@/store/modules/admin/product";
import Auth from "@/store/modules/auth/auth";

export default new Vuex.Store({
    modules: {
        Category, Tag, Error, Pagination, Product,Auth
    }
})