<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled' : !pageData.has_pre }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="sentCurrentPage(pageData.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"  v-for="page in pageData.total_pages" :key="page"
          :class="{ 'active' : pageData.current_page === page }">
        <a class="page-link" href="#" @click.prevent="sentCurrentPage(page)" >{{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled' : !pageData.has_next }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="sentCurrentPage(pageData.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pageData'],
  data () {
    return {}
  },
  methods: {
    sentCurrentPage (page) {
      this.$emit('updatePage', page)
    }
  }
}
</script>

<style scoped>

</style>
