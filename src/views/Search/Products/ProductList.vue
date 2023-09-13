<script>
import Product from "@/views/Search/Products/Product.vue";

export default {
  name: "ProductList",
  components: {Product},
  props: {
    products: Array,
  }
}
</script>

<template>
  <div v-for="product in products"
       :key="product.id" class="product-card-header">
    <Product :product="product"></Product>
  </div>
</template>

<style scoped>
.product-card-header {
  @apply border rounded p-4
  hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
  my-2 mx-2 transition-all
}
</style>