<script>
import axios from "@/axios";

export default {
  name: "Index",
  data() {
    return {
      categories: [],
      pagination: [],
      page: null
    };
  },
  mounted() {
    this.getAllCategories(1);
  },

  methods: {
    getAllCategories(page = 1) {
      axios.post(`/categories/index`, {'page': page}).then(res => {
        this.categories = res.data.data;
        this.pagination = res.data.meta;
        this.page = page;
        console.log(this.page);

        console.log(this.pagination);
      });
    },
    deleteCategory(id) {
      axios.delete(`/categories/${id}`).then(res => {
        this.categories = this.categories.filter(category => category.id !== id);
      });
    }
  }
}
</script>

<template>
  <div class="tw-container-center">
    <div class="flex justify-between items-center mb-2">
      <div class="text-2xl">Категории</div>
      <router-link :to="{name:'admin.categories.create'}">
        <button class="px-1 py-2 border border-gray-400 rounded text-gray-800 hover:bg-gray-100 font-semibold shadow">
          Создать товар
        </button>
      </router-link>
    </div>
    <template v-if="categories.length !== 0">
      <table class="tw-table">
        <thead class="tw-thead">
        <tr>
          <th class="tw-table-thead-th">id</th>
          <th class="tw-table-thead-th">Title</th>
          <th class="tw-table-thead-th"></th>
          <th class="tw-table-thead-th"></th>
          <th class="tw-table-thead-th"></th>
        </tr>
        </thead>
        <tbody class="tw-table-tbody">

        <template v-for="category in categories" :key="category.id">
          <tr>
            <td class="tw-table-tbody-td">{{ category.id }}</td>
            <td class="tw-table-tbody-td">{{ category.title }}</td>
            <td class="tw-table-tbody-td">
              <router-link class="tw-link-blue" :to="{name:'admin.categories.show',params:{id:category.id}}">
                Show
              </router-link>
            </td>
            <td class="tw-table-tbody-td">
              <router-link class="tw-link-blue" :to="{name:'admin.categories.edit',params:{id:category.id}}">
                Edit
              </router-link>
            </td>
            <td class="tw-table-tbody-td">
              <a @click.prevent="deleteCategory(category.id)" class="tw-link-red">Delete</a>
            </td>
          </tr>
        </template>

        </tbody>
      </table>

      <div class="flex justify-center mt-2">
        <nav>

          <ul class="flex">

            <li @click.prevent="getAllCategories()" v-if="pagination.current_page !== 1"
                class="tw-pagination-left-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
              </svg>
            </li>

            <template v-for="link in pagination.links">
              <li v-if="Number(link.label)
                  && (pagination.current_page - link.label < 2
                  && pagination.current_page - link.label > -2)
                  || Number(link.label === 1) || Number(link.label === pagination.last_page)"
                  :class="link.active ? 'tw-pagination-nav-ul-li-active' :'tw-pagination-nav-ul-li'"
                  @click.prevent="getAllCategories(link.label)">
                {{ link.label }}
              </li>
            </template>

            <li @click.prevent="getAllCategories(pagination.last_page)"
                v-if="pagination.current_page !== pagination.last_page" class="tw-pagination-right-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </li>

          </ul>

        </nav>

      </div>

    </template>


    <template v-else>
      <div class="flex justify-center mt-20">
        <p class="text-2xl text-red-500">Категорий нет!</p>
      </div>
    </template>
  </div>

</template>

<style scoped>

</style>