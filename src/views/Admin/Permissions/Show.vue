<script>
import axios from "@/axios";

export default {
  name: "Show",
  methods: {},
  mounted() {
    this.$store.dispatch('getPermissionById', this.$route.params.id);
  },
  computed: {
    permission() {
      return this.$store.getters.permission;
    }
  }
}
</script>

<template>
  <div>
    <div class="tw-container-center">
      <router-link class="tw-link-blue" :to="{name:'admin.permissions.index'}">Назад</router-link>

      <div class="space-y-2">
        <div class="text-3xl">Полномочие</div>

        <div class="text-2xl">
          <p>Id: {{ permission.id }}</p>
          <p>Name: {{ permission.name }}</p>
          <p>Описание: {{ permission.description ? permission.description : 'не добавлено' }}</p>
        </div>

        <div class="permissions">
          <template v-if="permission.permissions">
            <div class="shadow rounded text-3xl">Полномочия роли:
              <div class="flex text-xl flex-wrap">
                <nav class="border rounded px-2 py-1 mx-1 my-0.5 shadow bg-gradient-to-l from-cyan-200 to-fuchsia-300 "
                     v-for="permission in permission.permissions" :key="permission.id">
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