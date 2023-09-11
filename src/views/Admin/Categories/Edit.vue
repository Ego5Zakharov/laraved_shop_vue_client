<script>
import {mapGetters} from "vuex";
import Errors from "@/components/Common/Errors.vue";

export default {
  name: 'Edit',
  components: {Errors},
  mounted() {
    this.$store.dispatch('getCategoryById', this.$route.params.id);
  },
  computed: {
    ...mapGetters(['category', 'errors'])
  }
}

</script>

<template>
  <div>
    <div class="tw-container-center mt-2 ">
      <router-link class="tw-link-blue" :to="{ name: 'admin.categories.index' }">Назад</router-link>

      <div class="space-y-1">
        <div>
          <p class="py-0.5 text-3xl">Редактирование категории</p>
        </div>
        <Errors :errors="errors"></Errors>

        <input
            v-model="category.title"
            class="tw-red-input"
            type="text"
            placeholder="Название">

        <button class="tw-gray-button"
                @click.prevent="this.$store.dispatch('updateCategory', {category: category });"
                type="button">
          Редактировать
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>