<script>
import axios from "@/axios";

export default {
  name: "Show",
  methods: {},
  mounted() {
    this.$store.dispatch('getCategoryById', this.$route.params.id);
  },
  computed: {
    category() {
      return this.$store.getters.category;
    }
  }
}
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>

</style>