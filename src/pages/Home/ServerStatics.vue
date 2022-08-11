<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <SideBar/>
    <v-container>
      <NavBar/>
    </v-container>
    <v-container>
      <v-row>
        <v-row>
        <v-col cols="12" sm="12">
          <v-toolbar flat color="rgba(0,0,0,0)" dark>
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-row class="px-5 mt-n6 ml-5">
            <v-col cols="12" sm="3" v-for="list in lists" :key="list">
              <v-card align="center" color="#F9FAFC" class="rounded-circle border pt-10" width="200" height="200" flat>
                <v-card-text class="grey--text text-lg-h6">
                  {{ list.title }}
                </v-card-text>
                <v-btn absolute color="#2EBFAF" class="white--text" fab left top>
                  <h2>{{ list.count }}</h2>
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
  export default {
    name: 'overalldisk',
    data: () => ({
   
    lists: [
      {title: "Active Agents",count: 21,},
      {title: "Total Agents",count: 41,},
      {title: "Up Sites",count: 35,},
      {title: "Down Sites",count: 15,},
    ],
  }),
  components: {
    SideBar,
    NavBar,
  },
};
</script>
<style scoped>
.border {
  border: 2px solid #2ebfaf !important;
}
.v-btn--fab.v-size--default.v-btn--absolute.v-btn--top {
  top: 65px !important;
}
.v-btn--absolute.v-btn--left,
.v-btn--fixed.v-btn--left {
  left: -26px !important;
}
</style>