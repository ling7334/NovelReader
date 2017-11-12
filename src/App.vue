<template>
  <div id="app">
    <menubar :title="title" :list="list"></menubar>
    <router-view @changeTitle="onChangeTitle" @changeList="onChangeList"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Novel Reader',
      list: []
    }
  },
  methods: {
    onChangeTitle: function (title) {
      this.title = title
    },
    onChangeList: function (list) {
      this.list = list
    }
  }
}
</script>

<style>
</style>
