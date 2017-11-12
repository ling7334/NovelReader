<template>
  <div class="novel">
    <!-- <menubar :title="$route.params.novelname" :list="novels"></menubar> -->
  </div>

</template>

<script>
export default {
  name: 'novel',
  created () {
    this.$nextTick(() => {
      this.$emit('changeTitle', this.$route.params.novelname)

      this.axios.get('/novel')
        .then((response) => {
          // this.list = response.data
          console.log(response)
        })
        .catch((error) => {
          alert('无法获取小说列表')
          console.log(error.message)
        })
    })
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
