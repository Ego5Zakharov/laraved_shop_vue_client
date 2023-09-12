<script>
import api from "@/axios/api";

export default {
  name: "Search",
  data() {
    return {
      searchField: '',
    }
  },
  methods: {
    searchProducts() {
      api.post('/searchProducts', {'search_field': this.searchField}).then(res => {
        console.log(res.data);
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<template>
  <div class="tw-container-center">
    <div class="relative items-center">
      <input class="w-full rounded"
             v-model="searchField"
             type="text"
             placeholder="Поиск">

      <div @click.prevent="searchProducts" class="absolute right-2 top-2.5 tw-link-blue">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
        </svg>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>