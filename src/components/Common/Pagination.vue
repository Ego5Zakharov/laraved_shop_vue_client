<script>
export default {
  props: {
    pagination: Object,
    paginationMethod: Function
  },
}
</script>

<template>
  <div class="flex justify-center mt-2">
    <nav>
      <ul class="flex">
        <li @click.prevent="paginationMethod(1)" v-if="pagination.current_page !== 1"
            class="tw-pagination-left-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
        </li>
        <template v-for="link in pagination.links">
          <li v-if="Number(link.label)
                  && (pagination.current_page - link.label < 2
                  && pagination.current_page - link.label > -2)
                  || Number(link.label === 1) || Number(link.label === pagination.last_page)"
              :class="link.active ? 'tw-pagination-nav-ul-li-active' :'tw-pagination-nav-ul-li'"
              @click.prevent="paginationMethod(link.label)">
            {{ link.label }}
          </li>
        </template>
        <li @click.prevent="paginationMethod(pagination.last_page)"
            v-if="pagination.current_page !== pagination.last_page" class="tw-pagination-right-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </li>
      </ul>
    </nav>

  </div>
</template>

<style scoped>

</style>