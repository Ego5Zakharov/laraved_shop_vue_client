<script>
import axios from "@/axios";
import router from "@/router";
import {mapGetters} from "vuex";
import Errors from "@/components/Common/Errors.vue";


export default {
  components: {Errors},
  data() {
    return {
      selectedPermissions: []
    }
  },
  mounted() {
    this.$store.commit('setRole', {name: ''});
    this.$store.dispatch('getAllPermissionsForAction');
  },
  computed: {
    ...mapGetters({
      errors: 'errors',
      permissionsForActions: 'permissionsForActions',
      role: 'role',
    }),
  }
}
</script>


<template>
  <div>
    <div class="tw-container-center mt-2 ">
      <router-link class="tw-link-blue" :to="{ name: 'admin.roles.index' }">Назад</router-link>

      <div class="space-y-1">
        <div>
          <p class="py-0.5 text-3xl">Создание роли</p>
        </div>

        <Errors :errors="errors"></Errors>

        <input
            v-model="role.name"
            class="tw-red-input"
            type="text"
            placeholder="Название">

        <template v-if="permissionsForActions">
          <div> Выберите полномочия для роли</div>
          <select class="w-full border rounded shadow optional:checked:bg-red-950" v-model="selectedPermissions"
                  multiple>
            <option
                v-for="permission in permissionsForActions"
                :key="permission.id"
                :value="permission.id">
              {{ permission.name }}
            </option>
          </select>
        </template>
        <br>
        <button class="tw-gray-button"
                @click.prevent="this.$store.dispatch('createRole',{role:{...this.role,permissions:selectedPermissions}})"
                type="button">Создать
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
