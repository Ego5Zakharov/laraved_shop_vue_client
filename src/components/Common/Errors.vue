<script>
export default {
  name: 'Errors',
  props: {
    errors: Array
  }
}
</script>

<template>
  <div v-if="errors.length">
    <ul class="" v-for="error in errors" :key="error.id">
      <li class="rounded py-3 bg-red-200 shadow mt-1 flex justify-between">
        <div>
          {{ error.message }}
        </div>
        <div class="mr-2 hover:text-red-700 cursor-pointer" @click.prevent="this.$store.dispatch('closeError',error)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>