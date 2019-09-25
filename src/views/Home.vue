<template>
  <div class="home text-center">
    <h3>Homepage</h3>
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="text-center">
      <a href="#" @click.prevent="logout">登出</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
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
