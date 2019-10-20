<template>
  <div class="Category">
    <h2>Products</h2>
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
</template>

<script>
export default {
  name: 'Categories'
}
</script>

<style scoped lang="scss">
@import "../assets/helpers/_media-queries";
.Category{
  display: block;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  h2{
    padding-bottom: 1.5em;
    font-family: EBGaramond-Regular ,serif ;
    letter-spacing: 2px;
  }
  ul {
    text-align: left;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    padding-bottom: 3em;
    @include media(md){
      text-align: left;
    }
    li{
      width: calc(100% / 5);
      box-sizing: border-box;
      list-style: none;
      padding: 0 0 0 2em ;
        @include media(md){
          width: calc(100% / 2);
        }
        @include media(sm){
          width: calc(100% / 2);
        }
        @include media(xs){
          width: calc(100% / 2);
          padding: 0 0 0 1em ;
        }
    a{
      text-decoration: none;
      font-size: 0.9rem;
      color: black;
      vertical-align: text-bottom;
      @include media(md){
        font-size: 1.3rem;
      }
      @include media(sm){
        font-size: 1.6rem;
      }
      @include media(xs){
        font-size: 1.6rem;
      }
        img {
          height: 65px;
        }
      }
      transition: transform 0.25s ease-in-out  ;
      &:hover{
        transform: scale(1.1) ;
      }
    }
  }
}
</style>
