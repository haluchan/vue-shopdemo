<template>
  <div class="hello">
    <a href="#" @click.prevent="logout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API_PATH}/logout`
      const vm = this
      this.$http.post(api).then((response) => {
        console.log('response', response.data.message)
        if (response.data.success) {
          vm.$router.push('/login').catch(err => {
            if (err) {}
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
