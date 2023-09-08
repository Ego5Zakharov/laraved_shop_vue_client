<script>
import {mapGetters} from "vuex";
import Errors from "@/views/Admin/Common/Errors.vue";

export default {
  name: 'Edit',
  components: {Errors},
  mounted() {
    this.$store.dispatch('getPermissionById', this.$route.params.id);
  },
  computed: {
    ...mapGetters({permission: 'permission', errors: 'errors'})
  }
}
</script>

<template>
  <div>
    <div class="tw-container-center mt-2 ">
      <router-link class="tw-link-blue" :to="{ name: 'admin.permissions.index' }">Назад</router-link>

      <div class="space-y-1">
        <div>
          <p class="py-0.5 text-3xl">Редактирование роли</p>
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
                @click.prevent="this.$store.dispatch('updatePermission', permission);"
                type="button">
          Редактировать
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>