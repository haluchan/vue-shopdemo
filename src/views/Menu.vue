<template>
  <div class="hello">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link"  to="/production/">child1</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/production/child2">child2</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/production/child3">child3</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/production/child/fff">child4</router-link>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="updatePath">relocation to child2</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="beforePath">back to last path</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data: function () {
    return {}
  },
  methods: {
    updatePath () {
      this.$router.push('/production/child2')
    },
    beforePath () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
