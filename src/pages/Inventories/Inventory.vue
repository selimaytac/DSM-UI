<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
        <SideBar />
        <NavBar />
        <v-main>
            <v-container>
                <div class="link-container d-flex justify-center align-center">
                    
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-4 white--text" color="primary" elevation="2" x-large rounded to="/vdf" dark
                                v-bind="attrs" v-on="on">VDF Inventory</v-btn>
                        </template>
                        <span>Click for VDF Inventory</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-4 white--text" color="primary" elevation="2" x-large rounded to="/reidinInventory" dark
                                v-bind="attrs" v-on="on">Reidin Inventory</v-btn>
                        </template>
                        <span>Click for Reidin Inventory</span>
                    </v-tooltip>

                </div>
            </v-container>
            <v-container>
                <div class="link-container d-flex justify-center align-center">
                    
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-4 white--text" color="primary" elevation="2" x-large rounded to="/siteInventory" dark
                            v-bind="attrs" v-on="on">Site Inventory</v-btn>
                        </template>
                        <span>Click for Site Inventory</span>
                    </v-tooltip>
                    
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-4 white--text" color="primary" elevation="2" x-large rounded to="/azureInventory" dark
                                v-bind="attrs" v-on="on">Azure Inventory</v-btn>
                        </template>
                        <span>Click for Azure Inventory</span>
                    </v-tooltip>
                    
                </div>
            </v-container>
            <v-container>
                <div class="link-container d-flex justify-center align-center">
                    
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-4 white--text" color="primary" elevation="2" x-large rounded to="/frameworkVersions" dark
                            v-bind="attrs" v-on="on">Framework Version Inventory</v-btn>
                        </template>
                        <span>Click for Framework Version Inventory</span>
                    </v-tooltip>
                    
                    <!-- <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-4 white--text" color="primary" elevation="2" x-large rounded to="/azureInventory" dark
                                v-bind="attrs" v-on="on">Azure Inventory</v-btn>
                        </template>
                        <span>Click for Azure Inventory</span>
                    </v-tooltip> -->
                    
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
export default {
    name: 'inventories',

    data() {
        return {

        }
    },
    mounted: function () {
        let elHtml = document.getElementsByTagName('html')[0]
        elHtml.style.overflowY = 'hidden'
    },
    destroyed: function () {
        let elHtml = document.getElementsByTagName('html')[0]
        elHtml.style.overflowY = null
    },
    components: {
        SideBar,
        NavBar,
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

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>