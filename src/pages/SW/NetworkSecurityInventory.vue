<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
      <SideBar />
      <NavBar />
  
      <v-card color="grey">
        <v-card-title>
          Network Security Inventory
          <v-spacer></v-spacer>
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-1 white--text" color="primary" :loading="loading2" :disabled="loading2" outlined
                @click="loader = 'loading2'">
                <v-icon color="primary" dark v-bind="attrs" v-on="on">
                  mdi-microsoft-excel </v-icon>
              </v-btn>
            </template>
            <span>Export to Excel</span>
          </v-tooltip>
          <v-spacer></v-spacer> -->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="filterProjects" :loading="loaderTable" :items-per-page="10"
          :footer-props="{
            'items-per-page-options': [20, 50, 100, 200]
          }" class="elevation-1 table-cursor" :search="search">
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
        </v-data-table>
      </v-card>
    </v-app>
  </template>
  
  <script>
  import SideBar from '@/components/SideBar.vue'
  import NavBar from '@/components/NavBar.vue'
  import { customInventory } from '@/services/api/customInventory.service'
  export default {
    name: 'NetworkSecurityInventory',
    NetworkInventory:[],
    data() {
      return {
        filters: { Name: [], IpAddress: [], IpAddressType: [], Departman: [], MachineName: [], DeviceType: [], Istirak: []},
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
        loading6: false,
        search: '',
        loaderTable: false,
        headers: [
          { text: 'Name', align: 'start', sortable: false, value: 'name' },
          { text: 'Ip Address', value: 'ipAddress', },
          { text: 'Ip Address Type', value: 'ipAddressType' },
          { text: 'Departman', value: 'departman' },
          { text: 'Machine Name', value: 'machineName' },
          { text: 'Device Type', value: 'deviceType' },
          { text: 'Istirak', value: 'istirak' },
        ],
        NetworkInventory: [],
      }
    },
    methods: {
     
      async getAllInventory() {
        this.loaderTable = true;
        this.NetworkInventory = await customInventory.getNetworkSecurityInventory();
        this.loaderTable = false;
      },
    },
    created() {
      this.getAllInventory();
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
      filterProjects() {
        return this.NetworkInventory.filter((d) => {
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