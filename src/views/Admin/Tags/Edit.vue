<script>
import {mapGetters} from "vuex";
import Errors from "@/views/Admin/Common/Errors.vue";

export default {
  name: 'Edit',
  components: {Errors},
  mounted() {
    this.$store.dispatch('getTagById', this.$route.params.id);
  },
  computed: {
    ...mapGetters({tag: 'tag', errors: 'errors'})
  }
}
</script>

<template>
  <div class="tw-container-center mt-2 ">
    <router-link class="tw-link-blue" :to="{ name: 'admin.tags.index' }">Назад</router-link>

    <div class="space-y-1">
      <div>
        <p class="py-0.5 text-3xl">Редактирование тега</p>
      </div>

      <Errors :errors="errors"></Errors>

      <input
          v-model="tag.title"
          class="tw-red-input"
          type="text"
          placeholder="Название">

      <button class="tw-gray-button"
              @click.prevent="this.$store.dispatch('updateTag', tag);"
              type="button">
        Редактировать
      </button>

    </div>
  </div>
</template>

<style scoped>

</style>