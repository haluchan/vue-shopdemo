<template>
  <div class="">
    <div class="row">
      <div class="col-3 side">
        <div class="nav flex-column nav-pills item" role="tablist" aria-orientation="vertical"
             v-for=" item in category" :key="item">
          <a class="nav-link" data-toggle="pill" role="tab"
             :class="{ 'active': isActive === item }"
             @click="activeClass(item)"
          >{{ item }}</a>
        </div>
      </div>
      <div class="col-12">
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <div class="container-fluid mt-5">
              <!--  編輯訂單  -->
              <div class="modal-content modal-dialog">
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
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex' // 匯入vuex的gutters和action

export default {
  name: 'Production',
  data () {
    return {
      itemNumber: 1,
      status: {
        loadingItem: '',
        addItem: '',
        addCart: false
      }
    }
  },
  computed: {
    ...mapGetters('ProductsModules', ['product'])
  },
  methods: {
    getProduct (id) {
      this.$store.dispatch('ProductsModules/getProduct', id)
      $('#productModal').modal('show')
    }
  },
  created () {
    this.getProduct(this.$route.params.id)
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/main";
.side{
  position: relative;
  width: 120px;
  left: -120px;
}
.item:hover{
  color: white;
  background-color: $blue;
  border-radius: 0.25rem;
}
</style>
