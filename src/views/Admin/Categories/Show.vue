<script>
import axios from "@/axios";

export default {
  name: "Show",
  data() {
    return {
      category: {
        id: null,
        title: '',
      }
    }
  },
  methods: {
    getCategoryById(id) {

      axios.get(`/categories/${id}/`).then(res => {
        const categoryData = res.data.data;
        this.category.title = categoryData.title;
        this.category.id = categoryData.id;
      });
    }
  },
  mounted() {
    const categoryId = this.$route.params.id;
    this.getCategoryById(categoryId);
  }
}
</script>

<template>
  <div class="tw-container-center">
    <router-link class="tw-link-blue" :to="{name:'admin.categories.index'}">Назад</router-link>

    <div class="space-y-2 ">
      <div class="text-3xl">Категория</div>

      <div class="text-2xl">
        <p>Id: {{ category.id }}</p>
        <p>Title: {{ category.title }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>