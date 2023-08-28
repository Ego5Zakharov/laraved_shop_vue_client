<script>
import axios from "@/axios";

export default {
  name: "Show",
  methods: {},
  mounted() {
    this.$store.dispatch('getTagById', this.$route.params.id);
  },
  computed: {
    tag() {
      return this.$store.getters.tag;
    }
  }
}
</script>

<template>
  <div class="tw-container-center">
    <router-link class="tw-link-blue" :to="{name:'admin.tags.index'}">Назад</router-link>

    <div class="space-y-2">
      <div class="text-3xl">Тэг</div>

      <div class="text-2xl">
        <p>Id: {{ tag.id }}</p>
        <p>Title: {{ tag.title }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>