<template>
  <div class="container-fluid">
    <main role="main" class="mt-5">
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
                    @click="deleteCartItem(item.product ,item.id)">
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
        <span class="text-danger" v-if=" getCouponActiv ">優惠卷無效</span>
      </div>
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
            </form>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="container-fluid text-center">
          <router-link to="/product">
            <button class="btn btn-secondary" style="margin-right: 10px">繼續購物</button>
          </router-link>
          <button class="btn btn-primary" @click="creatTransList">前往付款</button>
        </div>
      </div>
    </main>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'cart',
  data () {
    return {
      coupon_code: '',
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
  computed: {
    ...mapGetters('CartModules', ['cart']),
    getCouponActiv () {
      return this.$store.state.showCoupon_error
    }
  },
  methods: {
    ...mapActions('CartModules', ['getCart']),
    deleteCartItem (item, id) {
      this.$store.dispatch('CartModules/removeCart', id)
    },
    addCouponCode () {
      const vm = this
      this.$store.dispatch('addCouponCode', vm.coupon_code)
    },
    creatTransList () {
      const vm = this
      this.$validator.validate().then(result => {
        if (result) {
          this.$store.dispatch('creatTransList', vm.form)
          vm.$router.push(`/product/payment`)
        } else {
          console.log('輸入欄位不完整')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
