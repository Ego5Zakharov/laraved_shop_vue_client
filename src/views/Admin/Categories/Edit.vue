<script>
import axios from "@/axios";
import router from "@/router";

export default {
  name: 'Edit',
  data() {
    return {
      category: {
        id: null,
        title: ''
      },
      errors: []
    }
  },
  methods: {
    getCategoryById(id) {
      axios.get(`/categories/${id}/`).then(res => {
        const categoryData = res.data.data;
        this.category.title = categoryData.title;
        this.category.id = categoryData.id;
      });
    },
    updateCategory(id) {
      axios.patch(`/categories/${id}`, {title: this.category.title}).then(res => {
        router.push({name: 'admin.categories.index'});
      }).catch(error => {
        this.errors = [];

        if (error.response && error.response.data && error.response.data.errors) {
          const serverErrors = error.response.data.errors;

          for (const key in serverErrors) {
            if (serverErrors.hasOwnProperty(key)) {
              const messages = serverErrors[key];
              this.errors.push(...messages.map(message => (
                  {id: Date.now(), message: message}
              )));
            }
          }
        } else {
          this.errors.push({id: Date.now(), message: 'Ошибка при редактировании категории'});
        }
      });
    },
    closeError(error) {
      const index = this.errors.indexOf(error);

      this.errors.splice(index, 1);
    }
  },
  mounted() {
    const categoryId = this.$route.params.id;
    this.getCategoryById(categoryId);
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
            <div class="mr-2 hover:text-red-700" @click.prevent="closeError(error)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </li>
        </ul>
      </div>


      <input
          v-model="this.category.title"
          class="tw-red-input"
          type="text"
          placeholder="Название">

      <button class="tw-gray-button"
              @click.prevent="updateCategory(this.category.id)" type="button">Редактировать
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>