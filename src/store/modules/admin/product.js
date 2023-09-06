import router from "@/router";
import api from "@/axios/api";

const state = {
    products: [],
    product: {
        id: null,
        price: null,
        quantity: null,
        category_id: null,

        title: '',
        description: '',
        article: '',
        preview_image: '',

        is_published: false,
        category: null,
        tags: [],
        images: [],

        selectedImages: [],
        selectedTags2: [],
    },

    categoriesForCreate: [],
    tagsForCreate: [],
}

const getters = {
    title: state => state.product.title,
    description: state => state.product.description,
    article: state => state.product.article,
    preview_image: state => state.product.preview_image,

    is_published: state => state.product.is_published,

    quantity: state => state.product.quantity,
    price: state => state.product.price,

    product: state => state.product,
    products: state => state.products,

    categoriesForCreate: state => state.categoriesForCreate,

    tagsForCreate: state => state.tagsForCreate,

    selectedImages: state => state.selectedImages,
    selectedTags2: state => state.selectedTags2,
}
const actions = {
    getAllProducts({commit}, {page}) {
        api.post('/auth/products/index/', {page: page}).then(res => {

            commit('setProducts', res.data.data);
            commit('setPagination', res.data.meta);
            commit('setPage', page);
        })
    },
    getCategoriesAndTagsForCreate({commit}) {
        api.get('/auth/products/create').then(res => {
            commit('setTagsForCreate', res.data.data.tags.tags);
            commit('setCategoriesForCreate', res.data.data.categories.categories);
        });
    },
    createProduct({commit, getters}, product) {
        let formData = new FormData();
        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("quantity", product.quantity);
        formData.append("is_published", product.is_published ? '1' : '0');
        formData.append("category_id", product.category_id);
        formData.append("preview_image_path", product.preview_image);

        for (let i = 0; i < product.images.length; i++) {
            formData.append(`images[${product[i]}]`, product.images[i]);
        }

        product.tags.forEach(tag => {
            formData.append("tags[]", tag);
        });

        api.post("/auth/products/", formData)
            .then((res) => {
                commit('setErrors', [])
                router.push({name: "admin.products.index"});
            })
            .catch((error) => {
                console.log(error);
                commit("setErrorsException", {error});
            });
    },
    editProduct({commit}, product) {

        let formData = new FormData();

        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);
        formData.append('is_published', product.is_published ? '1' : '0');
        formData.append('category_id', product.category_id);
        formData.append('preview_image_path', product.preview_image);

        if (product.selectedImages) {
            for (let i = 0; i < product.selectedImages.length; i++) {
                formData.append(`images[${i}]`, product.selectedImages[i]);
            }
        }

        if (product.selectedTags2) {
            product.selectedTags2.forEach(selectedTag => {
                formData.append('tags[]', selectedTag);
            });
        }

        api.post(`/auth/products/${product.id}/update`, formData).then(res => {
            commit('setErrors', [])
            router.push({name: 'admin.products.index'});

        }).catch(error => {
            console.log(product);
            commit('setErrorsException', {error})
        });
    },

    deleteProduct({commit, getters, dispatch}, id) {
        api.delete(`/auth/products/${id}`).then(res => {
            commit('setProducts', getters.products.filter(product => product.id !== id));

            if (getters.products.length === 0) dispatch('getAllProducts', {page: 1});
        });
    },
    detachTagFromProduct({commit, getters}, {productId, tagId}) {
        const url = `/auth/products/${productId}/${tagId}/detachTag`;

        api.delete(url).then(res => {
            commit('setTagsForProduct', getters.product.tags.filter(tag => tag.id !== tagId));
        });
    },
    deleteProductImage({commit, getters, dispatch}, {productId, imageId}) {
        const url = `/auth/products/${productId}/${imageId}/deleteProductImage`;

        api.delete(url).then(res => {
            commit('setImagesForProduct', getters.product.images.filter(image => image.id !== imageId));
        });
    },

    // убрать превью-картинку не удаляя её из общего списка картинок
    deleteProductPreviewImage({commit, getters}, {productId}) {

        const url = `/auth/products/${productId}/deleteProductPreviewImage`;
        api.patch(url, productId).then(res => {
            commit('setPreviewImage', '');
        });
    },
    changeProductPreviewImage({commit, getters}, {productId, imageId}) {
        const url = `/products/${productId}/${imageId}/changeProductPreviewImage`;

        api.patch(url).then(res => {
            commit('setPreviewImage', res.data.data.url)
        });
    },
    getProductById({commit, getters, dispatch}, id) {
        api.get(`/auth/products/${id}`).then(res => {
            commit('setProduct', res.data.data)
            console.log(getters.product);
        });
    }

}
const mutations = {
    setTitle(state, title) {
        state.product.title = title;
    },
    setDescription(state, description) {
        state.product.description = description;
    },

    setPrice(state, price) {
        state.product.price = price;
    },

    setQuantity(state, quantity) {
        state.product.quantity = quantity;
    },
    setIsPublished(state, is_published) {
        state.product.is_published = is_published;
    },
    setArticle(state, article) {
        state.product.article = article;
    },
    setPreviewImage(state, preview_image) {
        state.product.preview_image = preview_image;
    },
    setProduct(state, product) {
        state.product = product;
    },
    setProducts(state, products) {
        state.products = products;
    },
    setCategoriesForCreate(state, categoriesForCreate) {
        state.categoriesForCreate = categoriesForCreate;
    },
    setTagsForCreate(state, tagsForCreate) {
        state.tagsForCreate = tagsForCreate;
    },

    setTagsForProduct(state, tagForProduct) {
        state.product.tags = tagForProduct;
    },
    setImagesForProduct(state, imagesForProduct) {
        state.product.images = imagesForProduct;
    },
    setSelectedTags2(state, selectedTags2) {
        state.product.selectedTags2 = selectedTags2;
    },
}


export default {
    state, getters, actions, mutations
}
