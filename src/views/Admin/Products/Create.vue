<script>
import {mapGetters} from "vuex";
import Errors from "@/components/Common/Errors.vue";


export default {
  components: {Errors},
  mounted() {
    this.$store.commit('setProduct', {
      title: null,
      description: null,
      price: null,
      quantity: null,
      is_published: false,
      category_id: null,
      preview_image: null,
      tags: [],
      images: []
    });
    this.$store.dispatch('getCategoriesAndTagsForCreate');
  },
  computed: {
    ...mapGetters({
      errors: 'errors',
      product: 'product',
      tagsForCreate: 'tagsForCreate',
      categoriesForCreate: 'categoriesForCreate',
      selectedTags: 'tags'
    }),
  }, methods: {
    handleFileChange() {
      this.product.preview_image = this.$refs.fileInputPreviewImage.files[0];
      this.product.images = Array.from(this.$refs.fileInputProductImages.files);
    }
  }
}
</script>


<template>
  <div>
    <div class="tw-container-center mt-2 ">

      <router-link class="tw-link-blue" :to="{ name: 'admin.products.index' }">Назад</router-link>

      <div class="space-y-1">

        <div>
          <p class="py-0.5 text-3xl">Создание товара</p>
        </div>

        <Errors :errors="errors"></Errors>

        <input
            v-model="product.title"
            class="tw-red-input"
            type="text"
            placeholder="Название">

        <textarea
            v-model="product.description"
            class="tw-red-input"
            type="text"
            placeholder="description"
            rows="1"
        ></textarea>

        <input
            v-model="product.price"
            class="tw-red-input"
            type="number"
            placeholder="Цена">

        <input
            v-model="product.quantity"
            class="tw-red-input"
            type="number"
            placeholder="Количество на складе">

        <label>Загрузка превью-изображения</label>
        <br>
        <input
            @change="handleFileChange"
            class="border rounded"
            type="file"
            ref="fileInputPreviewImage"
        >

        <input
            multiple

            @change="handleFileChange"
            class="border rounded"
            type="file"
            ref="fileInputProductImages"
        >

        <template v-if="categoriesForCreate">
          <div>Выберите категорию:</div>
          <select class="border rounded bg-gray-100" v-model="product.category_id">
            <option value="" disabled>Выберите категорию</option>
            <option
                v-for="category in categoriesForCreate"
                :key="category.id"
                :value="category.id">
              {{ category.title }}
            </option>
          </select>
        </template>

        <br>
        <template v-if="tagsForCreate">
          <select v-model="product.tags" multiple>
            <option value="" disabled>Выберите теги</option>
            <option v-for="tag in tagsForCreate"
                    :key="tag.id"
                    :value="tag.id">{{ tag.title }}
            </option>
          </select>

        </template>
        <br>


        <label class="">Опубликовать на сайте?</label>
        <input v-model="product.is_published" class="ml-2" type="checkbox"> <br>

        <br>
        <button class="tw-gray-button"
                @click.prevent="this.$store.dispatch('createProduct',{
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                is_published: product.is_published,
                category_id: product.category_id,
                preview_image: product.preview_image,
                tags:product.tags,
                images:product.images
                })"
                type="button">Создать
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
