<template>
  <div class="login">
    {{ msg }}
      <form>
        <p>
          用户名：<input type="text" v-model="username">
        </p>
        <p>
          密码：<input type="password" v-model="password">
        </p>
        <p>
          <button type="button" v-on:click="login($data)">登录</button>
        </p>
      </form>
  </div>
</template>

<script>
  import api from '../axios/api'

  export default {
    name: 'login',
    data () {
      return {
        msg: '',
        username: 'lxq',
        password: '123',
        token: '365'
      }
    },
    mounted(){
      this.$store.commit("title", 'Login');
    },
    methods: {
      login (form) {
        if (form.username != 'lxq' || form.password != '123') {
          this.msg = '您的用户名和密码不正确'
        } else {

          let params = {
            sort: 'updated'
          }
          this.$http.post(api.repo_list,params)
            .then(response => {
//              this.token = response.data;
              console.log(response);
              // 跳转到首页
              if (this.token) {
                this.$store.commit("login", this.token)
                let redirect = decodeURIComponent(this.$route.query.redirect || '/hello');
                this.$router.push({
                  path: redirect
                })
              }

            })

        }


      }
    }
  }
</script>

<style scoped>

</style>
