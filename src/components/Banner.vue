<template>
  <div>
    <slick
      ref="slick"
      :options="slickOptions">
      <div>
        <img class="banner-pc" src="../../src/assets/img/banner/topmv_lwtichinoseki2nd_pc.jpg" alt="">
        <a href="">
          <span class="banner-title">
          <p>在這塊自然土地上，親手編織夢想<br>服裝紡織的尋訪之旅</p>
          <h2 class="main-title">LOCAL WEAR TOURISM in<br> MITSUKE/TOCHIO</h2>
          <div>接受申請中<span>&nbsp; ></span></div>
          </span>
        </a>
      </div>
      <div>
        <img src="../../src/assets/img/banner/topmv_lwtmitsuketochio_pc.jpg" alt="">
        <a href="">
          <span class="banner-title">
          <p>尋訪地方上，傳統與文化的熱情推手<br>文化體驗之旅</p>
          <h2 class="main-title">LOCAL WEAR TOURISM in<br> ICHINOSEKI 2nd</h2>
          <div>接受申請中<span>&nbsp; ></span></div>
          </span>
        </a>
      </div>
      <div>
        <img src="../../src/assets/img/banner/topmv_spmuseum_pc.jpg" alt="">
        <a href="">
          <span class="banner-title">
          <p>聚集野遊記憶的博物館<br>8.24 Grand OPEN</p>
          <h2 class="main-title">Snow climb MUSEUM<br></h2>
          <div>前往頁面<span>&nbsp; ></span></div>
          </span>
        </a>
      </div>
      <div>
        <img src="../../src/assets/img/banner/topmv_sp_002_pc.jpg" alt="">
        <a href="">
          <span class="banner-title">
          <p>野生動植物的最佳季節<br>傳統服飾製作的訪問之旅</p>
          <h2 class="main-title">Camp Debut in Autumn<br></h2>
          <div>前往頁面<span>&nbsp; ></span></div>
          </span>
        </a>
      </div>
    </slick>
      <div class="dots"></div>
<!--    <button type="button" class="slick-prev" @click.prevent="prev">Previous</button>-->
<!--    <button type="button" class="slick-next" @click.prevent="next">Next</button>-->
  </div>
</template>

<script>
import Slick from 'vue-slick'
import { mapGetters } from 'vuex'
// import $ from 'jquery'
export default {
  name: 'Banner',
  components: {
    Slick
  },
  data () {
    return {
      slickOptions: {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 300,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        adaptiveHeight: true
      }
    }
  },
  computed: {
    ...mapGetters(['showsSlide'])
  },
  methods: {
    next () {
      this.$refs.slick.next()
    },

    prev () {
      this.$refs.slick.prev()
    },

    reInit () {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick()
      })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/helpers/_media-queries";

.slick-slider .slick-dots {
  position: relative;
  top: -4em;
}
li.slick-active button:before {
  color: white;
}
.slick-dots li button:before {
  color: white;
}
.slick-dots li.slick-active button:before{
  color: white;
}
.slick-slide img {
  width: 100%;
}
.banner-title {
  position: absolute;
  left: 5.2vw;
  right: 5.2vw;
  bottom: 20vw;
  color: white;
  @include media(lg){
    bottom: 15vw;
  }
  @include media(md){
    left: 25px;
    right: 25px;
    bottom: 60px;
  }
  @include media(sm){
    left: 25px;
    right: 25px;
    bottom: 60px;
  }
  @include media(xs){
    left: 25px;
    right: 25px;
    bottom: 60px;
  }
  & :first-child {
    font-size: 1.2rem;
    margin-bottom: -0.1em;
  }
  & .main-title{
    font-size: 2rem;
    @include media(md){
      font-size: 2.4rem;
    }
    @include media(sm){
      font-size: 3rem;
    }
    @include media(xs){
      font-size: 5rem;
    }
  }
  & :last-child {
    vertical-align: top;
    width: 120px;
    padding: 4px 6px;
    border: 0.5px solid #c1c1c1;
    font-size: 0.9rem;
    font-weight: 400;
    border-radius: 2px;
    display: inline;
    color: #dddddd;
    & span{
      border: none;
    }
  }

}
</style>
