<template>
  <main class="container" role="main">
    <div class="my-5 row justify-content-center">
    <div><h4>訂單資訊</h4></div>
    <div class="w-100 mt-4"></div>
    <form class="col-md-6" @submit.prevent="creatOrder">
      <table class="table">
        <thead>
        <th>品名</th>
        <th>數量</th>
        <th class="text-center">單價</th>
        </thead>
        <tbody>
        <tr v-for="item in cartItem.carts" :key="item.id">
          <td class="align-middle">{{ item.product.title }}</td>
          <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
          <td class="align-middle text-right">{{ item.final_total }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2" class="text-right">總計</td>
          <td class="text-right">{{ cart.final_total }}</td>
        </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
        <tr>
          <th width="100">Email</th>
          <td>{{ order.user.email }}</td>
        </tr>
        <tr>
          <th>姓名</th>
          <td>{{ order.user.name }}</td>
        </tr>
        <tr>
          <th>收件人電話</th>
          <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
          <th>收件人地址</th>
          <td>{{ order.user.address }}</td>
        </tr>
        <tr>
          <th>付款狀態</th>
          <td>
            <span v-if="!is_paid">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
          </td>
        </tr>
        <tr>
          <th>訊息</th>
          <td>{{ order.message }}</td>
        </tr>
        </tbody>
      </table>
      <div class="text-center" v-if="is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
      <div class="text-center" v-else @click="goProduct">
        <a class="btn btn-primary" style="color: white">回商品頁</a>
      </div>
    </form>

  </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Payment',
  data () {
    return {
      carts: {},
      orderId: '',
      is_paid: false
    }
  },
  computed: {
    cartItem () {
      if (this.is_paid) {
        return this.carts
      } else {
        return this.$store.state.CartModules.cart
      }
    },
    order () {
      return this.$store.state.form
    }
  },
  methods: {
    ...mapActions('CartModules', ['cart']),
    // getOrder () {
    //   this.$store.dispatch('getCart')
    // },
    creatOrder () {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`
      let vm = this
      let order = this.$store.state.form
      vm.$store.dispatch('LoadingModules/updateLoading', true)
      this.$http.post(url, { data: order }).then((response) => {
        console.log(response)
        vm.carts = vm.$store.state.CartModules.cart
        if (response.data.success) {
          console.log('訂單已建立')
          vm.orderId = response.data.orderId
          this.payOrder()
          this.$store.dispatch('CartModules/getCart')
        }
      })
    },
    payOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${vm.orderId}`
      this.$http.post(url).then((response) => {
        vm.$store.dispatch('LoadingModules/updateLoading', false)
        console.log('付款成功')
        if (response.data.success) {
          vm.is_paid = true
        } else {
          console.log('訂單建立失敗', response)
        }
      })
    },
    goProduct () {
      this.carts = {}
      this.$router.push('/product')
    }
  }
}
</script>

<style scoped>

</style>
