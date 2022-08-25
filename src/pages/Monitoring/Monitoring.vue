<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab @click="alerts=true">Alerts</v-tab>
        </v-tabs>
         
        <div>
          <Alerts v-if="alerts"/>
        </div>
    </v-card>
  </v-app>
</template>

<script>
import Alerts from './Alerts.vue'

  export default {
    name: 'home',
    data () {
      return {
        alerts:true,
      }
    },
    components: {
    Alerts,
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