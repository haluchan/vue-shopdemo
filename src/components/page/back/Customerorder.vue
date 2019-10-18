<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 230px; background-size: cover; background-position: center"
                :style="{ backgroundImage:`url(${ item.imageUrl })` }">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">分類</span>
            <h5 class="card-title" style="height: 50px">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text" style="height: 75px">{{ item.description }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }}</div>
              <del class="h6" v-if="item.price">{{ item.origin_price }}</del>
              <div class="h5" v-if="item.price">{{ item.price }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
                    @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                    @click="addCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.addItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
<!--  編輯訂單  -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="itemNumber">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
                    @click="addCart(product.id, itemNumber)">
              <i class="fas fa-spinner fa-spin" v-if="status.addCart"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
<!--    購物車  -->
    <div class="mt-5">
      <h3 class="text-center">購物車</h3>
      <table class="table">
        <thead>
        <th></th>
        <th>品名</th>
        <th>數量</th>
        <th>原價</th>
        <th style="text-align: right">折扣</th>
        <th style="text-align: right">折扣後金額</th>
        </thead>
        <tbody>
        <tr v-for="item in cart.carts" :key="item.id">
          <td class="align-middle">
            <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="confirmDelete(item.product ,item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="align-middle">
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券
            </div>
          </td>
          <td class="align-middle">{{ item.qty }}  {{ item.product.unit }}</td>
          <td class="align-middle">{{ item.product.price | currency }}</td>
          <td class="align-middle text-right">{{ item.total - item.final_total | currency }}</td>
          <td class="align-middle text-right">{{ item.final_total | currency }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="5" class="text-right">總計</td>
          <td class="text-right">{{ cart.final_total | currency }}</td>
        </tr>
        <tr v-if=" cart.total !== cart.total ">
          <td colspan="5" class="text-right text-success">折扣價</td>
          <td class="text-right text-success">{{ cart.final_total | currency }}</td>
        </tr>
        </tfoot>
      </table>
      <div class="form-group">
        <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" placeholder="請輸入優惠碼"
                    name="coupon"
                    v-model="coupon_code">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
                    @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
        <span class="text-danger" v-if=" showCoupon_error ">優惠卷無效</span>
      </div>
<!--      刪除購物車確認視窗-->
          <div class="modal fade" id="deleteItem" tabindex="-1" role="dialog" aria-labelledby="deleteItemLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="modal-title" id="deleteItemLabel">購物車商品移除確認</h5>
            </div>
            <div class="modal-body">
              <p>是否移除下列商品</p>
            </div>
            <div class="modal-body">
              <p class="text-right font-weight-bold">{{ deleteItem.title }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
              <button type="button" class="btn btn-primary"
                      @click="deleteCartItem(deleteCartId)">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    訂購人資訊-->
    <div class="my-5 row justify-content-center">
      <div class="col-md-12 row justify-content-center">
        <h3>訂購資訊</h3>
        <div class="col-md-12 row  justify-content-center">
          <form class="col-md-6" @submit.prevent="creatOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" name="email" id="useremail"
                     placeholder="請輸入 Email"
                     v-model="form.user.email"
                     :class="{ 'is-invalid' : errors.has('email') }"
                     v-validate="'required|email'">
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" name="name" id="username"
                     v-model="form.user.name"
                     v-validate="'required'"
                     :class="{ 'is-invalid' : errors.has('name') }"
                     placeholder="輸入姓名">
              <span class="text-danger" v-if="errors.has('name')">請輸入名字</span>
            </div>

            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input type="tel" class="form-control" name="tel" id="usertel"
                     placeholder="請輸入電話"
                     v-model="form.user.tel"
                     v-validate="'required|digits:10'"
                     :class="{ 'is-invalid' : errors.has('tel') }">
              <span class="text-danger" v-if="errors.has('tel')">請輸入正確手機號碼</span>
            </div>
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input type="text" class="form-control" name="address" id="useraddress"
                     v-model="form.user.address"
                     placeholder="請輸入地址"
                     v-validate="'required'"
                     :class="{ 'is-invalid' : errors.has('address') }">
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'customerOrder',
  data () {
    return {
      products: [],
      product: {},
      itemNumber: 1,
      deleteItem: {},
      deleteCartId: '',
      status: {
        loadingItem: '',
        addItem: '',
        addCart: false
      },
      cart: {},
      discountTotalPrice: '',
      coupon_code: '',
      showCoupon_error: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  computed: {},
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then((response) => {
        vm.$store.dispatch('updateLoading', false)
        vm.products = response.data.products
      })
    },
    getProduct (id) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`
      const vm = this
      vm.status.getting = true
      vm.status.loadingItem = id
      this.$http.get(url).then((response) => {
        vm.status.loadingItem = ''
        vm.status.getting = false
        vm.product = response.data.product
        $('#productModal').modal('show')
      })
    },
    addCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      const cart = {
        'product_id': id,
        qty
        // es6寫法，會變'qty':qyt
      }
      vm.status.addItem = id
      this.$http.post(url, { data: cart }).then(response => {
        vm.getCart()
        $('#productModal').modal('hide')
        vm.status.addItem = ''
      })
    },
    deleteCartItem (id) {
      $('#deleteItem').modal('hide')
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
      const vm = this
      this.$http.delete(url).then(response => {
        if (response.data.success) {
          vm.getCart()
          vm.deleteCartId = ''
        } else {
          console.log('移除失敗', response.data.message)
        }
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then((response) => {
        console.log('cart', response)
        vm.cart = response.data.data
        vm.$store.dispatch('updateLoading', false)
      })
    },
    confirmDelete (item, id) {
      $('#deleteItem').modal('show')
      this.deleteItem = item
      this.deleteCartId = id
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      this.$http.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          console.log('coupon', response)
          vm.getCart()
        } else {
          vm.showCoupon_error = true
        }
        vm.showCoupon_error = false
        vm.$store.dispatch('updateLoading', false)
      })
    },
    creatOrder () {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`
      const vm = this

      const order = vm.form
      this.$validator.validate().then(result => {
        if (result) {
          vm.$store.dispatch('updateLoading', true)
          this.$http.post(url, { data: order }).then((response) => {
            console.log('訂單已建立', response)
            if (response.data.success) {
              vm.$store.dispatch('updateLoading', false)
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
          })
        } else {
          console.log('輸入欄位不完整')
        }
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>

<style scoped>

</style>
