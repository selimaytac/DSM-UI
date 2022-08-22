<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <SideBar/>
    <v-container>
      <NavBar/>
    </v-container>
    <v-card color="grey lighten-1" >
    <v-card-title>
      ODM Server List
      <v-spacer></v-spacer>
      <v-btn id="downloadexcel" class="ma-1 white--text" color="teal" :loading="loading2" :disabled="loading2" outlined 
      @click="loader = 'loading2'">Export to Excel 
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="filterServers" :items-per-page="5" class="elevation-1" :search="search">
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
                      v-model="filters[header.value]" :label="filters[header.value] ? `${header.text}` : ''" hide-details>
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
    <template v-slot:item.details="{item}">
      <v-btn depressed rounded text color="teal" @click="showDetails(item)"><v-icon>mdi-eye</v-icon>Show Details</v-btn>
    </template>
    </v-data-table>
    <v-dialog v-model="dialogdetail">
      <v-card>
        <v-toolbar dark color="teal" >
          <v-btn icon dark @click="dialogdetail = false"><v-icon>mdi-close</v-icon></v-btn>
          <v-toolbar-title class="flex text-center text-h5">DETAILS</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <template>        
            <v-tabs color="teal" vertical>
              <v-tab>General</v-tab>
              <v-tab-item>
                <v-container fluid>
                  <v-row justify="center" class="space">
                    <v-col cols="12" sm="4">
                      <v-card class=" mx-2 rounded-xl" elevation="8" color="teal" height="600">
                        <v-toolbar flat color="rgba(0,0,0,0)" dark>
                          <v-toolbar-title>Basic Details</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-simple-table class="teal" dark>
                          <template v-slot:default>
                            <tbody>
                      <tr>
                        <td>Domain: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>IP Address: </td>
                        <td></td> 
                      </tr>
                      <tr>
                        <td>Operating System: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Oracle Version: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Logical CPU Count: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Physical CPU Count: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Memory: </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class=" mx-2 rounded-xl" elevation="8" color="teal" height="600">
                <v-toolbar flat color="rgba(0,0,0,0)" dark>
                  <v-toolbar-title>Basic Details</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-simple-table class="teal" dark>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>Port: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Machine Type: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Record Date: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Delete Date: </td>
                        <td></td>
                      </tr>
                    </tbody>
                    <v-toolbar flat color="rgba(0,0,0,0)" dark>
                  <v-toolbar-title>Organization Details</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-simple-table class="teal" dark>
                  <template v-slot:default>
                    <tbody>
                       <tr>
                        <td>Owned By: </td>
                        <td></td>
                      </tr>
                       <tr>
                        <td>Environment: </td>
                        <td></td>
                      </tr>
                       <tr>
                        <td>Service: </td>
                        <td></td>
                      </tr>
                       <tr>
                        <td>Notes: </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>  
          </v-row>
        </v-container>
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

  export default {
    name: 'dbportal',
    data () {
      return {
        filters: { name: [], servername: [], ipadress: [], dns: [], service: [],odm: [], opsystem: [], responsible: []},
        dialog :false,
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
        loading6: false,
        search: '',
        headers: [
          { text: 'Site Name',align: 'start',sortable: false,value: 'name'},
          { text: 'Server Name', value: 'servername' },
          { text: 'IP Adress', value: 'ipadress' },
          { text: 'DNS Name', value: 'dns' },
          { text: 'Service', value: 'service' },
          { text: 'ODM', value: 'odm' },
          { text: 'Operating System', value: 'opsystem' },
          { text: 'Responsible', value: 'responsible' },
          { text: 'View Details', value: 'details'},
        ],
        servers: [
          {
            name: 'Tarık',
            servername: 159,
            ipadress: 6.0,
            dns: 24,
            service: 4.0,
            odm: 22,
            opsystem: '1%',
            responsible: 4.0,
          },
          {
            name: 'Frozen Yogurt',
            servername: 159,
            ipadress: 6.0,
            dns: 24,
            service: 4.0,
            odm: 22,
            opsystem: '1%',
            responsible: 4.0,
          },
        ],
        dialogdetail: false
      }
    },
    methods:{
      showDetails(item){
        this.details=item
        this.dialogdetail=true
      },
      columnValueList(val) {
      return this.servers.map((d) => d[val]);
    }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 2000)

        this.loader = null
      },
    },
    computed: {
    filterServers() {
      return this.servers.filter((d) => {
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
.v-btn.withoutupercase{
  text-transform: none !important;
}
.v-btn:not(.v-btn--round).v-size--small{
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