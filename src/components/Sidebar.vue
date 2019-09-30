<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h4 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h4>
        <ul class="nav flex-column">
          <li class="nav-item" @click="activeClass('products')">
            <router-link to="/admin/products"
                         class="nav-link " :class="{ active: isActive === 'products' }" >
                <i class="fab fa-product-hunt"></i>
                產品
            </router-link>
          </li>
          <li class="nav-item" @click="activeClass('order')">
            <router-link to="/admin/order"
                         class="nav-link" :class="{ active: isActive === 'order' }">
                <i class="fas fa-list-alt"></i>
                訂單
            </router-link>
          </li>
          <li class="nav-item" @click="activeClass('coupon')">
            <router-link to="/admin/coupon"
                         class="nav-link" href="#" :class="{ active: isActive === 'coupon' }">
                <i class="fas fa-ticket-alt"></i>
                優惠卷
            </router-link>
          </li>
        </ul>

        <h4 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h4>
        <ul class="nav flex-column mb-2">
          <li class="nav-item" @click="activeClass('customerOrder')">
            <router-link to="/customer_order"
                         class="nav-link" href="#" :class="{ active: isActive === 'customerOrder' }">
              <span data-feather="file-text"></span>
              <i class="fas fa-shopping-cart"></i>
              模擬訂單
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      isActive: 'products'
    }
  },
  methods: {
    activeClass (page) {
      this.isActive = page
    }
  }
}
</script>

<style scoped>

</style>
