<script>
import 'flowbite';
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      access_token: null,
    }
  },
  mounted() {
    this.getAccessToken();
  },
  computed: {
    ...mapGetters(['permissionsAuth', 'rolesAuth']),
  },
  updated() {
    this.getAccessToken();
  },
  methods: {
    getAccessToken() {
      this.access_token = localStorage.getItem('access_token');
    },
    hasPermission(permissionName) {
      const permissionsAuth = Array.from(this.permissionsAuth);
      return permissionsAuth.includes(permissionName);
    },
  },
}
</script>

<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="" class="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">EgorShop</span>
        </a>
        <div class="flex items-center lg:order-2">
          <button data-collapse-toggle="mobile-menu-2" type="button"
                  class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-2" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"></path>
            </svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li v-if="access_token && hasPermission('index products')">
              <a href="#" class="nav-link">
                <router-link :to="{ name: 'home' }">Home</router-link>
              </a>
            </li>
            <li v-if="access_token && hasPermission('index products')">
              <a href="#" class="nav-link">
                <router-link :key="$route.fullPath" :to="{ name: 'admin.products.index' }">Products</router-link>
              </a>
            </li>
            <li v-if="access_token && hasPermission('index categories')">
              <a href="#" class="nav-link">
                <router-link :to="{ name: 'admin.categories.index' }">Categories</router-link>
              </a>
            </li>
            <li v-if="access_token && hasPermission('index tags')">
              <a href="#" class="nav-link">
                <router-link :key="$route.fullPath" :to="{ name: 'admin.tags.index' }">Tags</router-link>
              </a>
            </li>
            <li v-if="access_token && hasPermission('index users')">
              <a href="#" class="nav-link">
                <router-link :key="$route.fullPath" :to="{ name: 'admin.users.index' }">Users</router-link>
              </a>
            </li>
            <li v-if="access_token && hasPermission('index roles')">
              <a href="#" class="nav-link">
                <router-link :key="$route.fullPath" :to="{ name: 'admin.roles.index' }">Roles</router-link>
              </a>
            </li>
            <li v-if="access_token && hasPermission('index permissions')">
              <a href="#" class="nav-link">
                <router-link :key="$route.fullPath" :to="{ name: 'admin.permissions.index' }">Permissions</router-link>
              </a>
            </li>
            <li v-if="!access_token">
              <a href="#" class="nav-link">
                <router-link :key="$route.fullPath" :to="{ name: 'auth.register' }">Register</router-link>
              </a>
            </li>
            <li v-if="!access_token">
              <a href="#" class="nav-link">
                <router-link :key="$route.fullPath" :to="{ name: 'auth.login' }">Login</router-link>
              </a>
            </li>
            <li v-if="access_token">
              <a href="#" class="nav-link">
                <a href="#" :key="$route.fullPath" @click.prevent="this.$store.dispatch('logout')">Logout</a>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>