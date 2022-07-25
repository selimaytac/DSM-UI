<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab @click="overview=true">Overview</v-tab>
           <v-tab @click="serverstatics=true; overview=false">Server Statics</v-tab>
            <v-tab @click="appmanagement=true; serverstatics=true; overview=false">App Management</v-tab>
             <v-tab @click="elasticsearch=true; appmanagement=true; serverstatics=true; overview=false">Elastic Search Invetory</v-tab>
        </v-tabs>
         <v-card-text></v-card-text>
        <div>
          <Overview v-if="overview"/>
          <ServerStatics v-else-if="serverstatics"/>
          <AppManagement v-else-if="appmanagement"/>
          <ElasticInventory v-else="elasticsearch"/>
        </div>
    </v-card>
  </v-app>
</template>

<script>
import AppManagement from './AppManagement.vue'
import elasticInventory from './elasticInventory.vue'
import ServerStatics from './ServerStatics.vue'
import Overview from './Overview.vue'

  export default {
    name: 'home',
    data () {
      return {
        overview:true,
        serverstatics:false,
        appmanagement:false,
        elasticsearch:false,
      }
    },
    components: {
    AppManagement,
    elasticInventory,
    ServerStatics,
    Overview,
    
},
  }
</script>

<style>
.v-btn.withoutupercase{
  text-transform: none !important;
}
.v-btn:not(.v-btn--round).v-size--small{
  min-width: 30px !important;
  padding: 0 5px !important;
}

</style>