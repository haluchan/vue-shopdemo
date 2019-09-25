<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled' : !pagePagination.has_pre }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagePagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"  v-for="page in pagePagination.total_pages" :key="page"
          :class="{ 'active' : pagePagination.current_page === page }">
        <a class="page-link" href="#" @click.prevent="getProducts(page)" >{{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled' : !pagePagination.has_next }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagePagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mixinGetdata } from '@/mixin'
export default {
  props: ['products', 'pagination'],
  data () {
    return {
      pageProducts: this.pagination,
      pagePagination: this.products
    }
  },
  mixins: [mixinGetdata],
  methods: {
  }
}
</script>

<style scoped>

</style>
