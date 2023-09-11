<script>
import {mapGetters} from "vuex";
import Errors from "@/views/Admin/Common/Errors.vue";

export default {
  name: 'Edit',
  components: {Errors},
  data() {
    return {
      selectedPermissions: [],
      selectedRoles: []
    }
  },
  mounted() {
    this.$store.dispatch('getUserById', this.$route.params.id);
    this.$store.dispatch('getAllPermissionsForAction')
    this.$store.dispatch('getAllRolesForAction')
  },
  computed: {
    ...mapGetters({
      user: 'user',
      permissionsForActions: 'permissionsForActions',
      rolesForActions: 'rolesForActions',
      permissionsWithoutRolesRelation: 'permissionsWithoutRolesRelation',
      errors: 'errors'
    })
  }
}
</script>

<template>
  <div>
    <div class="tw-container-center mt-2 ">
      <router-link class="tw-link-blue" :to="{ name: 'admin.users.index' }">Назад</router-link>

      <div class="space-y-3">
        <div>
          <p class="py-0.5 text-3xl">Редактирование юзера</p>
        </div>

        <Errors :errors="errors"></Errors>

        <p>UserId: {{ user.id ?? 'Не определен' }}</p>
        <input
            v-model="user.name"
            class="tw-red-input rounded"
            type="text"
            disabled
            placeholder="Название">


        <div class="roles">

          <template v-if="user.roles">
            <div>Текущие роли юзера:</div>
            <div class="flex justify-between items-center" v-for="role in user.roles" :key="role.id">
              <div class="rounded w-full shadow px-2 py-2">{{ role.name }}</div>

              <div @click="this.$store.dispatch('detachRoleFromUser',{userId:user.id,roleId:role.id,})"
                   class="tw-link-red">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </div>
          </template>

          <template v-else>Ролей нет!</template>

          <template v-if="rolesForActions">
            <select class="w-full rounded shadow" v-model="selectedRoles" multiple>
              <option class="text-2xl" selected disabled>Добавление новых ролей для юзера</option>
              <option class="text-xl" v-for="role in rolesForActions"
                      :key="role.id"
                      :value="role.id">
                {{ role.name }}
              </option>
            </select>
          </template>
        </div>
        <button class="tw-gray-button"
                @click.prevent="this.$store.dispatch('attachRolesToUser',{userId:user.id,selectedRoles:selectedRoles})"
                type="button">
          Добавить выбранные роли
        </button>

        <template v-if="permissionsForActions">
          <select class="w-full rounded shadow" v-model="selectedPermissions" multiple>
            <option class="text-2xl" selected disabled>Добавление новых полномочий для юзера</option>
            <option class="text-xl" v-for="permission in permissionsForActions"
                    :key="permission.id"
                    :value="permission.id">
              {{ permission.name }}
            </option>
          </select>
        </template>

        <button class="tw-gray-button"
                @click.prevent="this.$store.dispatch('attachPermissionsToUser',{userId:user.id,selectedPermissions:selectedPermissions})"
                type="button">
          Добавить выбранные полномочия
        </button>

        <div class="permissions">
          <template v-if="user.permissions">
            <div class="shadow rounded text-3xl">
              Полномочия юзера от ролей:
              <template v-if="!user.permissions.length > 0">полномочий нет</template>
              <div class="flex text-xl flex-wrap">
                <nav
                    class="flex justify-between items-center border rounded px-2 py-1 mx-1 my-0.5 shadow
                     bg-gradient-to-l from-cyan-200 to-fuchsia-300
                     transition-transform transform opacity-100"
                    v-for="permission in user.permissions"
                    :key="permission.id"
                >
                  <div>
                    {{ permission.name }}
                  </div>

                </nav>
              </div>
            </div>
          </template>
        </div>

        <div class="permissions">
          <template v-if="user.permissions">
            <div class="shadow rounded text-3xl">
              Полномочия юзера независимые от ролей:
              <template v-if="!user.permissionsWithoutRolesRelation.length > 0">полномочий нет</template>
              <div class="flex text-xl flex-wrap">
                <nav
                    class="flex justify-between items-center border rounded px-2 py-1 mx-1 my-0.5 shadow
                     bg-gradient-to-l from-cyan-200 to-fuchsia-300
                     transition-transform transform opacity-100"
                    v-for="permission in user.permissionsWithoutRolesRelation"
                    :key="permission.id"
                >

                  <div class="flex justify-between items-center">
                    <div>
                      {{ permission.name }}
                    </div>

                    <div
                        @click="this.$store.dispatch('detachPermissionFromUser',{userId:user.id,permissionId:permission.id,})"
                        class="tw-link-red ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
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