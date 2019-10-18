<template>
  <div class="product" :class="{ productMain : showsSlide === true }">
    <loading :active.sync="Loading"></loading>
    <FrontNavbar></FrontNavbar>
      <router-view></router-view>
    <FooterInfo></FooterInfo>
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar'
import FooterInfo from '@/components/FooterInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'product',
  data () {
    return {
      show: false
    }
  },
  components: {
    FrontNavbar,
    FooterInfo
  },
  computed: {
    ...mapGetters(['showsSlide']),
    ...mapGetters('LoadingModules', ['Loading'])
  },
  methods: {
  },
  created () {

  }
}
</script>

<style lang="scss">
@import "../assets/helpers/_media-queries";
.row{
  padding: 0 5em;
  @include media(sm){
    padding:  0;
  }
  @include media(xs){
    padding:  0;
  }
  .top{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px auto 0;
    text-align: center;
    width: 100%;
    & :nth-child(2){
      padding-top: 1.5em;
      text-align: left;
      div{
        text-align: center;
        h5 {
          display: inline-block;
          font-family: EBGaramond, sans-serif;
          font-size: 2rem;
        }
      }
     & :nth-child(2){
       text-align: left;
       p {
         font-family: EBGaramond, monospace;
         font-size: 1.2rem;
         margin: 0 5em;
         @include media(md){
           margin: 0 3em;
         }
         @include media(sm){
           margin: 0 2em;
         }
         @include media(xs){
           margin: 0 .5em;
         }
       }
     }

    }
    img{
      width: 94%;
    }
  }
  .jumbotron{
    background: white;
  }
}
.product{
  max-width: 1200px;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  -webkit-transition: left .5s ease-in-out;
}
.productMain {
  position: relative;
  left: 120px;
}
</style>
