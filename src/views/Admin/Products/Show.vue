<script>
import axios from "@/axios";

export default {
  data() {
    return {
      hideImages: false
    };
  },
  name: "Show",
  methods: {
    hideImagesMethod() {
      this.hideImages = this.hideImages === false;
    }
  },
  mounted() {
    this.$store.dispatch('getProductById', this.$route.params.id);
  },
  computed: {
    product() {
      return this.$store.getters.product;
    }
  }
}
</script>

<template>
  <div class="min-h-screen">
    <div class="tw-container-center">
      <router-link class="tw-link-blue" :to="{ name: 'admin.products.index' }">Назад</router-link>

      <div class="title">
        <div mt-2>
          <h1 class="text-3xl  px-1 py-1 font-sans shadow rounded inline">{{ product.title }}</h1>
        </div>
      </div>

      <div class="w-full md:grid grid-cols-12 mt-6 py-4 px-2 rounded shadow-2xl">
        <div class="w-full  md:col-span-6">
          <div class="grid grid-cols-12 gap-y-5 ">
            <div class="col-span-12">
          <span class="shadow rounded py-3">
          Опубликовано: {{ product.is_published ? 'Да' : 'Нет' }}
          </span>
            </div>
            <div class="col-span-12">
          <span class="shadow rounded py-2 ">
            Цена: {{ product.price }}
          </span>
            </div>
            <div class="col-span-12">
          <span class="shadow rounded py-1 whitespace-nowrap">
           На складе: {{ product.quantity }} шт
          </span>
            </div>
          </div>
        </div>
        <div class="col-span-6 mt-2">
          <template v-if="product.preview_image">
            <img class="w-full shadow h-[7.2rem]" :src="product.preview_image" alt="">
          </template>
          <template v-else>
            <div class="flex justify-center items-center h-[7.2rem] shadow mr-2 rounded text-center">Превью-изображение
              еще не установлено
            </div>
          </template>
        </div>
      </div>

      <div class="category">
        <template v-if="product.category">
          <div class="mt-2">
            <span class="text-3xl">Category - {{ product.category.title }}</span>
          </div>
        </template>

        <template v-else>
          <div class="flex justify-center items-center h-[7.2rem]  text-gray-500">Категории нет</div>
        </template>
      </div>

      <div class="tags">
        <template v-if="product.tags">
          <h2 class="text-3xl mb-1">Теги</h2>
          <nav class="space-y-1.5">
            <ul v-for="tag in product.tags">
              <li class=" px-2 py-1 shadow shadow-black rounded">
                {{ tag.title }}
              </li>
            </ul>
          </nav>
        </template>
        <template v-else>
          <div class="flex justify-center items-center h-[7.2rem]  text-gray-500">Тегов нет</div>
        </template>
      </div>

      <div class="description">
        <div class="mb-2">
          <div class="text-3xl">Описание</div>
          <span class="px-0.5">
        {{ product.description }}
        </span>
        </div>
      </div>

      <template v-if="hideImages">
        <a @click.prevent="hideImagesMethod" class="text-3xl tw-link-blue">Показать картинки</a>
      </template>
      <template v-else>
        <a @click.prevent="hideImagesMethod" class="text-3xl tw-link-red ">Скрыть картинки</a>
      </template>

      <div class="images" :class="{ 'opacity-0': hideImages }">
        <div class=" rounded shadow px-2 py-2 mt-4 transition-opacity duration-500 ">
          <template v-if="product.images">
            <div class="w-full md:grid grid-cols-12 gap-x-1">
              <div class="col-span-6" v-for="image in product.images" :key="image.id">
                <img class="w-full h-64 mt-3 shadow rounded" :src="image.url" alt="">
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex justify-center items-center h-[7.2rem]  text-gray-500">Изображения еще не установлены</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>