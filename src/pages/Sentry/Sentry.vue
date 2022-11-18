<template>
    <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
        <SideBar />
        <NavBar />
        <v-card color="grey">
            <v-card-title>
                Nöbetçi Listesi
                <v-spacer></v-spacer>
                <!-- <template>
                    <v-col cols="12" sm="2">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                            transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date" label="Tarih seçiniz" prepend-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" type="month" locale="tr" no-title scrollable @change="getMonthlySentry()">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </template> -->
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="filterMonthlySentry" :loading="loaderTable" :items-per-page="10"
                :footer-props="{
                    'items-per-page-options': [35]
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
            </v-data-table>

        </v-card>
    </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import { monthlySentryService } from '@/services/api/sentryMonth.service'
export default {
    name: 'monthlySentry',

    data() {
        return {
            filters: { platform: [], cloud: [],network: [], security: [], db: [], applicationManagement: [], },
            loaderTable: false,
            headers: [
                { text: 'Gün', value: 'dayNumber', align: 'start', sortable: false, width: "100px" },
                { text: 'Platform Yönetimi', align: 'start', sortable: false, value: 'platform', width: "200px" },
                { text: 'Cloud Yönetimi', align: 'start', sortable: false, value: 'cloud', width: "200px", fixed: true },
                { text: 'Network Yönetimi', align: 'start', sortable: false, value:'network', width:"200px", fixed:true},
                { text: 'Güvenlik Yönetimi', align: 'start', sortable: false, value: 'security', width: "200px", fixed: true },
                { text: 'Veri Tabanı Yönetimi', align: 'start', sortable: false, value: 'db', width: "200px", fixed: true },
                { text: 'Uygulama Yönetimi', align: 'start', sortable: false, value: 'applicationManagement', width: "200px", fixed: true },

            ],
            date: new Date().toISOString().substr(0, 7),
            menu: false,
            modal: false,
            monthlySentry: [],
            search: '',
        }
    },
    methods: {
        columnValueList(val) {
            return this.monthlySentry.map((d) => d[val]);
        },
        async getMonthlySentry(date) {
            this.loaderTable = true;
            if (this.date) {
                this.monthlySentry = await monthlySentryService.getSentries(date);
                console.log(this.monthlySentry);
                console.log(this.date);
            }
            this.loaderTable = false;
        }

    },
    async created() {
        await this.getMonthlySentry();
    },
    computed: {
        filterMonthlySentry() {
            return this.monthlySentry.filter((d) => {
                return Object.keys(this.filters).every((f) => {
                    return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
                });
            });
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