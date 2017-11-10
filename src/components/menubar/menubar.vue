<<template>
    <div class="menubar">
    <md-toolbar>

        <md-button class="md-icon-button" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title">{{ title }}</h2>
        <span style="flex:1"></span>
          <form novalidate @submit.stop.prevent="serchNovel">
            <md-input-container>
              <md-input placeholder="请输入小说名" v-model="serchNovelName"></md-input>
              <md-icon>search</md-icon>
            </md-input-container>
          </form>
          <md-button class="md-icon-button">
            <md-icon>brightness_low</md-icon>
          </md-button>

    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-account-header">
        <md-list class="md-transparent">
          <md-avatar class="md-large">
            <img :src="computeUserAvatar" alt="Avatar">
          </md-avatar>

          <md-list-item>
            <div class="md-list-text-container">
              <span>{{ computeUserName }}</span>
              <span>{{ computeUserEmail }}</span>
            </div>
            <md-menu>
              <md-button class="md-icon-button md-list-action" md-menu-trigger><md-icon>arrow_drop_down</md-icon></md-button>

              <md-menu-content>
                <md-menu-item v-if="user">Info</md-menu-item>
                <md-menu-item @click="logout" v-if="user">Logout</md-menu-item>
                <md-menu-item @click="login(1, 'password')" v-else>Login</md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-list-item>
        </md-list>
      </md-toolbar>
      <md-list>
        <md-list-item v-for="item in list" :key="item.id">
          <router-link :to="item.link">{{ item.name }}</router-link>
        </md-list-item>
      </md-list>

    </md-sidenav>
  </div>
</template>

<script>
export default {
  name: 'menubar',
  props: ['title', 'list'],
  data: function () {
    return {
      serchNovelName: '',
      user: null
    }
  },
  created () {
    this.getUser()
  },
  computed: {
    computeUserAvatar: function () {
      if (this.user && this.user.hash) {
        return 'http://www.gravatar.com/avatar/' + this.user.hash + '?d=wavatar'
      }
      return 'http://www.gravatar.com/avatar/?d=wavatar'
    },
    computeUserName: function () {
      if (this.user && this.user.username) {
        return this.user.username
      }
      return 'Anonymous'
    },
    computeUserEmail: function () {
      if (this.user && this.user.email) {
        return this.user.email
      }
      return ''
    }
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    serchNovel () {
      this.$router.push({name: 'search', params: {novelname: this.serchNovelName}})
    },
    logout () {
      this.$session.destroy()
      this.user = null
    },
    setSession (data) {
      switch (data.Status) {
        case 200:
          this.$session.set('userid', data.userid)
          this.$session.set('token', data.token)
          this.$session.set('refreshToken', data.refreshToken)
          this.user = {}
          this.user.username = data.username
          this.user.email = data.email
          this.user.hash = data.hash
          break
        case 300:
          this.refresh()
          break
        default:
          alert(data.StatusText)
          console.log(data)
          break
      }
    },
    login (id, pass) {
      this.axios.post('/login', {userid: id, password: pass})
        .then((response) => {
          this.setSession(response.data)
        })
        .catch((error) => {
          alert('无法登陆')
          console.log(error.message)
        })
    },
    getUser () {
      if (this.$session.exists() && this.$session.has('userid') && this.$session.has('token')) {
        this.axios.get('/user', {params: {userid: this.$session.get('userid'), token: this.$session.get('token')}})
          .then((response) => {
            this.setSession(response.data)
          })
          .catch((error) => {
            alert('无法获取用户')
            console.log(error.message)
          })
      }
    },
    refresh () {
      if (this.$session.exists() && this.$session.has('userid') && this.$session.has('refreshToken')) {
        this.axios.get('/refresh', {params: {userid: this.$session.get('userid'), refreshToken: this.$session.get('refreshToken')}})
          .then((response) => {
            this.setSession(response.data)
          })
          .catch((error) => {
            alert('无法刷新token')
            console.log(error.message)
          })
      }
    }
  }
}
</script>

<style></style>
