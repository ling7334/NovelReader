<template>
  <div class="index">
    <!-- <menubar :title="title" :list="novels"></menubar> -->
    <div class="bookcase">
      <md-layout md-gutter>
        <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="50" md-flex-large="33" md-flex-xlarge="25" v-for="novel in novels" :key="novel.id">
          <md-card class="card-tile" md-with-hover>
            <md-card-header>
              <md-card-media md-medium>
                <img :src="getImg(novel.img)" alt="default" height="150" width="120">
              </md-card-media>
              <md-card-header-text>
                <div class="md-title">{{ novel.title }}</div>
                <div class="md-subhead"><b>Author:</b> {{ novel.author }}</div>
                <div class="md-subhead"><b>Last Read:</b> {{ novel.lastread }}</div>
                <div class="md-subhead"><b>Lasest:</b> {{ novel.lasest }}</div>
                <div class="md-subhead"><b>Update:</b> {{ novel.update }}</div>
              </md-card-header-text>
            </md-card-header>

            <md-card-actions>
              <router-link tag="md-button" :to="novel.link">Read</router-link>
              <md-button><md-icon class="md-accent">delete</md-icon></md-button>
            </md-card-actions>
          </md-card>
        </md-layout>
      </md-layout>
    </div>
  </div>

</template>

<script>

export default {
  name: 'index',
  created () {
    this.$nextTick(() => {
      this.$emit('changeTitle', 'Novel Reader')
      this.axios.get('/novel')
        .then((response) => {
          this.novels = response.data
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
      novels: []
    }
  },
  methods: {
    getImg (path) {
      return path || 'static/images/default.jpg'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.bookcase{
  margin: 5% 5% 5% 5%;
}
.card-tile{
  margin-left: 1%;
  margin-right: 1%;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
