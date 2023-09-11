<script>
import axios from "@/axios";
import router from "@/router";
import {mapGetters} from "vuex";
import Errors from "@/components/Common/Errors.vue";


export default {
  components: {Errors},
  mounted() {
    this.$store.commit('setTag', {title: null});
  },
  computed: {
    ...mapGetters({
      errors: 'errors',
      tag: 'tag'
    }),
  }
}
</script>


<template>
  <div>
    <div class="tw-container-center mt-2 ">
      <router-link class="tw-link-blue" :to="{ name: 'admin.tags.index' }">Назад</router-link>

      <div class="space-y-1">
        <div>
          <p class="py-0.5 text-3xl">Создание тега</p>
        </div>

        <Errors :errors="errors"></Errors>

        <input
            v-model="tag.title"
            class="tw-red-input"
            type="text"
            placeholder="Название">

        <button class="tw-gray-button"
                @click.prevent="this.$store.dispatch('createTag',{id:tag.id,title:tag.title})"
                type="button">Создать
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
