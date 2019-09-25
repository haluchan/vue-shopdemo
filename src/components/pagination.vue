<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled' : !pagination.has_pre }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"  v-for="page in pagination.total_pages" :key="page"
          :class="{ 'active' : pagination.current_page === page }">
        <a class="page-link" href="#" @click.prevent="getProducts(page)" >{{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled' : !pagination.has_next }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
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
      // pagination: {}
      pageProducts: this.products,
      pagePagination: this.pagination
    }
  },
  mixins: [mixinGetdata],
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log(response)
        vm.isLoading = false
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
      // this.$emit('page', page)
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
