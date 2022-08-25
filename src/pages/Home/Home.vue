<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab @click="overview=true">Overview</v-tab>
           <v-tab @click="serverstatics=true; overview=false">Server Statics</v-tab>
            <v-tab @click="appmanagement=true; serverstatics=false; overview=false">App Management</v-tab>
             <v-tab @click="elasticinventory=true; appmanagement=false; serverstatics=false; overview=false">Elastic Search Invetory</v-tab>
        </v-tabs>
        <div>
          <Overview v-if="overview"/>
          <ServerStatics v-else-if="serverstatics"/>
          <AppManagement v-else-if="appmanagement"/>
          <ElasticInventory v-else="elasticinventory"/>
        </div>
    </v-card>
  </v-app>
</template>

<script>
import AppManagement from './AppManagement.vue'
import ServerStatics from './ServerStatics.vue'
import Overview from './Overview.vue'
import ElasticInventory from './elasticInventory.vue'

  export default {
    name: 'home',
    data () {
      return {
        overview:true,
        serverstatics:false,
        appmanagement:false,
        elasticinventrory:false,
      }
    },
    components: {
    AppManagement,
    ServerStatics,
    Overview,
    ElasticInventory
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