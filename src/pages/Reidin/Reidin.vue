<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
        <v-card>
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab @click="reidinInventory=true">Reidin Inventory</v-tab>
            </v-tabs>
            <div>
                <ReidinInventory v-if="reidinInventory" />
            </div>
        </v-card>
    </v-app>
</template>
  
<script>
import ReidinInventory from './ReidinInventory.vue'

export default {
    name: 'reidinInventory',
    data() {
        return {
            reidinInventory: true,
        }
    },
    components: {
        ReidinInventory
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