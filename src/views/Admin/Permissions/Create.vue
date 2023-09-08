<script xmlns="http://www.w3.org/1999/html">
import axios from "@/axios";
import router from "@/router";
import {mapGetters} from "vuex";
import Errors from "@/views/Admin/Common/Errors.vue";

export default {
  components: {Errors},
  mounted() {
    this.$store.commit('setPermission', {
      name: '',
      description: ''
    });
  },
  computed: {
    ...mapGetters({
      errors: 'errors',
      permission: 'permission'
    }),
  }
}
</script>


<template>
  <div>
    <div class="tw-container-center mt-2 ">
      <router-link class="tw-link-blue" :to="{ name: 'admin.permissions.index' }">Назад</router-link>

      <div class="space-y-1">
        <div>
          <p class="py-0.5 text-3xl">Создание полномочия</p>
        </div>

        <Errors :errors="errors"></Errors>

        <input
            v-model="permission.name"
            class="tw-red-input"
            type="text"
            placeholder="Название">

        <textarea
            v-model="permission.description"
            class="tw-red-input"
            type="text"
            placeholder="Описание"></textarea>


        <button class="tw-gray-button"
                @click.prevent="this.$store.dispatch('createPermission',{
                name:permission.name,
                description:permission.description
                })"
                type="button">Создать
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
