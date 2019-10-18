<template>
  <div class="container-fluid">
    <div class="row">
      <div class="top col-12 jumbotron">
        <div><img src="../../assets/img/banner/8796209741854.jpeg" alt=""></div>
        <div>
          <div><h5>帳篷是野外臥室。 營造舒適的空間，保護您免受雨淋和風</h5></div>
          <div>
            <p>Snow Climb認為，帳篷必須是舒適的臥室，您可以整日玩耍並休息疲憊的身體。帳篷面料分為三個部分。接受雨水和風的屋頂和傳單。帳篷內牆營造出舒適的空間。底部承受露營者的重量並接觸地面。每個部分所需的規格均經過徹底驗證，以確定織物的類型，厚度和編織方法。請根據營地的數量，季節和風格進行選擇。
            </p>
          </div>
        </div>
      </div>
      <div class="row m-4 fixcolum">
        <ProductFilter class="itemfilter col-md-2"></ProductFilter>
        <div class="col-sm-12 col-md-10">
          <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
              <div class="container-fluid">
                <div class="row">
                  <div class="card-columns" >
                    <div class="card" style="min-width: 250px;" v-for="item in filterProduct" :key="item.id">
                      <div class="item-img" style=" background-size: cover; background-position: center"
                           :style="{ backgroundImage:`url(${ item.imageUrl })` }">
                      </div>
                      <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                        <h5 class="card-title" >
                          <a href="#" class="text-dark">{{ item.title }}</a>
                        </h5>
                        <p class="card-text">{{ item.description }}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                          <div class="h5" v-if="!item.price">原價 ${{ item.origin_price }}</div>
                          <del class="h6" v-if="item.price">原價 ${{ item.origin_price }}</del>
                          <div class="h5" v-if="item.price"> ${{ item.price }}</div>
                        </div>
                      </div>
                      <div class="card-footer d-flex">
                        <button type="button" class="btn btn-outline-secondary btn-sm"
                                @click="getProduct(item.id)">
                          <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                          看更多
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                                @click="addCart(item.id)">
                          <i class="fas fa-spinner fa-spin" v-if="status.addItem === item.id"></i>
                          加入購物車
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
                          小計 <strong>{{ itemNumber * product.price }}</strong> 元
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import ProductFilter from '@/components/ProductFilter'
import { mapGetters, mapActions } from 'vuex' // 匯入vuex的gutters和action

export default {
  name: 'Production',
  components: { ProductFilter },
  props: ['show', 'id'],
  data () {
    return {
      productId: '',
      itemNumber: 1,
      status: {
        loadingItem: '',
        addItem: '',
        addCart: false
      }
    }
  },
  computed: {
    ...mapGetters(['showsSlide']),
    ...mapGetters('ProductsModules', ['category', 'product']), // 取出vuex的gutters
    filterProduct () {
      let filterBox = []
      console.log(this.$store.state.ProductsModules.searchItemId)
      if (this.$store.state.ProductsModules.searchItemId) {
        this.$store.state.ProductsModules.products.forEach(item => {
          if (item.id === this.$store.state.ProductsModules.searchItemId) {
            filterBox.push(item)
          }
        })
      } else if (this.$store.state.ProductsModules.productFilter !== '全部') {
        this.$store.state.ProductsModules.products.forEach(item => {
          if (item.category === this.$store.state.ProductsModules.productFilter) {
            filterBox.push(item)
          }
        })
      } else {
        filterBox = this.$store.state.ProductsModules.products
        // console.log(JSON.parse(JSON.stringify(this.$store.state.ProductsModules.products)))
      }
      return filterBox
    }
  },
  methods: {
    activeClass (filter) {
      this.isActive = filter
    },
    ...mapActions('ProductsModules', ['getProducts']), // 取出vuex的action，可以取代不帶參數的function
    // getProducts () {
    //   this.$store.dispatch('getProducts')
    // },
    getProduct (id) {
      this.$store.dispatch('ProductsModules/getProduct', id)
      $('#productModal').modal('show')
      // 效能不好考慮要不要用VUEX
      // const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`
      // const vm = this
      // vm.status.getting = true
      // vm.status.loadingItem = id
      // this.$http.get(url).then((response) => {
      //   vm.status.loadingItem = ''
      //   vm.status.getting = false
      //   vm.product = response.data.product
      //   $('#productModal').modal('show')
      // })
    },
    addCart (id, qty = 1) {
      const vm = this
      vm.status.addItem = id
      this.$store.dispatch('CartModules/addCart', { id, qty })
      $('#productModal').modal('hide')
      vm.status.addItem = ''
    }
  },
  created () {
    this.getProducts()
    if (this.$route.params.id) {
      this.$store.dispatch('ProductsModules/searchId', this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/helpers/_media-queries";
.midmaskShow{
  display: block;
  position: fixed;
  z-index: 100;
}
.containerFix{
  position: fixed;
  left: -120px;
  z-index: 80;
}
.card-columns {
  column-count: 1;
  @include media-breakpoint-only(md) {
    column-count: 2;
  }
  @include media-breakpoint-only(lg) {
    column-count: 3;
  }
  @include media-breakpoint-only(xl) {
    column-count: 3;
  }
}
.fixcolum{
  display: inline-flex;
  flex-wrap: wrap;
  flex-flow: row;
  justify-content: space-around;
  .itemfilter {
    @include media(xl) {
      position: relative;
      width: 140px;
    }
    @include media(md) {
      position: relative;
      min-width: 120px;
    }
    @include media(sm) {
      position: absolute;
      min-width: 120px;
    }
    @include media(xs) {
      position: absolute;
    }
  }
  .card{
    width: 100%;
    .item-img{
      height: 230px;
      @include media (sm){
        height: 420px;
      }
    }
    .card-title{
      font-size: 1rem;
      height: 60px;
      @include media(md){
        height: 48px;
        font-size: 1.2rem;
      }
      @include media(sm){
        height: 40px;
        font-size: 1.6rem;
      }
      @include media(xs){
        height: 40px;
        font-size: 2rem;
      }
    }
    .card-text{
      height: 80px;
      font-size: 0.75rem;
      @include media(lg){
        font-size: 0.9rem;
      }
      @include media(md){
        height: 80px;
        font-size: 0.9rem;
      }
      @include media(sm){
        height: 5em;
        font-size: 1.3rem;
      }
      @include media(xs){
        height: 40px;
        font-size: 1.3rem;
      }
    }
  }
}
</style>
