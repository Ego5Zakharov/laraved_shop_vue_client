<script>
import {mapActions, mapGetters} from "vuex";
import NoImage from "@/views/Search/Products/NoImage.vue";
import ProductList from "@/views/Search/Products/ProductList.vue";
import Pagination from "@/components/Common/Pagination.vue";
import {createRouter as $router} from "vue-router";

export default {
  name: "SearchProducts",
  components: {Pagination, ProductList, NoImage},
  data() {
    return {
      product_search_field: ''
    };
  },
  created() {
    this.product_search_field = this.productSearchField;
  },
  methods: {
    ...mapActions(['searchProducts', 'getAllSearchProducts']),
    handleSort(sortOption, sortOrder) {
      const searchValue = this.product_search_field.trim();

      const queryParameters = {
        sort: sortOption,
        order: sortOrder // sortOrder может быть "asc" или "desc"
      };

      if (searchValue) {

        this.$router.push({
          name: 'searchProducts',
          query: { q: searchValue, ...queryParameters } // Объедините параметры запроса с поисковым запросом
        });

        console.log(123);
      }
    }
  },
  computed: {
    ...mapGetters({
      'productSearchField': 'product_search_field',
      'searchProductData': 'searchProducts',
      'searchResultField': 'search_result_field',
      'searchResultSubmited': 'search_result_submited'
    }),
  },
  mounted() {
    this.getAllSearchProducts();
    this.product_search_field = this.$route.query.q ?? '';
  }
};
</script>

<template>
  <div class="tw-container-center">
    <div class="relative items-center px-2">
      <input class="w-full rounded "
             v-model="product_search_field"
             type="text"
             placeholder="Поиск">
      <div @click.prevent="searchProducts({product_search_field,})"
           class="absolute right-4 top-2.5 tw-link-blue">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
        </svg>
      </div>
    </div>

    <template v-if="searchResultSubmited === true">
      <div class="text-xl mx-2 mt-2">Результаты поиска для <span
          class="text-2xl text-blue-800">{{ this.productSearchField }}</span></div>
    </template>

    <div v-if="searchResultSubmited || searchProductData" class="mt-4">

      <div class="w-full md:grid lg:grid-cols-8 border">
        <div class="col-span-2 px-2 py-2">
          <div class="flex justify-center rounded hover:shadow-xl">
            <button @click.prevent="" class="tw-gray-button w-full h-full  ">Фильтровать</button>
          </div>
        </div>
        <div class="col-span-6">
          <ul class="lg:flex p-4 border-b-2 border-gray-200 items-center space-x-6 text-blue-500 px-2">
            <li class="">Сортировать по:</li>
            <li @click="handleSort('price','asc')" class="cursor-pointer hover:underline">Сначала подешевле</li>
            <li class="cursor-pointer hover:underline">Сначала подороже</li>
            <li class="cursor-pointer hover:underline">Сначала новое</li>
          </ul>
          <div class="grid lg:grid-cols-3 p-4">
            <ProductList :products="searchProductData"></ProductList>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>