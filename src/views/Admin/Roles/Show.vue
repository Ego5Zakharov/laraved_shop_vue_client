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
            <div class="shadow rounded text-3xl">Полномочия роли:
              <template v-if="!role.permissions.length>0"> полномочий нет</template>
              <div class="flex text-xl flex-wrap">
                <nav class="border rounded px-2 py-1 mx-1 my-0.5 shadow bg-gradient-to-l from-cyan-200 to-fuchsia-300 "
                     v-for="permission in role.permissions" :key="permission.id">
                  {{ permission.name }}
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