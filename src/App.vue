<template>
  <div id="app">
    <div>
      <loading :active.sync="isLoading"></loading>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main";
/*@import "~bootstrap/scss/bootstrap";*/

</style>
