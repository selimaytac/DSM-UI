<template>
  <v-app-bar app dark height="60px" class="primary">
    <v-avatar class="d-block mx-auto" size="120">
      <v-img src="../../public/dsm (6).png"></v-img>
    </v-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <span class="font-weight-light title">Application Management</span>
      </v-list-item-title>
    </v-list-item-content>
    <v-spacer></v-spacer>
    <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn small class="ma-2" outlined  dark v-bind="attrs" v-on="on">
          Uygulamalar
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link active-class="border"
                    :ripple="false">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <ThemeChanger />
    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <div>
          <v-btn icon x-large v-on="on">
            <v-avatar size="48">
              <v-img :src="profilePhoto" :alt="'User Photo'"></v-img>
            </v-avatar>
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar size="70" class="ml-1" v-if="this.profilePhoto">
              <v-img :src="this.profilePhoto" :alt="'User Photo'"></v-img>
            </v-avatar>
            <v-avatar size="70" class="ml-1" v-else>
              <v-icon>mdi-account-outline</v-icon>
            </v-avatar>
            <v-list>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h8" v-if="this.fullName">{{ this.fullName }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="this.department"> {{ this.department }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>


            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text>
              <v-icon left size="20">fa-solid fa-pen</v-icon>
              Edit Account
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn v-on:click="logout" depressed rounded text>
              <v-icon left size="20">fa-solid fa-arrow-right-from-bracket</v-icon>
              Disconnect
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text>
              <v-icon left size="20">fa-solid fa-gear</v-icon>
              Settings
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import ThemeChanger from '@/components/ThemeChanger.vue'
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
// import ThemeChanger from './ThemeChanger.vue';
export default {
  name: 'navbar',
  data() {
    return {
      username: this.$route.params.userName,
      items: [
        { title: 'Scorecard', link:'/scorecard' },
        { title: 'Grafana', link:'/grafana' },
        { title: 'AppDynamics', link:'/appdynamic' },
        { title: 'Zabbix', link:'/zabbix'},
      ],
    }
  },
  computed: {
    ...mapGetters({
      userName: 'auth/getUsername',
      profilePhoto: 'auth/getProfilePhoto',
      fullName: 'auth/getFullName',
      department: 'auth/getDepartment',
    }),
  },
  methods: {
    ...mapActions({
      LogOut: 'auth/setLogout',
      Test: 'auth/setTest'
    }),
    logout() {
      this.LogOut();
      this.$router.push('/').catch(() => { });
    },
  },
  components: {
    ThemeChanger,
  }
};
</script>
<style>

</style>