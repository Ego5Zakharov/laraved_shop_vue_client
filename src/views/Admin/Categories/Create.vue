<script>
import axios from "@/axios";
import router from "@/router";
import {mapGetters} from "vuex";

export default {
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
              @click.prevent="this.$store.dispatch('createCategory',{id:category.id,title:category.title})"
              type="button">Создать
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
