<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-container>
      <v-row align="center" justify="center" >
          <v-col cols="12" sm="14">
            <v-card class="elevation-6 mt-10"  >
             <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h4 class="text-center" >Sign in to Your Account</h4>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">
                           <form class="mt-12">
                            <v-text-field
                              v-model="name"
                              prepend-icon="person"
                              label="Your User Name"
                              required
                              type="text"
                            ></v-text-field>
                            <v-select
                              v-model="select"
                              :items="items"
                              label="@"
                              required
                             
                            ></v-select>
                            <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Your Password"
                              type="password"
                            ></v-text-field>
                            
                            </form>
                          <v-btn color="black" dark block tile>Sign In</v-btn>
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
    data: () => ({
      name: '',
      password: '',
      select: null,
      items: [
        '@d-teknoloji.com.tr',
        '@vdfholding.com.tr',
        '@dohas.com.tr',
        '@dturizm.com.tr',
        '@vdf.com.tr'
      ],
    }),
    props: {
        source: String
    },
    components: { SideBar }
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