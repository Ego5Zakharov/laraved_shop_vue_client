<template>
  <div class="space-x-2">
    <router-link :to="{name: 'admin.categories.index'}">Categories</router-link>
    <router-link :to="{name:'admin.tags.index'} ">Tags</router-link>
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