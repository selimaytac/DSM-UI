<template>
    <v-navigation-drawer v-model="drawer" app mini-variant mini-variant-width="100" class="primary" permanent expand-off-hover>
        <v-avatar class="d-block mx-auto mt-2 mb-2" size="70">
            <v-img src="../../public/logo.png"></v-img>
        </v-avatar>
        <v-list nav dense class="mt-4 primary">
            <v-list-item-group v-model="selectedItem">
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link active-class="border"
                    :ripple="false" class="primary">
                    <v-list-item-content>
                        <v-icon small v-text="item.icon"></v-icon>
                        <v-list-item-subtitle align="center" v-text="item.text" class="mt-3 caption">
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import store from '../store';
export default {
    data: () => ({
        selectedItem: 0,
        drawer: null,
        items: [
            { icon: 'fas fa-home', text: 'Home', link: '/home' },
            { icon: 'fas fa-cloud', text: 'Azure Inventory', link:'/azureInventory'},
            { icon: 'fas fa-earth-americas', text: 'Sites', link: '/sites' },
            { icon: 'fas fa-server', text: 'Servers', link: '/servers' },
            { icon: 'fas fa-sitemap', text: 'Companies', link: '/companies' },
            { icon: 'mdi-transit-connection-variant ', text: 'Responsible', link: '/responsible' },
            { icon: 'fas fa-database', text: 'Database Portal', link: '/databaseportal' },
            { icon: 'fas fa-file', text: 'Reports', link: '/reports' },
            { icon : 'fas fa-house-chimney', text: 'Scorecard', link:'/scorecard'},

            // {icon: 'fas fa-clock', text:'Monitoring', link: '/monitoring'},
        ],
    }),
    created() {
        if(store.getters["auth/getRole"].includes("Administrator","CIFANG")){
            this.items.splice(1, 0, { icon: 'fas fa-code', text: 'Azure DevOps', link: '/azureHome' })
        }
    }

}
</script>

<style>
.border {
    margin-left: 8px;
    margin-right: 8px;
    background: grey;
    border-radius: 20px;
    text-decoration: none;
}

.v-list-item-group .v-list-item--active {
    color: white !important;
}

.theme--light.v-list-item--active .v-list-item__subtitle,
.theme--light.v-list-item .v-list-item__action-text {
    color: white !important;
}
</style>