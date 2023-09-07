<script>
import axios from "@/axios";

export default {
  name: "Show",
  methods: {},
  mounted() {
    this.$store.dispatch('getUserById', this.$route.params.id);
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
}
</script>

<template>
  <div>
    <div class="tw-container-center">
      <router-link class="tw-link-blue" :to="{name:'admin.users.index'}">Назад</router-link>

      <div class="space-y-3">
        <div class="text-3xl">Пользователь</div>

        <div class="text-2xl">
          <p>Id: {{ user.id }}</p>
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
        </div>

        <div class="roles">
          <template v-if="user.roles">
            <div class="shadow rounded text-center text-3xl">Роли пользователя:
              <div v-for="role in user.roles" :key="role.id">
                <div class="text-2xl">{{ role.name }}</div>
              </div>
            </div>
          </template>
        </div>


        <div class="permissions">
          <template v-if="user.permissions">
            <div class="shadow rounded text-3xl">Полномочия пользователя:
              <div class="flex text-xl flex-wrap">
                <nav class="border rounded px-2 py-1 mx-1 my-0.5 shadow bg-gradient-to-l from-cyan-200 to-fuchsia-300 " v-for="permission in user.permissions" :key="permission.id">
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