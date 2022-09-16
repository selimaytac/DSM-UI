<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="14">
          <v-card class="elevation-6 mt-10">
            <v-window>
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Sign in to Your Account</h4>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <form class="mt-12" ref="form" @submit.prevent="login()">
                            <v-text-field v-model="username" :rules="usernameRules" name="username"
                              prepend-icon="person" label="Your User Name" required placeholder="username" type="text">
                            </v-text-field>
                            <v-select v-model="selectedDomain" :items="domain" label="@" required name="domain">
                            </v-select>
                            <v-text-field v-model="password" :rules="passwordRules"  prepend-icon="lock" name="password"
                              placeholder="password" label="Your Password" type="password" required></v-text-field>
                            <br>
                            <v-card-actions class="justify-center">
                              <v-btn :loading="loading" type="submit" color="primary" dark block title value="log in">Log
                              In</v-btn>
                            </v-card-actions>
                            <v-alert class="text-center" small type="success" v-model="success" shaped>Giriş Başarılı</v-alert>
                            <v-alert class="text-center" small type="error" v-model="error" shaped>{{errorMessage}}</v-alert>
                           
                          </form>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="primary rounded-bl-xl">
                    <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text">
                        <v-avatar size="128" class="ml-1" v-if="this.profilePhoto">
                          <v-img :src="this.profilePhoto" :alt="'User Photo'"></v-img>
                        </v-avatar>
                        <v-avatar size="128" class="ml-1" v-else>
                          <v-icon>mdi-account-outline</v-icon>
                        </v-avatar>
                        <v-list-item-content>
                          <v-list-item-title v-if="this.fullName">Welcome back {{ this.fullName }}!
                          </v-list-item-title>
                          <v-list-item-subtitle v-if="this.department"> {{ this.department }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <br>
                        <h2 class="text-center ">DSM - Server Monitoring'e Hoş Geldiniz!</h2>
                        <br>
                        <hr>
                        <br>
                        <h5 class="text-center">DSM'e ulaşmak için lütfen önce giriş yapiniz. <br> Erişiminiz yoksa
                          takim arkadaşlarinizdan destek alabilirsiniz.</h5>
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
import { mapActions, mapGetters } from 'vuex';
import SideBar from '@/components/SideBar.vue';
export default {
  name: "signin",
  data() {
    return {
      loading: false,
      success: false,
      error: false,
      errorMessage: 'Giriş Başarısız',
      username: this.userName ?? '',
      usernameRules: [
        v => !!v || 'Kullanıcı adı boş olamaz',
      ],
      password: "",
      passwordRules: [
        v => !!v || 'Şifre boş olamaz',
        v => v.length >= 6 || 'Şifre en az 6 karakter olmalıdır',
      ],
      selectedDomain: this.getDomain ?? '@d-teknoloji.com.tr',
      domain: [
        '@d-teknoloji.com.tr',
        '@vdfholding.com.tr',
        '@dohas.com.tr',
        '@dturizm.com.tr',
        '@vdf.com.tr'
      ],
    }
  },
  computed: {
    ...mapGetters({
      userName: 'auth/getUsername',
      profilePhoto: 'auth/getProfilePhoto',
      fullName: 'auth/getFullName',
      department: 'auth/getDepartment',
      getDomain: 'auth/getStateDomain',
    }),
  },
  methods: {
    ...mapActions({
      authLogin: 'auth/setLogin',
      setDomain: 'auth/setStateDomain'
    }),

    async login() {
      
      try {
        this.setDomain(this.selectedDomain);
        const res = await this.authLogin({
          username: this.username + this.selectedDomain,
          password: this.password,
          
        });
        if (res.isAdUser) {
          this.success = true;
          
          this.$router.push('/home').catch(() => { });
        } else {
        }
      } catch (error) {
        this.error = true;
        if(error.errorCode == 400){
          this.errorMessage = 'Kullanıcı adı veya şifre hatalı'
        }
        else{
          this.errorMessage = 'Sunucu Hatası'
        }
      }
    }

  },
  mounted() {
    this.username = this.userName;
    this.Domain = this.stateDomain;
  },
  props: {
    source: String
  },
  components: { SideBar },
}
</script>

<style >
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}

.v-btn.withoutupercase {
  text-transform: none !important;
}

.v-btn:not(.v-btn--round).v-size--small {
  min-width: 30px !important;
  padding: 0 5px !important;
}
</style>