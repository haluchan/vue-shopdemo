<template>
  <div>
    <nav class="navbar navbar-expand  navbar-light "
         :class="{ fixbar : showsSlide === true}">
      <button class=" third-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent22"
              aria-controls="navbarSupportedContent22" aria-expanded="false" aria-label="Toggle navigation"
      @click="openMenu"
      :class="{ open : showsSlide === true}">
        <div class="animated-icon3"
             :class="{ open : showsSlide === true}">
          <span></span><span></span><span></span>
        </div>
      </button>
      <router-link to="/">
        <a class="navbar-brand nav-title" href="#"><h4 class="snow">*</h4><span>Snow Climb</span></a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNavDro pdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" style="color: white"
               to="/">首頁</router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link class="nav-link" style="color: white"
               to="/product">
                商品
              </router-link>
            </li>
            <li class="nav-item">
<!--              <router-link class="nav-link" style="color: white"-->
<!--                           to="/resume">關於我-->
<!--              </router-link>-->
            </li>
          </ul>
        <div class="dropdown ml-auto">
          <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
            <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
            <span class="fixbadge">
              <span class="badge badge-pill badge-danger" v-if="cartNum !== 0 ">{{ cartNum }}</span>
            </span>
            <span class="sr-only"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-right p-3"
               data-offset="400">
            <h6>已選擇商品</h6>
            <table class="table table-sm">
              <tbody>
              <tr v-for=" item in cart.carts " :key=" item.is">
                <td class="align-middle text-center">
                  <a href="#" class="text-muted" @click.prevent="getRemoveId(item.id)">
                    <i class="far fa-trash-alt"></i>
                  </a>
                </td>
                <td></td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle" width="50">{{ item.qty }} {{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency }}</td>
              </tr>
              </tbody>
            </table>
            <div>
              <button class="btn btn-primary btn-block"
              @click="checkCart">
              <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="alert alert-warning alert-dismissible fade"
    :class="{ show : getAlert === true }">
      <strong>購物車裡面沒東西喔</strong>
      <button type="button" class="close"
      @click=" hideAlert ">
        <span >&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import $ from 'jquery'
export default {
  name: 'FrontNavbar',
  props: ['open'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('CartModules', ['cart', 'getAlert']),
    cartNum () {
      return this.$store.state.CartModules.cartNum
    },
    ...mapGetters(['showsSlide'])
  },
  methods: {
    ...mapActions('CartModules', ['getCart']),
    getRemoveId (id) {
      this.$store.dispatch('CartModules/removeCart', id)
    },
    openMenu () {
      // console.log(this.$store.state.slidMenuData)
      if (!this.$store.state.slidMenuData) {
        this.$store.dispatch('slidMenu', true)
      } else {
        this.$store.dispatch('slidMenu', false)
      }
    },
    checkCart () {
      if (!this.$store.state.CartModules.cart.carts.length) {
        console.log('購物車為空喔')
        this.$store.dispatch('CartModules/alertMessage', true)
      } else {
        this.$router.push('product/cart')
      }
    },
    hideAlert () {
      this.$store.dispatch('CartModules/alertMessage', false)
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style  lang="scss">
@import "../assets/helpers/_media-queries";

.fixbadge{
  position: relative;
  right: .25em;
  top: -1.1em;
}
.navbar {
  position: relative;
  z-index: 100;
  background-color: rgba(0,0,0,0.4);
  a {
    h4 {
    color: white;
    vertical-align: sub;
      @include media(xs){
        vertical-align: baseline;
      }
    }
    span{
      color: white;
      font-size: 1.4rem;
      @include media(xs){
        font-size: 2rem;
      }
    }
  }
  height:56px;

  .navbar-brand {
    color: white;
    background-color: transparent;
    box-shadow: none;
  }
  .nav-title {

    color: white;
    h4 span {
      font-family: EBGaramond, monospace;
    }
  }
  .snow{
    line-height: 0;
    display: inline-block;

  }
  .third-button{
    background:transparent;
    border: 0;
    transform: scale(1.1);
    width: 50px;
    height: 50px;
    outline-width:0;
  }
  &.fixbar {
    position: relative;
  }
}
.navbar-light .navbar-brand:hover {
  color:white;
}
.dropdown {
  color: white;
  .dropdown-menu {
    margin-top: 1.2em;
    min-width: 30em;
    font-size: 0.76rem;
  }

  div {
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      border: 0;
    td {
      color: white;
      font-size: 1em;
    }
  }

  a {
    color: white;
    .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.4);
    color: white;
    }
    .dropdown-item {
      color: white;
    }
  }
  .fa-trash-alt:before{
    color: white;
  }
}

.fa-shopping-cart:before{
  color: white;
}
.navbar-expand-lg .navbar-nav .dropdown-menu {
  margin-top: 9px;
}
//

.animated-icon3 {
  width: 30px;
  height: 30px;
  position: relative;
  margin-left: 0;
  margin-top:4px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 1s ease-in-out;
  -moz-transition: 1s ease-in-out;
  -o-transition: 1s ease-in-out;
  transition: 1s ease-in-out;
  cursor: pointer;
}

.animated-icon3 span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
}

.animated-icon3 span {
  background: white;
}

.animated-icon3 span:nth-child(1) {
  top: 0px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.animated-icon3 span:nth-child(2) {
  top: 10px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.animated-icon3 span:nth-child(3) {
  top: 20px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

.animated-icon3.open span:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: 0px;
  left: 8px;
}

.animated-icon3.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}

.animated-icon3.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  top: 21px;
  left: 8px;
}

.navbar-b {
  position: relative;
  -webkit-transition: left .5s ease-in-out;
  /*background: transparent;*/
  left:0;
}
.move{
  left:250px;
}
.third-button{
  display: none;
  @include media(sm){
    display: block;
  }
  @include media(xs){
    display: block;
  }
}
.container-fluid .row .jumbotron{
  background-color: white;
}
.alert{
 position: absolute;
}
</style>
