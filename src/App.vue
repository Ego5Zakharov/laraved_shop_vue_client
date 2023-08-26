<template>
  <div>
    <router-link :to="{name: 'admin.categories.index'}">Index Category</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>

</style>