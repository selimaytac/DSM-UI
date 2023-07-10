<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
        <SideBar />
        <NavBar />
        <v-card color="grey">
            <v-card-title>
                Static File Inventory
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <!-- <v-btn class="ma-1 white--text" color="primary" :loading="loading2" :disabled="loading2"
                            outlined @click="loader = 'loading2', ExportExcel()">
                            <v-icon color="primary" dark v-bind="attrs" v-on="on">
                                mdi-microsoft-excel </v-icon>
                        </v-btn> -->
                    </template>
                    <span>Export to Excel</span>
                </v-tooltip>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="filterFiles" :loading="loaderTable" :items-per-page="10" :footer-props="{
              'items-per-page-options': [20, 50, 100, 200]
            }" class="elevation-1" :search="search">
                <template v-for="(col, index) in filters" v-slot:[`header.${index}`]="{ header }">
                    {{ header.text }}
                    <v-menu :key="index" offset-y :close-on-content-click="false">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" color="teal">
                                <v-icon small :color="filters[header.value].length ? 'red' : ''">
                                    mdi-filter-variant
                                </v-icon>
                            </v-btn>
                        </template>
                        <div style="background-color: white; width: 280px">
                            <v-list>
                                <v-list-item>
                                    <div v-if="filters.hasOwnProperty(header.value)">
                                        <v-autocomplete multiple dense auto-select-first clearable chips small-chips
                                            color="teal" :items="columnValueList(header.value)" append-icon="mdi-filter"
                                            v-model="filters[header.value]"
                                            :label="filters[header.value] ? `${header.text}` : ''" hide-details>
                                            <template v-slot:selection="{ item, index }">
                                                <v-chip small class="caption" v-if="index < 5">
                                                    <span>
                                                        {{ item }}
                                                    </span>
                                                </v-chip>
                                                <span v-if="index === 5" class="grey--text caption">
                                                    (+{{ filters[header.value].length - 5 }} others)
                                                </span>
                                            </template>
                                        </v-autocomplete>
                                    </div>
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-menu>
                </template>
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-divider></v-divider>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Item</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.FileDescription" label="File Description">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.FileTitle" label="File Title">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12" md="8">
                                                <v-file-input v-model="editedItem.file" label="File">
                                                </v-file-input>
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
                    <v-icon small color="green" class="mr-2" @click="downloadItem(item)">mdi-download</v-icon>
                    <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>

        </v-card>
    </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import { staticInventoryService } from '@/services/api/staticFileInventory/staticFileInventory.service'
export default {
    name: 'StaticFilesInventory',

    data() {
        return {
            filters: { fileName: [], fileDescription: [], fileType: [], fileUploadDate: [], uploadedBy: [], fileTitle: [], filePath: [] },
            dialog: false,
            dialogDelete: false,
            loader: null,
            loading: false,
            loading2: false,
            loading3: false,
            loading4: false,
            loading5: false,
            loading6: false,
            loaderTable: false,
            headers: [
                { text: 'Title', value: 'fileTitle', fixed: true },
                { text: 'File Name', align: 'start',  value: 'fileName' },
                { text: 'Actions', value: 'actions', sortable: false },
                { text: 'Description', value: 'fileDescription', fixed: true },
                { text: 'Type', value: 'fileType', fixed: true },
                { text: 'Uploaded By', value: 'uploadedBy', fixed: true },
                { text: 'Upload Date', value: 'fileUploadDate', fixed: true },
                { text: 'Path', value: 'filePath', fixed: true },

            ],
            fileInventory: [],
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
        await this.getAllFiles()
    },

    methods: {
        async getAllFiles() {
            this.loaderTable = true;
            this.fileInventory = await staticInventoryService.getAllFiles()
            this.loaderTable = false;
        },

        async downloadItem(item) {
            this.editedIndex = this.fileInventory.indexOf(item)
            this.editedItem = Object.assign({}, item)
            await staticInventoryService.downloadFile(item.fileName)
        },

        deleteItem(item) {
            this.editedIndex = this.fileInventory.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            this.fileInventory.splice(this.editedIndex, 1)
            await staticInventoryService.deleteFile(this.editedItem.id)
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
                // Object.assign(this.appdbInventoryService[this.editedIndex], this.editedItem)
                // await fileInventoryService.updatefileInventory(this.editedItem)
            } else {
                // this.fileInventory.push(this.editedItem)
                console.log(this.editedItem)
                this.uploadedItem = await staticInventoryService.uploadFile(this.editedItem)
                this.fileInventory.push(this.uploadedItem)
            }
            this.close()
        },
        ExportExcel() {
            if (this.search.length > 0) {
                staticInventoryService.getExportSearchList(this.search);
            } else {
                staticInventoryService.getExportList();
            }
        },
        columnValueList(val) {
            return this.fileInventory.map((d) => d[val]);
        },
    },
    computed: {
        filterFiles() {
            return this.fileInventory.filter((d) => {
                return Object.keys(this.filters).every((f) => {
                    return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
                });
            });
        },
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