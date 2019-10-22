<template>
  <div>
    <div class="navbar-b" :class="{ move : showsSlide === true}">
      <div class="midmask" :class="{ midmaskShow : showsSlide === true}"></div>
      <FrontNavbar></FrontNavbar>
      <div class=" fixnav" ></div>
      <div class=" container-fluid" :class="{ containerFix : showsSlide === true }">
        <div class="header">
          <Banner class="banner"></Banner>
          <BannerMobile class="bannerMobile"></BannerMobile>
        </div>
        <div class="search">
          <div class="search-bar">
<!--            <input type="text" class="search-input" value="">-->
<!--            <input type="submit" class="search-icon" value="">-->
              <autocomplete
                :search="search" class="search-input"
                placeholder="搜尋商品"
                aria-label="Search for a product"
                :get-result-value="getResultValue"
                @submit="goProduct"
              ></autocomplete>
          </div>
        </div>
        <Story v-scroll-reveal></Story>
        <Categories class="categories"></Categories>
        <div class="big-banner">
          <a href="" class="bgImg">
          </a>
        </div>
        <Event v-scroll-reveal></Event>
        <ProductNote class="ProductNote"></ProductNote>
        <Server class="servers"></Server>
        <FooterInfo></FooterInfo>

      </div>
    </div>
    <div class="slidMenu" :class="{open : showsSlide === true}">
      <div></div>
      <ul>
        <li><a href=""><img src="../assets/img/icon/SDE-003R.jpg" alt="">帳篷</a></li>
        <li><a href=""><img src="../assets/img/icon/TP-851S.jpg" alt="">篷布</a></li>
        <li><a href=""><img src="../assets/img/icon/TP-660.jpg" alt="">休息帳</a></li>
        <li><a href=""><img src="../assets/img/icon/R-103-1.jpg" alt="">帳篷釘錘</a></li>
        <li><a href=""><img src="../assets/img/icon/BD-050.jpg" alt="">睡袋</a></li>
        <li><a href=""><img src="../assets/img/icon/SET-121.jpg" alt="">內墊</a></li>
        <li><a href=""><img src="../assets/img/icon/LV-091KH.jpg" alt="">椅子</a></li>
        <li><a href=""><img src="../assets/img/icon/ES-070BR.jpg" alt="">照明</a></li>
        <li><a href=""><img src="../assets/img/icon/CK-166.jpg" alt="">廚具</a></li>
        <li><a href=""><img src="../assets/img/icon/GS-230.jpg" alt="">電加熱器</a></li>
        <li><a href=""><img src="../assets/img/icon/ST-032R.jpg" alt="">焚火台</a></li>
        <li><a href=""><img src="../assets/img/icon/CK-160.jpg" alt="">燒烤系統</a></li>
        <li><a href=""><img src="../assets/img/icon/CS-520.jpg" alt="">調理器具</a></li>
        <li><a href=""><img src="../assets/img/icon/NT-050.jpg" alt="">食器</a></li>
        <li><a href=""><img src="../assets/img/icon/MG-143.jpg" alt="">保溫杯</a></li>
        <li><a href=""><img src="../assets/img/icon/UG-055G.jpg" alt="">手提袋</a></li>
        <li><a href=""><img src="../assets/img/icon/UG-253.jpg" alt="">雨傘</a></li>
        <li><a href=""><img src="../assets/img/icon/SUSD-1.jpg" alt="">自行車</a></li>
        <li><a href=""><img src="../assets/img/icon/PT-054R.jpg" alt="">頭燈</a></li>
        <li><a href=""><img src="../assets/img/icon/UG-301GY.jpg" alt="">保溫箱</a></li>
        <li><a href=""><img src="../assets/img/icon/KM-001.jpg" alt="">背包</a></li>
        <li><a href=""><img src="../assets/img/icon/JK-18SU106.jpg" alt="">功能背心</a></li>
        <li><a href=""><img src="../assets/img/icon/SH-18SW101.jpg" alt="">女性服裝</a></li>
        <li><a href=""><img src="../assets/img/icon/TS-18SK002.jpg" alt="">童裝</a></li>
        <li><a href=""><img src="../assets/img/icon/UG-225BE.jpg" alt="">帽子</a></li>
      </ul>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FrontNavbar from '@/components/FrontNavbar'
import FooterInfo from '@/components/FooterInfo'
import Banner from '@/components/Banner'
import Story from '@/components/Story'
import Event from '@/components/Event'
import Categories from '@/components/Categories'
import ProductNote from '@/components/ProductNote'
import Server from '@/components/Server'
import BannerMobile from '@/components/BannerMobile'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    FrontNavbar,
    Autocomplete,
    Story,
    Event,
    FooterInfo,
    Banner,
    BannerMobile,
    Categories,
    ProductNote,
    Server
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters(['showsSlide'])
  },
  methods: {
    search (input) {
      this.$store.dispatch('ProductsModules/getProducts')
      let products = this.$store.state.ProductsModules.products
      if (input.length < 1) {
        return []
      } else {
        return products.filter(item => {
          let tmp = item.category.match(input)
          if (!tmp) {
            tmp = item.title.match(input)
          }
          return tmp
        })
      }
    },
    getResultValue (result) {
      return result.title
    },
    goProduct (item) {
      console.log(item)
      if (item !== undefined) {
        this.$router.push({ path: `/product/${item.id}` })
      }
    }
  }
}
</script>
<style lang="scss">
@import "../assets/helpers/_media-queries";

.d1{
  width: 50%;
  padding: 0 10px;
  background-color: #6f42c1;
  box-sizing: border-box;
  border: solid #3c3f41;
  border-width: 0 50px;
  display: inline-block;
}
.d2{
  display: inline-block;
  width: 50%;
  background-color: #17a2b8;
}

.containerFix{
  position: fixed;
  z-index: 80;
}

.header{
  position: relative;
  .banner {
    margin: -56px -15px;
      position: relative;
    /*height: calc( 100vh - 140px);*/
    z-index: 0;
    display: block;
  }
  .bannerMobile{
    display: none;
  }
  @include media(xs){
    .banner{
      display: none;
    }
    .bannerMobile{
      margin: -56px -15px;
      display: block;
    }
  }
}
.search{
  position: absolute;
  top:0;
  z-index: 90;
  right: 0;
  left: 0;
  padding-top: 19%;
  .search-bar{
     position: relative;
     max-width: 600px;
     @include media(md){
       max-width: 500px;
       top: 3em;
     }
     @include media(sm){
       max-width: 350px;
       top: 2em;
     }
     @include media(xs){
       max-width: 276px;
       top: 10em;
     }
     margin: auto;
     .search-input {
       width: 100%;
       height: 40px;
       padding-left: 20px;
       border-radius: 50px;
       border: 0 solid;
       /*background-color: rgba(255,255,255,0.4);*/
       outline-width: 0;
       @include media(md){
         height: 32px;
       }

     }
     .search-icon{
       width: 50px;
       height: 40px;
       position: absolute;
       right: 20px;
       background: url("../assets/img/icon/mv_btn_search.svg") no-repeat center center;
       border: 0 ;
       @include media(xs){
         right: 0;
       }
       @include media(md){
         height: 32px;
         right: 10px;
       }
     }
    .showSearch {
      background-color: white;
      margin-bottom: 0;
      display: none;
    }
    .openSearch{
      display: block;
    }
  }
}
.big-banner {
  & a{
    display: flex;
    justify-content:center;
    background-image: url("../assets/img/top_bigbanner_suntory.jpg");
    background-position: 50% calc(50% - 160px);
    background-size: 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    margin: 0 -15px;
    height: 60vh;
    transition: filter;
    transition-duration: 0.3s, 1s;
    transition-timing-function: ease, ease;
    transition-delay: 0s, 0s;
    @include media(sm){
      height: 30vh;
    }
    @include media(xs){
      height: 30vh;
    }
  }
    &:hover{
      filter: brightness(.7);
    }
}
.fade-enter-active {
  transition: transform 1.5s ease;
  opacity: 1;
}
.fade-enter {
  /*transform: translateY(100px);*/
  opacity: 0;
}

.slidMenu{
  width: 250px;
  position: absolute;
  top:0;
  left: -250px;
  -webkit-transition: left .5s ease-in-out;

}
.navbar-b {
  .navbar{
    background-color: rgba(0, 0, 0, 0.2);
  }
  .alert{
    position: absolute;
    z-index: 100;
    right: 0;
  }
}
.open{
  left:0;
}
.move {
  position: relative;
}
.midmask{
  display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 95;
}
.midmaskShow{
  display: block;
  position: fixed;
  z-index: 100;
}
.slidMenu{
  &:first-child{
    border-bottom: 1px solid #777777;
    /*margin: 0 2em;*/
  }
  ul{
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 3em;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    margin: 1.5em 0.75em 0;
    li{
      width: calc( 100% / 1);
      a{
        font-size: 1.3em;
        padding: 0 0 0 0.75em;
        color: black;
        text-decoration: none;
        @include media(md){
          font-size: 1.3em;
        }
        @include media(sm){
          font-size: 1.6em;
        }
        @include media(xs){
          font-size: 2.2em;
        }
      }
      img {
        height: 40px;
      }
    }
  }
}

.ProductNote{
  background-color: #ddd;
  margin: 0 -15px;
  padding: 2em 0;
}
</style>
