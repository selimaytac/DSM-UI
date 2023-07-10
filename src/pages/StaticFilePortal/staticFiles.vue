<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
        <v-card>
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab @click="staticFilesInventory=true">Static File Inventory</v-tab>
            </v-tabs>
            <div>
                <StaticFilesInventory v-if="staticFilesInventory" />
            </div>
        </v-card>
    </v-app>
</template>
  
<script>
import StaticFilesInventory from './staticFilesInventory.vue'

export default {
    name: 'staticFilesInventory',
    data() {
        return {
            staticFilesInventory: true,
        }
    },
    components: {
        StaticFilesInventory
},
}
</script>
  
<style>
.v-btn.withoutupercase {
    text-transform: none !important;
}

.v-btn:not(.v-btn--round).v-size--small {
    min-width: 30px !important;
    padding: 0 5px !important;
}
</style>