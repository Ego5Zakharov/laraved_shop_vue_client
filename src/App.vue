<template>
  <div>
    <router-link to="/some">Some</router-link>
    <router-link to="/second">Second</router-link>
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