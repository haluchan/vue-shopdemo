<template>
  <div>
    <span  :newUserName="newUserName" >{{ newUserName }}</span>
  </div>
</template>

<script>
export default {
  name: 'test',
  // 可使用 model 來定義 prop和event名子，預設為value和input，如果有組件使用到input元素的value值就要改
  model: {
    prop: 'value',
    event: 'input'
  },
  // props 預設為value
  props: ['value'],
  data () {
    return {
      newUserName: this.value
    }
  },
  methods: {
    // update () {
    //   console.log(this.newUserName)
    // }
  },
  watch: {
    // username (nesername) {
    //   this.newUserName = nesername
    // },
    newUserName (val) {
      // 用input 可以實現雙向綁定
      this.$emit('input', val)
      // console.log(val)
    },
    value (val) {
      this.newUserName = val
    }
  }

}
</script>

<style scoped>

</style>
