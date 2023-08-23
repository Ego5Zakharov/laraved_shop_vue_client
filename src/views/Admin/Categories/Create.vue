<script>
import axios from "@/axios";
import router from "@/router";

export default {
  data() {
    return {
      name: ''
    }
  },

  methods: {
    createCategory() {
      axios.post('/api/categories/', {name: this.name}).then(res => {
        console.log(res.data.data);
        router.push({ name: 'admin.categories.index' }); // Добавляем редирект
      });
    }
  }
}
</script>

<template>
  <div class="tw-container">
    <input class="min-w-full" v-model="name" type="text">
    <button @click.prevent="createCategory">Создать</button>
  </div>
</template>

<style scoped>

</style>
