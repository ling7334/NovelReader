<template>
  <div class="index">
    <menubar :title="title" :list="novels"></menubar>
  </div>

</template>

<script>

export default {
  name: 'index',
  created () {
    // 登陆
    // 获取小说列表
    this.axios.get('/novel')
      .then((response) => {
        this.novels = response.data
        console.log(response)
      })
      .catch((error) => {
        alert('无法获取小说列表')
        console.log(error.message)
      })
  },
  data () {
    return {
      title: 'Novel Reader',
      user: null,
      novels: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
