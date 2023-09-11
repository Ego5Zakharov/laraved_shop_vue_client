<script>

import Errors from "@/components/Common/Errors.vue";
import {mapGetters} from "vuex";

export default {
  name: "Register",
  components: {Errors},
  mounted() {
    this.$store.commit('setAuth', {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })
  },
  computed: {
    ...mapGetters({
      errors: 'errors',
      auth: 'auth',
    }),
  },
  methods: {
    register() {
      this.$store.dispatch('register', {auth: this.auth});
    }
  }
}
</script>

<template>
  <div>

    <div class="tw-container-center">
      <div class="mt-1">
        <h2 class="text-3xl text-center font-light font mb-2">Registration</h2>
      </div>
      <div class="w-full lg:w-7/12 mx-auto  px-3 py-2 rounded shadow shadow-gray-500">
    <errors :errors="errors"></errors>

        <label class="tw-label-xl">Name</label>
        <input v-model="auth.name"
               class="tw-red-input"
               type="text"
               placeholder="Введите свое имя">

        <label class="tw-label-xl">Email</label>
        <input v-model="auth.email"
               class="tw-red-input"
               type="email"
               placeholder="Введите свой логин">

        <label class="tw-label-xl">Password</label>
        <input v-model="auth.password"
               class="tw-red-input"
               type="password"
               placeholder="Введите свой пароль">

        <label class="tw-label-xl">Password confirm</label>
        <input v-model="auth.password_confirmation"
               class="tw-red-input"
               type="password"
               placeholder="Введите свой пароль снова">

        <div class="flex justify-between">
          <button class="tw-gray-button" @click.prevent="register">Register</button>

          <div class="mt-2 flex items-center">
            <router-link :to="{name:'auth.login'}" class="tw-link-blue-sm">Есть аккаунт?</router-link>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>