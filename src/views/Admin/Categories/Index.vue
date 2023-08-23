<script>
import axios from "@/axios";

export default {
  name: "Index",
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.getAllCategories();
  },

  methods: {
    getAllCategories() {
      axios.get('categories/').then(res => {
        this.categories = res.data.data;
      })
    }
  }
}
</script>

<template>
  <div class="tw-container-center ">

    <div class="flex justify-between items-center mb-2">
      <div class="text-2xl">Категории</div>
      <router-link :to="{name:'admin.categories.create'}">
        <button class="border py-2 px-1 rounded">Создать товар</button>
      </router-link>
    </div>

    <table class="tw-table">
      <thead class="tw-thead">
      <tr>
        <th class="tw-table-thead-th">id</th>
        <th class="tw-table-thead-th">Title</th>
      </tr>
      </thead>
      <tbody class="tw-table-tbody">
      <template v-for="category in categories" :key="category.id">
        <tr>
          <td class="tw-table-tbody-td">{{ category.id }}</td>
          <td class="tw-table-tbody-td">{{ category.title }}</td>
        </tr>
      </template>
      </tbody>
    </table>

  </div>

</template>

<style scoped>

</style>