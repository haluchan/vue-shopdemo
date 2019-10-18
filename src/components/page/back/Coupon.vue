<template>
  <div class="table-responsive">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-outline-primary mt-4" @click="openModal('new')">建立新優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <td width="80">項次</td>
        <td>名稱</td>
        <td width="80">折扣</td>
        <td width="120">使用期限</td>
        <td width="80">是否啟用</td>
        <td class="text-center" width="160">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in coupons" :key="item.id" >
        <td>{{ item.num }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}</td>
        <td>{{ item.due_date }}</td>
        <td class="text-center">
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td class="text-center">
          <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">編輯</button><span>&nbsp;</span>
          <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">刪除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <!--   分頁 -->
    <Pagination :page-data="pagination" @updatePage="getPage"
    ></Pagination>
    <!--    新增視窗-->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" >
              <span>新增優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">名稱</label>
                  <input type="text" class="form-control" id="title"
                         placeholder="請輸入標題" v-model="tempCoupon.title">
                </div>
                <div class="form-group">
                  <label for="percent">折扣</label>
                  <input type="number" class="form-control" id="percent"
                         placeholder="請輸入折扣"
                         v-model.number="tempCoupon.percent"
                         min="0" max="100">
                </div>
                <div class="form-group">
                  <label for="due-date">到期日</label>
                  <input type="date" class="form-control" id="due-date"
                         placeholder="請輸入到期日" v-model="tempCoupon.due_date">
                </div>
                <div class="form-group">
                  <label for="code">代碼 </label>
                  <input type="text" class="form-control" id="code"
                         placeholder="請輸入代碼" v-model="tempCoupon.code">
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="is_enabled" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
                    @click="updateCoupon"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <!--    刪除確認視窗-->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong>  優惠卷(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
                    @click="updateCoupon"
            >確認刪除</button>
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
  name: 'coupon',
  components: {
    Pagination
  },
  data () {
    return {
      coupons: [],
      page: {},
      pagination: {},
      tempCoupon: {
        percent: {
          Type: Number,
          required: true
        }
      },
      modalType: '',
      isLoading: false
    }
  },
  methods: {
    openModal (type, item) {
      if (type === 'delete') {
        this.tempCoupon = Object.assign({}, item)
        this.modalType = type
        $('#delCouponModal').modal('show')
      } else {
        this.tempCoupon = Object.assign({}, item) // es6寫法，取消item傳參考特性複製給tempCoupon，只複製值
        if (type === 'new') {
          this.tempCoupon = {}
        }
        this.modalType = type
        $('#couponModal').modal('show')
      }
    },
    getCoupon (page = 1) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    updateCoupon (code) {
      let url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`
      let httpMethod
      const vm = this
      if (vm.modalType === 'edit') {
        url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      } else if (vm.modalType === 'delete') {
        url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'delete'
      } else if (vm.modalType === 'new') {
        httpMethod = 'post'
      }
      this.$http[httpMethod](url, { data: vm.tempCoupon }).then((response) => {
        // console.log(response)
        if (response.data.success) {
          $('#couponModal').modal('hide')
          $('#delCouponModal').modal('hide')
          vm.getCoupon(vm.page)
          console.log('操作成功')
        } else {
          $('#couponModal').modal('hide')
          $('#delCouponModal').modal('hide')
          vm.getProducts(vm.page)
          console.log('操作失敗')
        }
        vm.modalType = ''
      })
    },
    // 把分頁的值傳回
    getPage (page) {
      this.page = page
      this.getCoupon(page)
    }
  },
  created () {
    this.getCoupon()
  }
}
</script>

<style scoped>

</style>
