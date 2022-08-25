<template>
  <v-app-bar app dark height="60px" class="primary">
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-list-item-content>
      <v-list-item-title>
        <span class="font-weight-bold title">DSM </span>
        <span class="font-weight-light title">- Server Monitoing</span>
      </v-list-item-title>
    </v-list-item-content>
    <v-btn class="ma-2" icon>
      <v-badge bordered overlap color="red" content="5" class="mt-1" dark>
        <v-icon color="white">far fa-bell</v-icon>
      </v-badge>
    </v-btn>
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
            <v-avatar size="70" class="ml-1" v-if="this.profilePhoto.length > 1">
              <v-img :src="this.profilePhoto" :alt="'User Photo'"></v-img>
            </v-avatar>
            <v-list>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h8" v-if="this.fullName.length > 1">{{ this.fullName }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="this.department.length > 1"> {{ this.department }}
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
      drawer: null,
      username: this.$route.params.userName,
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
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    ...mapActions({
      LogOut: 'auth/setLogout'
    }),
    logout() {
      this.LogOut();
      this.$router.push('/').catch(() => { });
    }
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
  components: {
    ThemeChanger,
    ThemeChanger
}
};
</script>
<style>
</style>