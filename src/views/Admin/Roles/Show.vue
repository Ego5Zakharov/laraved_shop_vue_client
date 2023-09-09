<script>
import axios from "@/axios";

export default {
  name: "Show",
  methods: {},
  mounted() {
    this.$store.dispatch('getRoleById', this.$route.params.id);
  },
  computed: {
    role() {
      return this.$store.getters.role;
    }
  }
}
</script>

<template>
  <div>
    <div class="tw-container-center">
      <router-link class="tw-link-blue" :to="{name:'admin.roles.index'}">Назад</router-link>

      <div class="space-y-2">
        <div class="text-3xl">Роль</div>

        <div class="text-2xl">
          <p>Id: {{ role.id }}</p>
          <p>Name: {{ role.name }}</p>
        </div>


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


      </div>
    </div>
  </div>
</template>

<style scoped>


</style>