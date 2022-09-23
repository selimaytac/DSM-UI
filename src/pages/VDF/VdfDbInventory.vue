<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
      <SideBar />
      <NavBar />
      <v-card color="grey">
          <v-card-title>
              VDF App Db Inventory
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="appDbInventories" :items-per-page="10" :footer-props="{
          'items-per-page-options': [20, 50, 100, 200]
        }" class="elevation-1" :search="search">
              <template v-slot:top>
                  <v-toolbar flat>
                      <v-divider></v-divider>
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
                                              <v-text-field v-model="editedItem.server" label="Server">
                                              </v-text-field>
                                          </v-col>
                                          <v-col cols="12" sm="6" md="4">
                                              <v-text-field v-model="editedItem.appName" label="App. Name">
                                              </v-text-field>
                                          </v-col>
                                          <v-col cols="12" sm="6" md="4">
                                              <v-text-field v-model="editedItem.dbip" label="DB IP">
                                              </v-text-field>
                                          </v-col>
                                          <v-col cols="12" sm="6" md="4">
                                              <v-text-field v-model="editedItem.dbName" label="DB Name">
                                              </v-text-field>
                                          </v-col>
                                          <v-col cols="12" sm="6" md="4">
                                              <v-text-field v-model="editedItem.dbPort" label="DB port">
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
import { appdbInventoryService } from '@/services/api/customerInventory/appdbInventory.service'
export default {
  name: 'AppDbInventory',

  data() {
      return {
          dialog: false,
          dialogDelete: false,
          headers: [
              { text: 'Server', align: 'start', sortable: false, value: 'server' },
              { text: 'App. Name', value: 'appName' },
              { text: 'DB IP', value: 'dbip' },
              { text: 'DB Name', value: 'dbName' },
              { text: 'DB Port', value: 'dbPort' },
              { text: 'Actions', value: 'actions', sortable: false },
          ],
          appDbInventories: [],
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
          this.appDbInventories = await appdbInventoryService.getAppDbInventories() 
          },

      editItem(item) {
          this.editedIndex = this.appDbInventories.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
      },

      deleteItem(item) {
          this.editedIndex = this.appDbInventories.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
      },

      async deleteItemConfirm() {
          this.appDbInventories.splice(this.editedIndex, 1)
          await appdbInventoryService.deleteAppDbInventory(this.editedItem.id)
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
              Object.assign(this.appdbInventoryService[this.editedIndex], this.editedItem)
              await appdbInventoryService.updateAppDbInventory(this.editedItem)
          } else {
              this.appDbInventories.push(this.editedItem)
              await appdbInventoryService.createAppDbInventory(this.editedItem)
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