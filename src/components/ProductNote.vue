<template>
  <div>
    <div class="note">
      <div class="node-title">
        <h2 v-animate="'slide-right'" >Product notice</h2>
        <span>產品重要通知</span>
      </div>
      <div class="note-container">
        <div>
          <p>2019.7.26</p>
          <p>關於使用竹子產品顏色改變通知</p>
        </div>
        <div>
          <p>2018.12.17</p>
          <p>2019年Outdoor Lifestyle Catalog中的錯誤</p>
        </div>
        <div>
          <p>2018.12.08</p>
          <p>ST-090\CS-094 煙霧大師產品價調整通知</p>
        </div>
        <div>
          <p>2018.12.08</p>
          <p>TP-450/455 氣墊床 Pro. L/M 一部樣式標籤誤植</p>
        </div>
      </div>
      <div class="check-all">> 查看全部</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductNote'
}
</script>

<style lang="scss">
@import "../assets/helpers/_media-queries";
.note{
  padding: 4em 0;
  @include media(sm){
    padding: 2em 0 3em;
  }
  @include media(xs){
    padding: 2em 0 ;
  }
  .node-title{
    h2 {
      font-family: EBGaramond-Regular ,serif ;
      letter-spacing: 2px;
    }
   width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 7em;
    @include media(sm){
      padding-bottom: 3em;
    }
    @include media(xs){
      padding-bottom: 3em;
    }
    span {
      padding-top: 0.5em;
      display: inline-block;
      color: #8a8a8a;
    }
  }
  .note-container{
    display: flex;
    padding: 0 4em 6em;
    flex-flow: column;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    @include media(sm){
      padding: 0 3em 2em;
    }
    @include media(xs){
      padding: 0 2em 2em;
    }
    div {
      width: calc(100% / 4 - 10px);
      padding: 0 10px;
      & :last-child:hover{
        color: #999;
        cursor: pointer;
      }
      & :nth-child(1){
        font-family: EBGaramond-Regular,serif;
      }
      & :nth-child(2){
        color: #444;
      }
      @include media(sm){
        width: calc(100% / 2);
      }
      @include media(xs){
        width: calc(100% / 2);
      }
    }
  }
  .check-all{
    font-size: 0.75rem;
    color: #444;
    width: 100px;
    margin: 0 auto;
    text-align: center;
    &:hover{
      color: #aaa;
      cursor: pointer;
    }
  }

}

.animate {
  transition-delay: .1s;
  transition-duration: .5s;
  transition-timing-function: ease-in
}

.slide-right {
  transform: translateX(-100px);
  opacity: 0;
}

.slide-right.animate-active {
  transform: translateX(0px);
  opacity: 1;
}

</style>
