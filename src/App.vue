<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>

</template>

<script>
import {mapGetters} from "vuex";
import AdminHeader from "@/components/Includes/Admin/AdminHeader.vue";
import Header from "@/components/Includes/Header.vue";
import Footer from "@/components/Includes/Footer.vue";

export default {
  name: 'App',
  components: {Footer, Header, AdminHeader},
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

<style scoped>

</style>