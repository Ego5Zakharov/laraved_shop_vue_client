<template>
  <div class="space-x-2">
    <router-link :key="$route.fullPath" v-if="access_token" :to="{name: 'admin.products.index'}">Products</router-link>
    <router-link
        :key="$route.fullPath"
        v-if="access_token && hasAnyPermission() && findPermission('index categories')"
        :to="{ name: 'admin.categories.index' }"
    >
      Categories
    </router-link>
    <router-link :key="$route.fullPath" v-if="access_token" :to="{name:'admin.tags.index'} ">Tags</router-link>

    <router-link :key="$route.fullPath" v-if="!access_token" :to="{name:'auth.login'} ">Login</router-link>
    <router-link :key="$route.fullPath" v-if="!access_token" :to="{name:'auth.register'} ">Registration</router-link>

    <router-link :to="{name:'home'} ">Home</router-link>

    <a href="#" :key="$route.fullPath" v-if="access_token" @click.prevent="logout">Logout</a>

    <router-view></router-view>
  </div>
</template>

<script>
import api from "@/axios/api";

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
  updated() {
    this.getAccessToken();
  },
  methods: {
    getAccessToken() {
      this.access_token = localStorage.getItem('access_token');
    },
    findPermission(permissionName) {
      return this.$store.dispatch('findPermission', permissionName);
    },
    hasAnyPermission(){
      return this.$store.dispatch('hasAnyPermission');
    },
    logout() {
      api.post('/auth/logout').then(res => {
        localStorage.removeItem('access_token');
        this.$router.push({name: 'auth.login'});
      });
    }
  },
}
</script>

<style scoped>

</style>