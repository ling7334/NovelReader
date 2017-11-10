<template>
  <div class="novel">
    <menubar :title="$route.params.novelname" :list="novels"></menubar>
  </div>

</template>

<script>
import menubar from '@/components/menubar/menubar'
export default {
  name: 'novel',
  components: { menubar },
  props: ['novelname'],
  data () {
    return {
      searchNovel: '',
      title: 'Novel Reader',
      user: {
        name: 'Anonymous',
        email: 'name@email.com',
        hash: ''
      },
      novels: [{
        id: 1,
        name: '笑傲江湖',
        link: {name: 'novel', params: {novelname: '笑傲江湖'}}
      },
      {
        id: 2,
        name: '神雕侠侣',
        link: {name: 'novel', params: {novelname: '神雕侠侣'}}
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
