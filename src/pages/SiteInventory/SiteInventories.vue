<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
        <v-card>
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab @click="siteInventory=true">Site Inventory</v-tab>
            </v-tabs>
            <div>
                <SiteInventory v-if="siteInventory" />
            </div>
        </v-card>
    </v-app>
</template>
  
<script>
import SiteInventory from './SiteInventory.vue'

export default {
    name: 'siteInventory',
    data() {
        return {
            siteInventory: true,
        }
    },
    components: {
    SiteInventory
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