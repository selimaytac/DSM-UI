<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
        <v-card>
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab @click="external=true">VDF External</v-tab>
                <v-tab @click="internal=true; external=false">VDF Internal</v-tab>
                <v-tab @click="vdfDbInventory=true; internal=false; external=false">VDF App Db Inventory</v-tab>
            </v-tabs>
            <div>
                <VdfExternal v-if="external" />
                <VdfInternal v-else-if="internal" />
                <VdfDbInventory v-else="vdfDbInventory" />
            </div>
        </v-card>
    </v-app>
</template>
  
<script>
import VdfExternal from './VdfExternal.vue'
import VdfInternal from './VdfInternal.vue'
import VdfDbInventory from './VdfDbInventory.vue'

export default {
    name: 'vdf',
    data() {
        return {
            external: true,
            internal: false,
            vdfDbInventory: false,
        }
    },
    components: {
        VdfExternal,
        VdfInternal,
        VdfDbInventory
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