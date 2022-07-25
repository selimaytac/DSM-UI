<template>
  <v-app-bar app dark color="grey" height="80px">
    <v-text-field
      v-model="search"
      label="Search..."
      filled
      prepend-inner-icon="mdi-magnify"
      dense
      solo
      flat
      background-color="#1D1C21"
      dark
      class="ml-20 mt-5"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn class="ma-2" icon>
      <v-badge bordered overlap color="red" content="5" class="mt-1" dark>
        <v-icon color="white">far fa-bell</v-icon>
      </v-badge>
    </v-btn>
    <v-btn icon @click="toggle_dark_mode">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
      <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar size="48">
              <v-img v-on="on" src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar>
                <v-img v-on="on" src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> <v-icon left size="20">fa-solid fa-pen</v-icon>
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text><v-icon left size="20">fa-solid fa-arrow-right-from-bracket</v-icon>
                Disconnect
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text><v-icon left size="20">fa-solid fa-gear</v-icon>
                Settings
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'navbar',
  data: () => ({
      user: {
        fullName: 'Koray Ay',
        email: 'koray.ay@d-teknoloji.com.tr',
      },
    }),
  methods: {
    toggle_dark_mode: function(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme",this.$vuetify.theme.dark.toString());
    }
  },
  mounted(){
    const theme = localStorage.getItem("dark_theme");
    if(theme){
      if(theme === "true"){
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }else if(
      window.matchMedia && 
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ){
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme",this.$vuetify.theme.dark.toString());
    }
  }
};
</script>
<style></style>