<template>
  <footer class="bg-light text-muted py-5 footer">
    <div class="container">
      <ul class="list-inline text-center">
        <li class="list-inline-item">© Copright 2019  *snow climb</li>
        <br class="br">
        <li class="list-inline-item">
          <a class="media-link" href="#">
            <i class="fab fa-instagram"></i> Instagrame</a>
        </li>
        <li class="list-inline-item">
          <a class="media-link" href="#">
            <i class="fab fa-facebook-f"></i> Facebook</a>
        </li>
        <li class="list-inline-item">
          <a class="media-link" href="#">About</a>
        </li>
      </ul>
      <p class="text-center">Made with Halu Chan for ShowCase </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterInfo'
}
</script>

<style lang="scss">
@import "../assets/helpers/_media-queries";
.footer{
  position: relative;
  z-index: 90;
  .list-inline-item{
    .media-link {
      text-decoration: none;
    }
  }
  .br{
    display: none;
    @include media(xs){
      display: block;
    }
  }
}

</style>
