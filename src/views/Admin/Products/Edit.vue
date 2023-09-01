<script>
import {mapGetters} from "vuex";
import Errors from "@/views/Admin/Common/Errors.vue";

export default {
  name: 'Edit',
  components: {Errors},
  mounted() {
    this.$store.dispatch("getProductById", this.$route.params.id);
    this.$store.dispatch("getCategoriesAndTagsForCreate");

    this.$store.commit("setProduct", {
      title: null,
      description: null,
      price: null,
      quantity: null,
      is_published: false,
      category_id: null,
      preview_image: '',
      tags: [],  // изначальные теги для товара
      images: [], // изначальные картинки для товара
      selectedTags2: [],
      selectedImages: []
    });
  },
  computed: {
    ...mapGetters({
      errors: "errors",
      product: "product",
      categoriesForCreate: "categoriesForCreate",
      tagsForCreate: "tagsForCreate",
      tags: "tags",
      selectedImages: 'selectedImages',
      selectedTags2: 'selectedTags2',
    })
  },
  methods: {
    handleFileChange() {
      this.product.preview_image = this.$refs.fileInputPreviewImage.files[0];

      this.product.selectedImages = Array.from(
          this.$refs.fileInputProductImages.files
      );
    }
  }
};
</script>

<template>
  <div>
    <div class="tw-container-center mt-2 ">
      <router-link
          class="tw-link-blue"
          :to="{ name: 'admin.products.index' }"
      >
        Назад
      </router-link>

      <div class="space-y-1">
        <div>
          <p class="py-0.5 text-3xl">Редактирование товара</p>
        </div>

        <Errors :errors="errors"></Errors>

        <!-- Название товара -->
        <input
            v-model="product.title"
            class="tw-red-input"
            type="text"
            placeholder="Название"
        >

        <!-- Описание товара -->
        <textarea
            v-model="product.description"
            class="tw-red-input"
            type="text"
            placeholder="Описание"
            rows="1"
        ></textarea>

        <!-- Цена товара -->
        <input
            v-model="product.price"
            class="tw-red-input"
            type="number"
            placeholder="Цена"
        >

        <!-- Количество товара -->
        <input
            v-model="product.quantity"
            class="tw-red-input"
            type="number"
            placeholder="Количество на складе"
        >

        <!-- Загрузка превью-изображения -->
        <label>Загрузка превью-изображения(необязательно)</label>
        <br>
        <input
            @change="handleFileChange"
            class="border rounded"
            type="file"
            ref="fileInputPreviewImage"
        >
        <br>
        <br>
        <label>Загрузка основных изображений(необязательно)</label>
        <!-- Загрузка нескольких изображений -->
        <br>
        <input
            multiple
            @change="handleFileChange"
            class="border rounded"
            type="file"
            ref="fileInputProductImages"
        >

        <!-- Выбор категории -->
        <template v-if="categoriesForCreate">
          <div>Выберите категорию:</div>
          <select
              class="border rounded bg-gray-100"
              v-model="product.category_id"
          >
            <option value="" disabled>Выберите категорию</option>
            <option
                v-for="category in categoriesForCreate"
                :key="category.id"
                :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </template>

        <!-- Выбор тегов -->
        <br>
        <template v-if="tagsForCreate">
          <div>Выберите теги:</div>
          <select v-model="product.selectedTags2" multiple>
            <option value="" disabled>Выберите теги(необязательно)</option>
            <option
                v-for="tag in tagsForCreate"
                :key="tag.id"
                :value="tag.id"
            >
              {{ tag.title }}
            </option>
          </select>
        </template>
        <br>

        <!-- Опубликовать на сайте? -->
        <label class="">Опубликовать на сайте?</label>
        <input
            v-model="product.is_published"
            class="ml-2"
            type="checkbox"
        >
        <br>

        <div class="category">
          <template v-if="product.category">
            <div class="mt-2">
              <span class="text-3xl">Текущая категория - {{ product.category.title }}</span>
            </div>
          </template>

          <template v-else>
            <div class="flex justify-center items-center h-[7.2rem]  text-gray-500">Категории нет</div>
          </template>
        </div>

        <!-- Теги -->
        <div class="tags">
          <template v-if="product.tags">
            <h2 class="text-3xl mb-1">Уже имеющиеся теги</h2>
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

        <!-- Список изображений -->
        <div class="images">
          <h2 class="text-3xl">Уже имеющиеся изображения</h2>
          <div class=" rounded shadow px-2 py-2 mt-4 transition-opacity duration-500 ">
            <template v-if="product.images">
              <div class="w-full md:grid grid-cols-12 gap-x-1">
                <div class="col-span-6" v-for="image in product.images" :key="image.id">
                  <img class="w-full h-64 mt-3 shadow rounded" :src="image.url" alt="">
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex justify-center items-center h-[7.2rem]  text-gray-500">Изображения еще не установлены
              </div>
            </template>
          </div>
        </div>


        <!-- Превью-изображение -->
        <div class="preview_image">
          <h2 class="text-3xl">Текущее превью изображение</h2>
          <div>
            <template v-if="product.preview_image">
              <img class="w-full shadow" :src="product.preview_image" alt="">
            </template>
            <template v-else>
              <div class="flex justify-center items-center h-[7.2rem] shadow mr-2 rounded text-center">
                Превью-изображение
                еще не установлено
              </div>
            </template>
          </div>
        </div>

        <!-- Кнопка "Сохранить изменения" -->
        <br>
        <button
            class="tw-gray-button"
            @click.prevent="this.$store.dispatch('editProduct', product )"
            type="button"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
