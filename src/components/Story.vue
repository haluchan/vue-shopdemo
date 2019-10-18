<template>
  <div class="story">
    <h2 class="story-title">The Snow Climb Story</h2>
    <div class="w-100"></div>
    <span class="story-subtltle">透過SNOW Climb把現代人像大自然的營地一樣將人們聯繫起來</span>
    <ul class="story-list">
      <li>
        <a href="#">
          <div class="bgImg img1"></div>
          <div class="detail">
            <p>「久保田 雪峰 TAKIBI Night 2019-秋-」活動報告</p>
            <p>人與人之間的聯繫因篝火x清酒而深化</p>
            <p><span>作者：</span>Sumire Kobayashi</p>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="bgImg img2"></div>
          <div class="detail">
            <p>夏令營季節美食品嚐食譜</p>
            <p>熱騰騰！ Korodatch製成的“ 4種芝士麵包”</p>
            <p><span></span></p>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="bgImg img3"></div>
          <div class="detail">
            <p>騎車感受四季的變化</p>
            <p>最理想的帳篷為您提供了最棒的旅行營地</p>
            <p><span>作者：</span>Shohei Hosaka</p>
          </div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="bgImg img4"></div>
          <div class="detail">
            <p>Snow Climb × TOKYO DESIGN STUDIO New Balance Capsule Collection</p>
            <p></p>
            <p><span></span></p>
          </div>
        </a>
      </li>
    </ul>
    <div class="all-story"><a href="#" >> 所有記事</a></div>
  </div>
</template>

<script>
export default {
  name: 'Story'
}
</script>

<style scoped lang="scss">
@import "../assets/helpers/_media-queries";
.story{
  position: relative;
  padding: 6em 0;
  text-align: center;
  .story-title{
    /*width: 28%;*/
    display: inline-block;
    font-size: 2.2rem;
    font-family: EBGaramond-Regular ,serif ;
    letter-spacing: 1px;
  }
  .story-subtltle{
    display: inline-block;
    /*width: 30%;*/
    font-size: 0.7em;
    margin: auto;
    color: #717171;
    padding-top: 1em;
    padding-bottom: 2em;
  }
}
.story-list{
  .img1{
    background-image: url("../assets/img/story/IMG_5995_edited-900x600.jpg");
  }
  .img2{
    background-image: url("../assets/img/story/web_2015_30_IMG0547_edited-900x599.jpg");
  }
  .img3{
    background-image: url("../assets/img/story/web-900x599.jpg");
  }
  .img4{
    background-image: url("../assets/img/story/top_20190910_FJT10052-900x610.jpg");
  }
  .bgImg{
    width: 100%;
    padding-top: 100%;
    background-position: center center;
    background-size: cover;
  }
}

.story-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1230px;
  margin: 0 auto;
  text-align: left;
    & li{
    width: calc(100% / 4 - 35px);
      @include media(sm){
        width: calc(100% / 2 - 30px);
      }
      @include media(xs){
        width: calc(100% / 2 - 30px);
      }
    margin-bottom: 48px;
    display: inline-block;
      .bgImg {
        transition: transform ease .3s,filter ease 1s;
        &:hover{
          filter: brightness(.7);
        }
      }
  }
  & a{
    color: black;
    text-decoration: none;
    transition: transform ease 0.3s, filter ease 1s;
    opacity: 0.7;
    &:hover{
      opacity: 1;
      filter: brightness(.7);
      transition: transform ease .3s,filter ease 1s;
    }
    .detail{
      & p{
        margin-bottom: 0.3em;
      }
      & :first-child{
        padding-top: 1em;
        font-size: 1.2em;
        font-family: EBGaramond-Regular,monospace;
      }
      & :last-child{
        font-size: 0.7rem;
        color: #717171;
      }
    }
  }
}
.all-story{
  width: 100%;
  display: inline-block;
  text-align: center;
  padding-bottom: 40px;
  a {
    text-decoration: none;
    color: #717171;
    &:hover{
      text-decoration: none;
      color: black;
    }
  }
}

</style>
