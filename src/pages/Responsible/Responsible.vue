<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    <v-container>
      <NavBar />
    </v-container>
    <v-card color="grey lighten-1">
      <v-card-title>
        Responsibles
        <v-spacer></v-spacer>
        <v-btn id="downloadexcel" class="ma-1 white--text" color="teal" :loading="loading2" :disabled="loading2"
          outlined @click="loader = 'loading2'">Export to Excel
          <template v-slot:loader>
            <span>Loading...</span>
          </template>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="filterResponsibles" :items-per-page="10" :footer-props="{
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
                    <v-autocomplete multiple dense auto-select-first clearable chips small-chips color="teal"
                      :items="columnValueList(header.value)" append-icon="mdi-filter" v-model="filters[header.value]"
                      :label="filters[header.value] ? `${header.text}` : ''" hide-details>
                      <template v-slot:selection="{ item, index }">
                        <v-chip small class="caption" v-if="index < 10">
                          <span>
                            {{ item }}
                          </span>
                        </v-chip>
                        <span v-if="index === 5" class="grey--text caption">
                          (+{{ filters[header.value].length - 10 }} others)
                        </span>
                      </template>
                    </v-autocomplete>
                  </div>
                </v-list-item>
              </v-list>
            </div>
          </v-menu>
        </template>
        <template v-slot:item.details="{ item }">
          <v-btn depressed rounded text color="teal" @click="showDetails(item)">
            <v-icon>mdi-eye</v-icon>Show Details
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogdetail">
        <v-card>
          <v-toolbar dark color="teal">
            <v-btn icon dark @click="dialogdetail = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="flex text-center text-h5">DETAILS</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <template>
              <v-tabs color="teal" vertical>
                <v-tab>Servers</v-tab>
                <v-tab>Sites</v-tab>
                <v-tab-item>
                  <v-card color="teal">
                    <v-card-title>
                      Servers Details
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="serverheaders" :items="respServers" :items-per-page="10" :footer-props="{
                      'items-per-page-options': [5, 10, 20, 50]
                    }" class="elevation-1">
                      ></v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="teal">
                    <v-card-title>
                      Site Details
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="siteheaders" :items="respSites" :items-per-page="10" :footer-props="{
                      'items-per-page-options': [5, 10, 20, 50]
                    }" class="elevation-1">
                      ></v-data-table>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </template>
          </v-container>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'responsible',
  data() {
    return {
      filters: { name: [], },
      dialog: false,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      search: '',
      responsibles: [],
      respServers: [],
      respSites: [],
      headers: [
        { text: 'Responsible Name', align: 'start', sortable: false, value: 'responsibleName' },
        { text: 'Count Of Servers', value: 'countOfServers', },
        { text: 'Count Of Sites', value: 'countOfSites', },
        { text: 'View Details', value: 'details' },
      ],
      serverheaders: [
        { text: 'Server Name', align: 'start', sortable: false, value: 'serverName' },
        { text: 'Full Name', value: 'fullName', },
        { text: 'IP Adress', value: 'ipAddress', },
        { text: 'Operating System', value: 'operatingSystem', },
        { text: 'Environments', value: 'environments', },
        { text: 'App. Type', value: 'applicationType', },
        { text: 'Owner', value: 'owner', },
        { text: 'Contact', value: 'contact' },
        { text: 'Last Backup Date', value: 'lastBackupDate' },
      ],
      siteheaders: [
        { text: 'Site Name', align: 'start', sortable: false, value: 'siteName' },
        { text: 'Physical Path', value: 'physicalPath', },
        { text: 'Domains', value: 'domains' },
        { text: 'State', value: 'state' },
        { text: 'Server Name', value: 'serverName', },
        { text: 'DNS Name', value: 'dnsName', },
        { text: 'App. Type', value: 'appType', },
      ],
      responsibles: [],
      respServers: [],
      respSites: [],
      dialogdetail: false,
    }
  },
  computed: {
    ...mapGetters('responsible', ['getResponsibles', 'getResponsibleServers', 'getResponsibleSites']),
  },
  methods: {
    ...mapActions('responsible', ['setResponsibles', 'setResponsibleServers', 'setResponsibleSites']),
    async showDetails(item) {
      this.details = item

      this.respServers= await this.setResponsibleServers(item.responsibleName);

      this.respSites= await this.setResponsibleCompanySites(item.responsibleName);
      this.dialogdetail = true
    },
    async getAllResponsibles() {
      this.loading = true
      this.respServers = await this.setResponsibles()
      this.loading = false
    },
  
  },
  created() {
    // this.getAllResponsibles()
  },

  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 2000)

      this.loader = null
    },
  },
  computed: {
    filterResponsibles() {
      return this.responsibles.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    }
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