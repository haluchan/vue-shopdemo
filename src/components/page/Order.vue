<template>
  <div class="table-responsive">
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
      <tr>
        <td width="70">時間</td>
        <td width="140">訂單編號</td>
        <td>購買項目</td>
        <td class="text-center" width="120">付款完成</td>
        <td class="text-center" width="160">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in orders" :key="item.id" >
        <td>{{ item.create_at }}</td>
        <td>{{ item.id }}</td>
        <td>
          <div v-for="product in item.products" :key="product.id">
            <div> {{ product.product.title}} {{ product.qty}} {{ product.product.unit }}</div>
          </div>
        </td>
        <td class="text-center">
          <span v-if="item.is_paid" class="text-success">是</span>
          <span v-else>否</span>
        </td>
        <td class="text-center">
          <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">內容</button><span>&nbsp;</span>
          <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">刪除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <!--   分頁 -->
    <Pagination :page-data="pagination" @updatePage="getPage"></Pagination>
    <!--    刪除確認視窗-->
<!--    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"-->
<!--         aria-labelledby="exampleModalLabel" aria-hidden="true">-->
<!--      <div class="modal-dialog" role="document">-->
<!--        <div class="modal-content border-0">-->
<!--          <div class="modal-header bg-danger text-white">-->
<!--            <h5 class="modal-title" id="exampleModalLabel">-->
<!--              <span>刪除訂單</span>-->
<!--            </h5>-->
<!--            <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--              <span aria-hidden="true">&times;</span>-->
<!--            </button>-->
<!--          </div>-->
<!--          <div class="modal-body">-->
<!--            是否刪除 <strong class="text-danger">{{ tempOrder.title }}</strong>  訂單(刪除後將無法恢復)。-->
<!--          </div>-->
<!--          <div class="modal-footer">-->
<!--            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>-->
<!--            <button type="button" class="btn btn-danger"-->
<!--                    @click="updateOrder"-->
<!--            >確認刪除</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
// import $ from 'jquery'
import Pagination from '@/components/Pagination'
export default {
  name: 'order',
  components: {
    Pagination
  },
  data () {
    return {
      orders: [],
      page: '',
      pagination: {},
      isLoading: false,
      modalType: '',
      tempOrder: {}
    }
  },
  methods: {
    updateOrder (page = 1) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`
      const vm = this
      this.isLoading = true
      this.$http.get(url).then((response) => {
        // console.log(response)
        vm.isLoading = false
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    },
    getPage (page) {
      this.page = page
      this.updateOrder(page)
    }
  },
  created () {
    this.updateOrder()
  }
}
</script>

<style scoped>

</style>
