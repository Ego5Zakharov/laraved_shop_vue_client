<script>
import NoImage from "@/views/Search/Products/NoImage.vue";

export default {
  name: "Product.vue",
  components: {NoImage},
  props: {
    product: Object
  }
}
</script>

<template>
    <div class="preview_image">
      <template v-if="product.preview_image_url">
        <img :src="product.preview_image_url"
             class="lg:h-44 w-full rounded "
             alt="">
      </template>
      <template v-else>
        <NoImage text="NoImage"></NoImage>
      </template>
    </div>

    <div>
      {{ product.title }}
    </div>

    <div>
      {{ product.price }} ₸
    </div>

</template>

<style scoped>

</style>