<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    <v-container>
      <NavBar />
    </v-container>
    <v-card color="grey lighten-1">
      <v-card-title>
        Sites
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
      <v-data-table :headers="headers" :items="filterSites" :items-per-page="10" :footer-props="{
        'items-per-page-options': [10, 20, 30, 40, 50]
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
        <template #item.physicalPath="{ value }">
            <div class="text-truncate" style="max-width: 130px">{{ value }}</div>
        </template>
        <template #item.siteName="{ value }">
            <div class="text-truncate" style="max-width: 100px">{{ value }}</div>
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
                <v-tab>General</v-tab>
                <v-tab>Bindings</v-tab>
                <v-tab>Backend Services</v-tab>
                <v-tab>Packages</v-tab>
                <v-tab>Event Tracking</v-tab>
                <v-tab>Statics</v-tab>
                <v-tab-item>
                  <v-container fluid>
                    <v-row justify="center" class="space">
                      <v-col cols="12" sm="4">
                        <v-card class=" mx-2 rounded-xl" elevation="8" color="teal" height="450">
                          <v-toolbar flat color="rgba(0,0,0,0)" dark>
                            <v-toolbar-title>Site</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                          <v-simple-table class="teal" dark>
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td>Machine Name: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Name: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Application Pool Name: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Physical Path: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Enabled Protocols: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Max Band With: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Max Connections: </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-card class=" mx-2 rounded-xl" elevation="8" color="teal" height="450">
                          <v-toolbar flat color="rgba(0,0,0,0)" dark>
                            <v-toolbar-title>Web Config</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                          <v-simple-table class="teal" dark>
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td>Web Config Last Backup Date: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Web Config Backup Directory: </td>
                                  <td></td>
                                </tr>
                              </tbody>
                              <v-toolbar flat color="rgba(0,0,0,0)" dark>
                                <v-toolbar-title>Other</v-toolbar-title>
                                <v-spacer></v-spacer>
                              </v-toolbar>
                              <v-simple-table class="teal" dark>
                                <template v-slot:default>
                                  <tbody>
                                    <tr>
                                      <td>Net Framework Version: </td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>Send Alert Mail When Unavailable: </td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>App Type: </td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-card class=" mx-2 rounded-xl" elevation="8" color="teal" height="450">
                          <v-toolbar flat color="rgba(0,0,0,0)" dark>
                            <v-toolbar-title>Log</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                          <v-simple-table class="teal" dark>
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td>Log File Enabled: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Log File Directory: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Log Format: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Log Period: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Server Auto Start: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Trace Failed Requests Logging Enabled: </td>
                                  <td> </td>
                                </tr>
                                <tr>
                                  <td>Last Updated: </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Date Deleted: </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="teal">
                    <v-card-title>
                      Bindings
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="bindheaders" :items="binditem"></v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="teal">
                    <v-card-title>
                      Endpoints
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="endpointheaders" :items="endpointitem"></v-data-table>
                    <v-card-title>
                      Direct DB Connection
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="directdbheaders" :items="directdbitem"></v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="teal">
                    <v-card-title>
                      Packages
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="packageheaders" :items="packageitem"></v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="teal">
                    <v-card-title>
                      Event Tracking
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="eventheaders" :items="eventitem"></v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="teal">
                    <v-card-title>
                      Statics
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="staticheaders" :items="staticitem"></v-data-table>
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
  name: 'sites',
  sites: [],
  data() {
    return {
      filters: { siteName: [], ipAddress: [], port: [], hostName: [], appType: [], machinename: [], appPoolName: [], physicalPath: [] },
      dialog: false,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      search: '',
      headers: [
        { text: 'Site Name', align: 'start', sortable: false, value: 'siteName',width: 100},
        { text: 'IP Adress', value: 'ipAddress',width: 150},
        { text: 'Ports', value: 'port' ,width: 150},
        { text: 'Host', value: 'hostName',width: 150},
        { text: 'App Type', value: 'appType',width: 150},
        { text: 'Machine', value: 'machinename',width: 150},
        { text: 'Pool Name', value: 'appPoolName', width: 150},
        { text: 'Physical Path', value: 'physicalPath', width: 130},
        { text: 'View Details', value: 'details', },
      ],
      bindheaders: [
        { text: 'IP Adress', value: 'ipadress' },
        { text: 'IP Adress Family', value: 'ipfam', },
        { text: 'Ports', value: 'port' },
        { text: 'Host', value: 'host' },
        { text: 'Protocol', value: 'protocol' },
      ],
      endpointheaders: [
        { text: 'Endpoint Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Port', value: 'port', },
        { text: 'Endpoint URL', value: 'endpointurl' },
        { text: 'Is Available', value: 'available' },
        { text: 'Last Check Date', value: 'lastdate' },
      ],
      directdbheaders: [
        { text: 'Server Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Database Name', value: 'dbname' },
        { text: 'Port', value: 'port', },
        { text: 'User Name', value: 'username' },
        { text: 'Raw Connection String', value: 'connectstring' },
      ],
      packageheaders: [
        { text: 'Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Version', value: 'version' },
      ],
      eventheaders: [
        { text: 'IP Adress', value: 'ipadress' },
        { text: 'IP Adress Family', value: 'ipfam', },
        { text: 'Ports', value: 'port' },
        { text: 'Host', value: 'host' },
        { text: 'Protocol', value: 'protocol' },
      ],
      staticheaders: [
        { text: 'IP Adress', value: 'ipadress' },
        { text: 'IP Adress Family', value: 'ipfam', },
        { text: 'Ports', value: 'port' },
        { text: 'Host', value: 'host' },
        { text: 'Protocol', value: 'protocol' },
      ],
      sites: [],
      binditem: [
        {
          ipadress: 'Tarık',
          ipfam: 159,
          port: 6.0,
          host: 24,
          protocol: 4.0,
        },
        {
          ipadress: 'Frozen Yogurt',
          ipfam: 159,
          port: 6.0,
          host: 24,
          protocol: 4.0,
        },
      ],
      endpointitem: [
        {
          name: 'Tarık',
          port: 159,
          endpointurl: 6.0,
          available: 24,
          lastdate: 4.0,
        },
        {
          name: 'Frozen Yogurt',
          port: 159,
          endpointurl: 6.0,
          available: 24,
          lastdate: 4.0,
        },
      ],
      directdbitem: [
        {
          name: 'Tarık',
          dbname: 159,
          port: 6.0,
          username: 24,
          connectstring: 4.0,
        },
        {
          name: 'Frozen Yogurt',
          dbname: 159,
          port: 6.0,
          username: 24,
          connectstring: 4.0,
        },
      ],
      packageitem: [
        {
          name: 'Tarık',
          version: 159,
        },
        {
          name: 'Frozen Yogurt',
          version: 159,
        },
      ],
      eventitem: [
        {
          ipadress: 'Tarık',
          ipfam: 159,
          port: 6.0,
          host: 24,
          protocol: 4.0,
        },
        {
          ipadress: 'Frozen Yogurt',
          ipfam: 159,
          port: 6.0,
          host: 24,
          protocol: 4.0,
        },
      ],
      staticitem: [
        {
          ipadress: 'Tarık',
          ipfam: 159,
          port: 6.0,
          host: 24,
          protocol: 4.0,
        },
        {
          ipadress: 'Frozen Yogurt',
          ipfam: 159,
          port: 6.0,
          host: 24,
          protocol: 4.0,
        },
      ],
      dialogdetail: false
    }
  },
  computed: {
    ...mapGetters({
      get_sites: "site/getSiteList",
      detail: "site/getSiteDetail",
      header: "site/getSiteHeader",
      binding: "site/getSiteBinding",
      package: "site/getSitePackage",
      endpoint: "site/getSiteEndpoint",
    }),
  },
  methods: {
    ...mapActions('site', ['setSites']),
    showDetails(item) {
      this.details = item
      this.dialogdetail = true
    },
    columnValueList(val) {
      return this.sites.map((d) => d[val]);
    },
    async GetSiteList() {
      let count = 1;
      let response = await this.setSites(count);
      while (response.length > 0) {
        this.sites = this.sites.concat(response);
        count++;
        response = await this.setSites(count);
        
      }
    }
  },
  created() {
    this.GetSiteList();
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
    filterSites() {
      return this.sites.filter((d) => {
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