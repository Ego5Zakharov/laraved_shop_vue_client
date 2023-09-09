<script>
import {mapGetters} from "vuex";
import Errors from "@/views/Admin/Common/Errors.vue";

export default {
  name: 'Edit',
  components: {Errors},
  data() {
    return {
      selectedPermissions: []
    }
  },
  mounted() {
    this.$store.dispatch('getRoleById', this.$route.params.id);
    this.$store.dispatch('getAllPermissionsForAction')
  },
  computed: {
    ...mapGetters({
      role: 'role',
      permissionsForActions: 'permissionsForActions',
      errors: 'errors'
    })
  }
}
</script>

<template>
  <div>
    <div class="tw-container-center mt-2 ">
      <router-link class="tw-link-blue" :to="{ name: 'admin.roles.index' }">Назад</router-link>

      <div class="space-y-1">
        <div>
          <p class="py-0.5 text-3xl">Редактирование роли</p>
        </div>

        <Errors :errors="errors"></Errors>

        <input
            v-model="role.name"
            class="tw-red-input"
            type="text"
            placeholder="Название">


        <template v-if="permissionsForActions">
          <select class="w-full rounded shadow" v-model="selectedPermissions" multiple>
            <option class="text-2xl" selected disabled>Добавление новых полномочий для роли</option>
            <option class="text-xl" v-for="permission in permissionsForActions"
                    :key="permission.id"
                    :value="permission.id">
              {{ permission.name }}
            </option>
          </select>
        </template>

        <div class="permissions">
          <template v-if="role.permissions">
            <div class="shadow rounded text-3xl">
              Полномочия роли:
              <template v-if="!role.permissions.length > 0">полномочий нет</template>
              <div class="flex text-xl flex-wrap">
                <nav
                    class="flex justify-between items-center border rounded px-2 py-1 mx-1 my-0.5 shadow
                     bg-gradient-to-l from-cyan-200 to-fuchsia-300
                     transition-transform transform opacity-100"
                    v-for="permission in role.permissions"
                    :key="permission.id"
                >
                  <div>
                    {{ permission.name }}
                  </div>

                  <div
                      @click.prevent="this.$store.dispatch('detachPermissionFromRole', {roleId:role.id,permissionId:permission.id})"
                      class="tw-link-red ml-1 mt-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </div>
                </nav>
              </div>
            </div>
          </template>
        </div>


        <button class="tw-gray-button"
                @click.prevent="this.$store.dispatch('updateRole', {role:{...role,permissions:selectedPermissions}});"
                type="button">
          Редактировать
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>