<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-card>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab @click="projects=true">Projects</v-tab>
           <v-tab @click="deploymentA=true; projects=false">Deployment Agents</v-tab>
            <v-tab @click="deploymentG=true; deploymentA=true; projects=false">Deployment Groups</v-tab>
        </v-tabs>
         <v-card-text></v-card-text>
        <div>
          <Projects v-if="projects"/>
          <DeploymentAgent v-else-if="deploymentA"/>
          <DeploymentGroup v-else="deploymentG"/>
        </div>
    </v-card>
  </v-app>
</template>

<script>
import Projects from './Projects.vue'
import deploymentAgent from './deploymentAgent.vue'
import deploymentGroup from './deploymentGroup.vue'

  export default {
    name: 'azureHome',
    data () {
      return {
        projects:true,
        deploymentA:false,
        deploymentG:false,
      }
    },
    components: {
    Projects,
    deploymentAgent,
    deploymentGroup,
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