<script>
import {mapGetters} from "vuex";
import Pagination from "@/components/Common/Pagination.vue";

export default {
  name: "Index",
  components: {Pagination},
  mounted() {
    this.getAllUsers(1);
  },
  methods: {
    getAllUsers(page) {
      this.$store.dispatch('getAllUsers', {page: page})
    }
  },

  computed: {
    ...mapGetters(['users', 'pagination', 'page'])
  }
}

</script>

<template>
  <div>
    <div class="tw-container-center">
      <div class="flex justify-between items-center mb-2">
        <div class="text-3xl">Пользователи</div>
      </div>
      <template v-if="users.length !== 0">
        <table class="tw-table">
          <thead class="tw-thead">
          <tr>
            <th class="tw-table-thead-th">id</th>
            <th class="tw-table-thead-th">name</th>
            <th class="tw-table-thead-th">email</th>
            <th class="tw-table-thead-th"></th>
          </tr>
          </thead>
          <tbody class="tw-table-tbody">

          <template v-for="user in users" :key="user.id">
            <tr>
              <td class="tw-table-tbody-td">{{ user.id }}</td>
              <td class="tw-table-tbody-td">{{ user.name }}</td>
              <td class="tw-table-tbody-td">{{ user.email }}</td>
<!--              <td class="tw-table-tbody-td">-->
<!--                <router-link class="tw-link-blue" :to="{name:'admin.users.show',params:{id:user.id}}">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
<!--                       stroke="currentColor" class="w-6 h-6">-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round"-->
<!--                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>-->
<!--                  </svg>-->

<!--                </router-link>-->
<!--              </td>-->
              <td class="tw-table-tbody-td">
                <router-link class="tw-link-blue" :to="{name:'admin.users.edit',params:{id:user.id}}">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                  </svg>
                </router-link>
              </td>
            </tr>
          </template>

          </tbody>
        </table>

        <Pagination :pagination="pagination" :pagination-method="getAllUsers"></Pagination>
      </template>


      <template v-else>
        <div class="flex justify-center mt-20">
          <p class="text-2xl text-red-500">Пользователей нет!</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>