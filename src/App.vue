<template>
  <div class="space-x-2">
    <router-link :key="$route.fullPath" v-if="access_token && hasPermission('index products')"
                 :to="{name: 'admin.products.index'}">Products
    </router-link>

    <router-link v-if="access_token && hasPermission('index categories')"
                 :to="{ name: 'admin.categories.index' }"
    >Categories
    </router-link>

    <router-link :key="$route.fullPath" v-if="access_token && hasPermission('index products')"
                 :to="{name:'admin.tags.index'}"
    >Tags
    </router-link>

    <router-link :key="$route.fullPath" v-if="!access_token" :to="{name:'auth.login'} ">Login</router-link>
    <router-link :key="$route.fullPath" v-if="!access_token" :to="{name:'auth.register'} ">Registration</router-link>

    <router-link :to="{name:'home'} ">Home</router-link>

    <a href="#" :key="$route.fullPath" v-if="access_token" @click.prevent="this.$store.dispatch('logout')">Logout</a>

    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'App',
  data() {
    return {
      access_token: null,
    }
  },
  mounted() {
    this.getAccessToken();
  },
  computed: {
    ...mapGetters(['permissions', 'roles']),
  },
  updated() {
    this.getAccessToken();
  },
  methods: {
    getAccessToken() {
      this.access_token = localStorage.getItem('access_token');
    },
    hasPermission(permissionName) {
      const permissions = Array.from(this.permissions);

      return permissions.includes(permissionName);
    },
  },

}
</script>

<style scoped>

</style>