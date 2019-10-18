<template>
<div>
  <div class="server">
    <div class="server-info">
      <h5>客服電話</h5>
      <h4>02-12345678</h4>
      <p>客服時間 9:00 ～ 17:00</p>
      <p>星期六，星期日和節、假日休息</p>
    </div>
    <div class="server-fix">
      <h5>修理服務</h5>
      <p>我們提供維修接待和各種維護服務</p>
      <p><a href="">> 線上申請</a></p>
      <p><a href="">> 售後服務</a></p>
      <p><a href="">> 烘乾服務</a></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Server'
}
</script>

<style scoped lang="scss">
@import "../assets/helpers/_media-queries";
.servers{
  background-color: black;
  margin: 0 -15px;
  padding: 3em 0;
}
.server{
  font-size: 0.4rem;
  color: #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 1em;
  @include media(xs){
    justify-content: center;
  }
  .server-info{
    width: 35%;
    border-right: 1px white solid;
    margin-right:5em;
    padding-left: 4em;
    @include media(sm){
      width: 40%;
      margin-right: 0em;
      padding-left: 0em;
    }
    @include media(xs){
      width: 40%;
      margin-right: 0em;
      padding-left: 0em;
      padding-right: 0.75em;

    }
    & :nth-child(2){
      font-size: 2rem;
      font-weight: 200;
    }
    & p{
      margin-bottom: .75em;
      font-weight: 400;
    }
  }
  .server-fix{
    align-content: end;
    width: 35%;
    padding-left: 4em;
    @include media(sm){
      width: 40%;
      padding-left: 4em;

    }
    @include media(xs){
      width: 40%;
      padding-left: 2em;

    }
    & :nth-child(2){
      font-size: 0.75rem;
      color: #ccc;
    }
    & p{
      margin-bottom: .75em;
      & :hover{
        color: #777777;
      }
    }
  }
  a{
    text-decoration: none;
    color: #eee;
  }
}

</style>
