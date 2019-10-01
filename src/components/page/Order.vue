<template>
  <div class="table-responsive">
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
      <tr>
        <td width="70">時間</td>
        <td width="200">訂單編號</td>
        <td>購買項目</td>
        <td class="text-center" width="120">付款完成</td>
        <td class="text-center" width="80">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in orders" :key="item.id">
        <td>{{ item.create_at | dateTime}}</td>
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
          <button class="btn btn-outline-primary btn-sm" @click="getOrderDetail(item.id)">內容</button>
          <span>&nbsp;</span>
        </td>
      </tr>
      </tbody>
    </table>
    <!--   分頁 -->
    <Pagination :page-data="pagination" @updatePage="getPage"></Pagination>
    <!--    訂單內容-->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單內容</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="container">
            <div class="row">
              <div class="col">
                <div><span class="font-weight-bold">時間 :</span> {{ orderDetail.create_at | dateTime}}</div>
                <div><span class="font-weight-bold">訂單編號 : </span>{{ orderDetail.id }}</div>
                <div><span class="font-weight-bold">付款完成 : </span>
                  <span class="text-success" v-if="orderDetail.is_paid">已完成</span>
                  <span class="text-danger" v-else>尚未付款</span>
                </div>
                <div><span class="font-weight-bold">訂購人 : </span>{{ orderDetail.user.name }}</div>
                <div><span class="font-weight-bold">電話 : </span>{{ orderDetail.user.tel }}</div>
                <div><span class="font-weight-bold">地址 : </span>{{ orderDetail.user.address }}</div>
              </div>
              <div class="w-100"></div>
              <div class="col">
                <table class="table mt-4">
                  <thead>
                  <tr>
                    <td class="font-weight-bold">購買產品</td>
                    <td class="font-weight-bold">數量</td>
                    <td class="font-weight-bold">單位</td>
                    <td class="font-weight-bold">原價</td>
                    <td class="font-weight-bold">優惠價</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item) in orderDetail.products" :key="item.id">
                    <td>{{ item.product.title}}</td>
                    <td>{{ item.qty}}</td>
                    <td>{{ item.product.unit }}</td>
                    <td>{{ item.total}}</td>
                    <td>{{ item.final_total}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="float-right">
              <H5>總金額: {{ orderDetail.total }}</H5>
            </div>
            <div class="w100"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'

export default {
  name: 'order',
  components: {
    Pagination
  },
  data () {
    return {
      orders: [],
      orderDetail: {
        user: {
          name: '',
          tel: '',
          address: ''
        }
      },
      page: '',
      pagination: {},
      isLoading: false,
      modalType: '',
      tempOrder: {},
      total: ''
    }
  },
  methods: {
    updateOrder (page = 1) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`
      const vm = this
      this.isLoading = true
      this.$http.get(url).then((response) => {
        vm.isLoading = false
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    },
    getOrderDetail (orderId) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order/${orderId}`
      const vm = this
      $('#orderModal').modal('show')
      this.$http.get(url).then((response) => {
        vm.orderDetail = response.data.order
      })
    },
    closeModel () {
      $('#orderModal').modal('hide')
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
