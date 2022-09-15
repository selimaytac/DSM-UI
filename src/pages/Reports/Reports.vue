<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab @click="monthlykpi=true">Monthly Kpi Status</v-tab>
           <v-tab @click="scheduledjobs=true; monthlykpi=false">Scheduled Jobs</v-tab>
            <v-tab @click="odmserverlist=true; scheduledjobs=false; monthlykpi=false">Odm Server List</v-tab>
             <v-tab @click="overalldisk=true; odmserverlist=false; scheduledjobs=false; monthlykpi=false">Overall Disk Status</v-tab>
        </v-tabs>
         
        <div>
          <Monthlykpi v-if="monthlykpi"/>
          <ScheduledJobs v-else-if="scheduledjobs"/>
          <OdmServer v-else-if="odmserverlist"/>
          <OverallDisk v-else="overalldisk"/>
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
        monthlykpi:true,
        scheduledjobs:false,
        odmserverlist:false,
        overalldisk:false,
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