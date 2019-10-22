<template>
  <div class="event">
    <h2 v-animate="'slide-right'" >Event</h2>
    <ul class="event-item">
      <li><a href="#">
        <div><img src="../assets/img/event/top_bnr_sq_spwp2019@2x.jpg" alt=""></div>
      </a></li>
      <li><a href="#">
        <div><img src="../assets/img/event/top_bnr_sq_mitsuketochio@2x.jpg" alt=""></div>
      </a></li>
      <li><a href="#">
        <div><img src="../assets/img/event/top_bnr_sq_spexp@2x.jpg" alt=""></div>
      </a></li>
      <li><a href="#">
        <div><img src="../assets/img/event/top_bnr_sq_spw2019@2x.jpg" alt=""></div>
      </a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Event'
}
</script>

<style scoped lang="scss">
@import "../assets/helpers/_media-queries";
.event{
  padding: 4em 0;
  text-align: center;
  h2{
    display: inline-block;
    padding-bottom: 3em;
    font-family: EBGaramond-Regular ,serif ;
    letter-spacing: 2px;
  }
  .event-item{
    max-width: 1230px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between ;
    li{
      display: inline-block;
      margin-bottom: 50px;
      width: calc(100% /4 - 35px);
      @include media(sm){
        width: calc(100% /2 - 5px);
        margin-bottom: 10px;
      }
      @include media(xs){
        width: calc(100% /2 - 5px);
        margin-bottom: 10px;
      }
      a{
        display: block;
        img{
          width: 100%;
          height: auto;
        }
        &:hover{
          filter: brightness(.7);
          transition: transform ease .3s,filter ease 1s;
        }
      }
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
