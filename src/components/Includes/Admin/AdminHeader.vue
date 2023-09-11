<script>
import {mapGetters} from "vuex";

export default {
  name: "AdminHeader",
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












</template>

<style scoped>

</style>