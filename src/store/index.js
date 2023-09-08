import Vuex from 'vuex';
import Category from './modules/admin/category'
import Tag from "@/store/modules/admin/tag";
import Error from "@/store/modules/admin/error";
import Pagination from "@/store/modules/admin/pagination";
import Product from "@/store/modules/admin/product";
import Auth from "@/store/modules/auntefication/auntefication";
import Authorization from "@/store/modules/authorization/authorization";
import User from "@/store/modules/admin/user";
import Role from "@/store/modules/admin/role";
import Permission from "@/store/modules/admin/permission";

export default new Vuex.Store({
    modules: {
        User, Role, Permission, Category, Tag, Error, Pagination, Product, Auth, Authorization
    }
})