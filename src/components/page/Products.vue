<template>
  <div class="table-responsive">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-outline-primary mt-4" @click="openModal('new')">建立新商品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <td width="80">項次</td>
          <td width="120">分類</td>
          <td>名稱</td>
          <td class="text-center" width="120">原價</td>
          <td class="text-center" width="120">售價</td>
          <td width="80">是否啟用</td>
          <td class="text-center" width="160">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id" >
          <td>{{ item.num }}</td>
          <td>{{ item.category}}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
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
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" >
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                         placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                         ref="files" @change="uploadFile">
                </div>
                <img :src="tempProduct.imageUrl"
                  class="img-fluid" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                         placeholder="請輸入標題" v-model.trim="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                           placeholder="請輸入分類" v-model.trim="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                           placeholder="請輸入單位" v-model.trim="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                           placeholder="請輸入原價" v-model.trim="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                           placeholder="請輸入售價" v-model.trim="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                            placeholder="請輸入產品描述" v-model.trim="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                            placeholder="請輸入產品說明內容" v-model.trim="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                           id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
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
                    @click="updateProduct"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
<!--    刪除確認視窗-->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
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
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
                    @click="updateProduct"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import $ from 'jquery'

export default {
  name: 'products',
  data () {
    return {
      products: [],
      page: {},
      pagination: {},
      tempProduct: {
        origin_price: {
          Type: Number,
          required: true
        },
        price: {
          Type: Number,
          required: true
        }
      },
      modalType: '',
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`
      const vm = this
      vm.isLoading = true
      // this.$http.get和this.axios.get是一樣axios已bind在vue原型下，使用vue-axios這個套件
      this.$http.get(api).then((response) => {
        // console.log(response)
        vm.isLoading = false
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    // 開啟 modal(popup) 的觸發方法 (確保遠端資料已接收完畢，才能開啟 modal)
    openModal (type, item) {
      if (type === 'delete') {
        this.tempProduct = Object.assign({}, item) // es6寫法，取消item傳參考特性複製給tempProduct，只複製值
        this.modalType = type
        $('#delProductModal').modal('show')
      } else {
        this.tempProduct = Object.assign({}, item) // es6寫法，取消item傳參考特性複製給tempProduct，只複製值
        if (type === 'new') {
          this.tempProduct = {}
        }
        this.modalType = type
        $('#productModal').modal('show')
      }
    },
    updateProduct () {
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`
      let httpMethod
      const vm = this
      if (vm.modalType === 'edit') {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      } else if (vm.modalType === 'delete') {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'delete'
      } else if (vm.modalType === 'new') {
        httpMethod = 'post'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        // console.log(response)
        if (response.data.success) {
          $('#productModal').modal('hide')
          $('#delProductModal').modal('hide')
          vm.getProducts(vm.page)
          console.log('操作成功')
        } else {
          $('#productModal').modal('hide')
          $('#delProductModal').modal('hide')
          vm.getProducts(vm.page)
          console.log('操作失敗')
        }
        vm.modalType = ''
      })
    },
    uploadFile () {
      console.log('file', this)
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      // 圖片必須使用formdata方式送出
      const formData = new FormData() // https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData
      formData.append('file-to-upload', uploadedFile) // 新增key和值
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`
      vm.status.fileUploading = true
      this.$http.post(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log('上傳圖片結果', response.data)
        vm.status.fileUploading = false
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl
          // 因為這個欄位沒有雙向綁定所以用vm.$set來強制寫入
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          // 使用eventbus 統一管理alert
          // 自定義名稱 'messsage:push'
          // message: 傳入參數
          // status: 樣式，預設值為 warning
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    // 把分頁的值傳回
    getPage (page) {
      this.page = page
      this.getProducts(page)
    }
  },
  created () {
    this.getProducts()
    // 測試 eventbus
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // this.$bus.$emit('message:push', '這是一段訊息', 'success')
  }
}
</script>

<style scoped>

</style>
