<template>
  <div class="">
    <div class=" side" :class="{ productSidebar : showsSlide === true}">
      <div><h4>分類</h4></div>
      <div class="nav flex-column nav-pills item" role="tablist" aria-orientation="vertical"
           v-for=" item in category" :key="item">
        <a class="nav-link" data-toggle="pill" role="tab"
           :class="{ 'active': getProductFilter === item }"
           @click="activeFilter(item)"
        >{{ item }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProductFilter',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['showsSlide']),
    ...mapGetters('ProductsModules', ['category', 'getProductFilter'])
  },
  methods: {
    activeFilter (filter) {
      this.$store.dispatch('ProductsModules/setProductFilter', filter)
      this.$store.dispatch('ProductsModules/searchId', '')
      this.$store.dispatch('slidMenu', false)
    }
  }
}
</script>

<style  lang="scss">
@import "../assets/helpers/_media-queries";
.item:hover{
  color: white;
  background-color: $blue;
  border-radius: 0.25rem;
}
  .side {
    text-align: center;
    width: 100%;
    h4{
      @include media(xl){
        width: 150px;
      }
    }
    position: relative;
    -webkit-transition: left .5s ease-in-out;
    @include media(md){
      margin: 0 1em;
    }
    @include media(sm){
      position: fixed  ;
      width: 120px;
      top: 77px;
      left: -120px;
    }
    @include media(xs){
      position: fixed;
      width: 120px;
      top: 77px;
      left: -120px;
    }
    .item{
      margin: 0.25em 0.5em 0;
      box-sizing: border-box;
      @include media(xl){
        width: 140px;
      }
      a{
        cursor: pointer;
      }

    }
  }
  .productSidebar{
    position: fixed;
    margin-right: 1em;
    width: 120px;
    @include media(sm){
      top: 77px;
      left: 0px;
    }
    @include media(xs){
      top: 77px;
      left: 0px;
    }
  }

</style>
