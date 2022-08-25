<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <SideBar/>
      <NavBar/>

    <v-card color="grey lighten-1" >
    <v-card-title>
      Monthly KPI Status
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
              <v-tab>Months</v-tab>
              <v-tab-item>
                <v-card color="teal" >
                  <v-card-title>
                  Sites Details
                  <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table
                    :headers="monthheaders"
                    :items="monthitem"
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

  export default {
    name: 'dbportal',
    data () {
      return {
        filters: { name: [], year: [],},
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
          { text: 'Application',value: 'name'},
          { text: 'Year', value: 'year' },
          { text: 'View Details', value: 'details'},
        ],
        monthheaders: [
          { text: 'January',align: 'start',sortable: false,value: 'bir'},
          { text: 'February',align: 'start',sortable: false,value: 'iki'},
          { text: 'March',align: 'start',sortable: false,value: 'üç'},
          { text: 'April',align: 'start',sortable: false,value: 'dört'},
          { text: 'May',align: 'start',sortable: false,value: 'beş'},
          { text: 'June',align: 'start',sortable: false,value: 'altı'},
          { text: 'July',align: 'start',sortable: false,value: 'yedi'},
          { text: 'August',align: 'start',sortable: false,value: 'sekiz'},
          { text: 'September',align: 'start',sortable: false,value: 'dokuz'},
          { text: 'October',align: 'start',sortable: false,value: 'on'},
          { text: 'November',align: 'start',sortable: false,value: 'onbir'},
          { text: 'December',align: 'start',sortable: false,value: 'oniki'},
        ],
        servers: [
          {
            name: 'Tarık',
            year: 2020,
          },
          {
            name: 'Frozen Yogurt',
            year: 2021,
          },
          {
            name: 'Selim',
            year: 2022,
          }
        ],
        monthitem: [
          {
            bir: 'Tarık',
            iki: 159,
            üç: 6.0,
            dört: 24,
            beş: 4.0,
            altı: 4.0,
            yedi: 4.0,
            sekiz: 4.0,
            dokuz: 4.0,
            on: 4.0,
            onbir: 4.0,
            oniki: 4.0,
            
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