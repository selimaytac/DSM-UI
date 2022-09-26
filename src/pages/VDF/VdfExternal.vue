<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
        <SideBar />
        <NavBar />
        <v-card color="grey">
            <v-card-title>
                VDF External
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ma-1 white--text" color="primary" :loading="loading2" :disabled="loading2"
                            outlined @click="loader = 'loading2', ExportExcel()">
                            <v-icon color="primary" dark v-bind="attrs" v-on="on">
                                mdi-microsoft-excel </v-icon>
                        </v-btn>
                    </template>
                    <span>Export to Excel</span>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="externalUrls" :items-per-page="10" :footer-props="{
              'items-per-page-options': [20, 50, 100, 200]
            }" class="elevation-1" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-divider></v-divider>
                        Düzenleme veya silme yapabilirsiniz!
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">İtem Ekle</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.applicationTeam"
                                                    label="Applicataion Team">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.fromServer" label="From Server">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.sourceIpPort" label="Source Ip Port">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.loadBalancerIP" label="LB IP">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.frontApp" label="Front App">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.destinationURL"
                                                    label="Destination Url">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.destinationIP" label="Destination IP">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.destinationPort"
                                                    label="Destination Port">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="close">İptal</v-btn>
                                    <v-btn color="primary" text @click="save">Kaydet</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Silmek istediğinize emin misiniz?
                                </v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="closeDelete">Hayır</v-btn>
                                    <v-btn color="primary" text @click="deleteItemConfirm">Evet</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small color="green" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>

        </v-card>
    </v-app>
</template>
  
<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import { externalUrlService } from '@/services/api/customerInventory/externalUrl.service'
export default {
    name: 'vdfExternal',

    data() {
        return {
            dialog: false,
            dialogDelete: false,
            loader: null,
            loading: false,
            loading2: false,
            loading3: false,
            loading4: false,
            loading5: false,
            loading6: false,
            headers: [
                { text: 'Application Team', align: 'start', sortable: false, value: 'applicationTeam' },
                { text: 'From Server', value: 'fromServer' },
                { text: 'Source IP Port', value: 'sourceIpPort' },
                { text: 'LB IP', value: 'loadBalancerIP' },
                { text: 'Front App', value: 'frontApp' },
                { text: 'Destination Url', value: 'destinationURL' },
                { text: 'Destination Ip', value: 'destinationIP' },
                { text: 'Destination Port', value: 'destinationPort' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            externalUrls: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            search: '',
        }
    },


    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    async created() {
        await this.getAllUrls()
    },

    methods: {
        async getAllUrls() {
            this.externalUrls = await externalUrlService.getExternalUrls()
        },

        editItem(item) {
            this.editedIndex = this.externalUrls.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.externalUrls.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            this.externalUrls.splice(this.editedIndex, 1)
            await externalUrlService.deleteExternalUrl(this.editedItem.id)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        async save() {
            if (this.editedIndex > -1) {
                Object.assign(this.externalUrls[this.editedIndex], this.editedItem)
                await externalUrlService.updateExternalUrl(this.editedItem)
            } else {
                this.externalUrls.push(this.editedItem)
                await externalUrlService.createExternalUrl(this.editedItem)
            }
            this.close()
        },
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
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