<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-container>
      <v-row align="center" justify="center" >
          <v-col cols="12" sm="14">
            <v-card class="elevation-6 mt-10">
             <v-window v-model="step"> 
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h4 class="text-center" >Sign in to Your Account</h4>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">
                           <form class="mt-12" ref="form" @submit.prevent="login()">
                            <v-text-field
                              v-model="username"
                              name="username"
                              prepend-icon="person"
                              label="Your User Name"
                              required
                              placeholder="username"
                              type="text"
                            ></v-text-field>
                            <v-select
                              v-model="defaultSelected"
                              :items="domain"
                              label="@"
                              item-text="domainname"
                              required
                              name="domain"
                            ></v-select>
                            <v-text-field
                              v-model="password"
                              prepend-icon="lock"
                              name="password"
                              placeholder="password"
                              label="Your Password"
                              type="password"
                              required
                            ></v-text-field>
                            <br>
                           <v-btn type="submit" color="black" dark block title value="log in">{{stateObj.login.name}}</v-btn>
                            </form>
                          </v-col>
                        </v-row>  
                      </v-card-text>
                    </v-col>
                    
                    <v-col cols="12" md="6" class="black rounded-bl-xl" >
                    <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <v-avatar size="128" class="ml-1">
                          <v-img v-on="on" src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                        </v-avatar>
                        <v-list-item-content>
                          <v-list-item-title>Koray Ay</v-list-item-title>
                          <v-list-item-subtitle>Stajyer</v-list-item-subtitle>
                        </v-list-item-content>
                        <br>  
                        <h2 class="text-center ">DSM - Server Monitoring'e Hoş Geldiniz!</h2>
                        <br>
                        <hr>
                        <br>
                        <h5 class="text-center"
                        >DSM'e ulaşmak için lütfen önce giriş yapiniz. <br> Erişiminiz yoksa takim arkadaşlarinizdan destek alabilirsiniz.</h5>
                      </v-card-text>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
      </v-row>
  </v-container>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
  export default {
    name: "signin",
    data () {
      return{
        username: "",
        password: "",
        defaultSelected: {
          domainname: "@d-teknoloji.com.tr",
        },
        domain: [
          '@d-teknoloji.com.tr',
          '@vdfholding.com.tr',
          '@dohas.com.tr',
          '@dturizm.com.tr',
          '@vdf.com.tr'
        ],
        stateObj: {
          login : {
              name: 'Sign In',
          }
        }
      }
    },
    props: {
        source: String
    },
    components: { SideBar },
    methods: {
    login() {
      const { username } = this;
      this.$router.replace({ name: "home", params: { username: username},});
    },
  },

}
</script>

<style >
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}
.v-btn.withoutupercase{
  text-transform: none !important;
}
.v-btn:not(.v-btn--round).v-size--small{
  min-width: 30px !important;
  padding: 0 5px !important;
}
</style>