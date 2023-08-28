<script>
import {mapGetters} from "vuex";

export default {
  name: 'Edit',
  mounted() {
  this.$store.dispatch('getCategoryById', this.$route.params.id);
  },
  computed: {
    ...mapGetters(['category', 'errors'])
  }
}

</script>

<template>
  <div class="tw-container-center mt-2 ">
    <router-link class="tw-link-blue" :to="{ name: 'admin.categories.index' }">Назад</router-link>

    <div class="space-y-1">
      <div>
        <p class="py-0.5 text-3xl">Редактирование категории</p>
      </div>
      <div v-if="errors.length">
        <ul class="" v-for="error in errors" :key="error.id">
          <li class="rounded py-3 bg-red-200 shadow mt-1 flex justify-between">
            <div>
              {{ error.message }}
            </div>
            <div class="mr-2 hover:text-red-700" @click.prevent="this.$store.dispatch('closeError',error)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </li>
        </ul>
      </div>

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
</template>

<style scoped>

</style>