<script>
import {mapGetters} from "vuex";
import Errors from "@/views/Admin/Common/Errors.vue";

export default {
  components: {Errors},
  computed: {
    ...mapGetters({
      category: "category",
      errors: "errors"
    })
  },
  mounted() {
    this.$store.commit('setCategory', {title: null})
  }
}
</script>


<template>

  <div class="tw-container-center mt-2 ">
    <router-link class="tw-link-blue" :to="{ name: 'admin.categories.index' }">Назад</router-link>

    <div class="space-y-1">
      <div>
        <p class="py-0.5 text-3xl">Создание категории</p>
      </div>

      <Errors :errors="errors"></Errors>
      <input
          v-model="category.title"
          class="tw-red-input"
          type="text"
          placeholder="Название">

      <button class="tw-gray-button"
              @click.prevent="this.$store.dispatch('createCategory',{id:category.id,title:category.title})"
              type="button">Создать
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
