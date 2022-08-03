<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <SideBar/>
    <v-container>
      <NavBar/>
    </v-container>
    <v-card color="grey lighten-1" >
    <v-card-title>
      Servers
      <v-spacer></v-spacer>
      <v-btn id="downloadexcel" class="ma-1 white--text" :loading="loading2" :disabled="loading2" outlined 
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
    <v-data-table
      :headers="headers"
      :items="item"
      :search="search"
    >
    <template v-slot:item.details="{item}">
      <v-btn depressed rounded text color="grey" @click="showDetails(item)"><v-icon>mdi-eye</v-icon>Show Details</v-btn>
    </template>
    </v-data-table>
    <v-dialog v-model="dialogdetail">
      <v-card>
        <v-toolbar dark color="grey" >
          <v-btn icon dark @click="dialogdetail = false"><v-icon>mdi-close</v-icon></v-btn>
          <v-toolbar-title class="flex text-center text-h5">DETAILS</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <template>        
            <v-tabs color="black" vertical>
              <v-tab>General</v-tab>
              <v-tab>Sites</v-tab>
              <v-tab>Statics</v-tab>
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
                        <td>Custom Ip: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Operating System: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>CPU: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Memory: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Last Backup: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Site Count: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Online Site Count: </td>
                        <td>Coming Soon...</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class=" mx-2 rounded-xl" elevation="8" color="teal" height="600">
                <v-toolbar flat color="rgba(0,0,0,0)" dark>
                  <v-toolbar-title>Disk Details</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-simple-table class="teal" dark>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>Volumes: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Total Capacity: </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Percent Free: </td>
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
                        <td>Managing By: </td>
                        <td></td>
                      </tr>
                       <tr>
                        <td>Environment: </td>
                        <td></td>
                      </tr>
                       <tr>
                        <td>ODM Replication: </td>
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
            <v-col cols="12" sm="4">
              <v-card class=" mx-2 rounded-xl" elevation="8" color="teal" height="250">
                <v-toolbar flat color="rgba(0,0,0,0)" dark>
                  <v-toolbar-title>Volume Details</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-simple-table class="teal" dark>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Volume Name
                        </th>
                        <th class="text-left">
                          Free Space
                        </th>
                        <th class="text-left">
                          Used Space
                        </th>
                        <th class="text-left">
                          Total Capacity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>E:\</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>C:\</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>C:\</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>C:\</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>C:\</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>C:\</td>
                        <td></td>
                        <td></td>
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
        <v-card color="teal" >
          <v-card-title>
            Sites Details
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
          :headers="siteheaders"
          :items="siteitem"
          ></v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card color="teal" >
          <v-card-title>
            Statics Details
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
          :headers="headers"
          :items="item"
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
    name: 'servers',
    data () {
      return {
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
          { text: 'Server Name',align: 'start',sortable: false,value: 'name'},
          { text: 'IP Adress', value: 'ipadress', },
          { text: 'DNS Name', value: 'dns' },
          { text: 'Service', value: 'service' },
          { text: 'Operating System', value: 'opsystem' },
          { text: 'Responsible', value: 'responsible' },
          { text: 'View Details', value: 'details'},
        ],
        siteheaders: [
          { text: 'Site Name',align: 'start',sortable: false,value: 'sitename'},
          { text: 'Physical Path', value: 'physicalpath', },
          { text: 'Domains', value: 'domains' },
          { text: 'State', value: 'state' },
        ],
        item: [
          {
            name: 'Tarık',
            ipadress: 159,
            dns: 6.0,
            service: 24,
            opsystem: 4.0,
            responsible: '1%',
          },
          {
            name: 'Frozen Yogurt',
            ipadress: 159,
            dns: 6.0,
            service: 24,
            opsystem: 4.0,
            responsible: '1%',
          },
        ],
        siteitem: [
          {
            sitename: 'Tarık',
            physicalpath: 159,
            domains: 6.0,
            service: 24,
            state: 4.0,
          },
          {
            sitename: 'Frozen Yogurt',
            physicalpath: 159,
            domains: 6.0,
            service: 24,
            state: 4.0,
          },
        ],
        dialogdetail: false
      }
    },
    methods:{
      showDetails(item){
        this.details=item
        this.dialogdetail=true
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