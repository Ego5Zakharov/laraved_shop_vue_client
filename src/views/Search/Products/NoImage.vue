<script>
export default {
  name: "NoImage",
  props: {
    text: ''
  }
}
</script>

<template>
  <div class="h-44 rounded in flex justify-center items-center bg-gray-50 ">
    <p class="text-4xl text-blue-400">{{ this.text }}</p>
  </div>
</template>

<style scoped>

</style>