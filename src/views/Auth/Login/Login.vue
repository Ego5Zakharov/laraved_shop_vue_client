<script>
import Errors from "@/components/Common/Errors.vue";
import {mapGetters} from "vuex";

export default {
  name: "Login",
  components: {Errors},
  mounted() {
    this.$store.commit('setAuth',
        {
          email: '',
          password: '',
        });
  },
  computed: {
    ...mapGetters({
      auth: 'auth',
      errors: 'errors'
    })
  },
  methods: {
    login() {
      this.$store.dispatch('login', {auth: this.auth})
    }
  },

}
</script>

<template>
  <div>
    <div class="tw-container-center">
      <div class="mt-1">
        <h2 class="text-3xl text-center font-light font mb-2">Login</h2>
      </div>
      <div class="w-full lg:w-7/12 mx-auto  px-3 py-2 rounded shadow shadow-gray-500">
      <errors :errors="errors"></errors>
        <label class="tw-label-xl">Login</label>
        <input v-model="auth.email" class="tw-red-input" type="email" placeholder="Введите свой логин">

        <label class="tw-label-xl">Password</label>
        <input v-model="auth.password" class="tw-red-input" type="password" placeholder="Введите свой пароль">

        <div class="flex justify-between">
          <button class="tw-gray-button"
                  @click.prevent="login">Login
          </button>

          <div class="mt-2 flex items-center">
            <router-link :to="{name:'auth.register'}" class="tw-link-blue-sm">Нет аккаунта?</router-link>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>