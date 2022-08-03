<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab @click="overalldisk=true">Overall Disk Status</v-tab>
           <v-tab @click="scheduledjobs=true; overalldisk=false">Scheduled Jobs</v-tab>
            <v-tab @click="odmserverlist=true; scheduledjobs=false; overalldisk=false">Odm Server List</v-tab>
             <v-tab @click="monthlykpi=true; odmserverlist=false; scheduledjobs=false; overalldisk=false">Monthly Kpi Status</v-tab>
        </v-tabs>
         <v-card-text></v-card-text>
        <div>
          <OverallDisk v-if="overalldisk"/>
          <ScheduledJobs v-else-if="scheduledjobs"/>
          <OdmServer v-else-if="odmserverlist"/>
          <Monthlykpi v-else="monthlykpi"/>
        </div>
    </v-card>
  </v-app>
</template>

<script>
import OverallDisk from './OverallDisk.vue'
import ScheduledJobs from './ScheduledJobs.vue'
import OdmServer from './OdmServer.vue'
import Monthlykpi from './Monthlykpi.vue'

  export default {
    name: 'reports',
    data () {
      return {
        overalldisk:true,
        scheduledjobs:false,
        odmserverlist:false,
        monthlykpi:false,
      }
    },
    components: {
    OverallDisk,
    ScheduledJobs,
    OdmServer,
    Monthlykpi
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