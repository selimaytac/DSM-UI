<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />

      <NavBar />

    <v-card color="grey lighten-1">
      <v-card-title>
        ODM Server List
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
      <v-data-table :headers="headers" :items="filterOdmServers" @click:row="rowClick" :items-per-page="10" :footer-props="{
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'odmserver',
  odmServer: [],
  data() {
    return {
      filters: { siteName: [], serverName: [], ipAddress: [], dnsName: [], service: [], odmStatus: [], operatingSystem: [], responsible: [] },
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      search: '',
      headers: [
        { text: 'Site Name', align: 'start', sortable: false, value: 'siteName' },
        { text: 'Server Name', value: 'serverName' },
        { text: 'IP Adress', value: 'ipAddress' },
        { text: 'DNS Name', value: 'dnsName' },
        { text: 'Service', value: 'service' },
        { text: 'ODM', value: 'odmStatus' },
        { text: 'Operating System', value: 'operatingSystem' },
        { text: 'Responsible', value: 'responsible' },
      ],
      odmservers: [],
    }
  },
  computed: {
    ...mapGetters('odmservers', ['getOdmServerList']),
  },
  methods: {
    ...mapActions('odmservers', ['setOdmServers']),
    async rowClick(item) {
      this.odmservers = await this.getOdmServerList(item)
      
    },
    columnValueList(val) {
      return this.odmservers.map((d) => d[val]);
    },
    async GetOdmServerList() {
      let count = 1;
      let response = await this.setOdmServers(count);
      while (response.length > 0) {
        this.odmservers = this.odmservers.concat(response);
        count++;
        response = await this.setOdmServers(count);
      }
    },
  },
  created() {
      this.GetOdmServerList();
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
    filterOdmServers() {
      return this.odmservers.filter((d) => {
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