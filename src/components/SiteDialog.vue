<template>
    <v-tabs color="primary" vertical>
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
                        <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="450">
                            <v-toolbar flat color="rgba(0,0,0,0)" dark>
                                <v-toolbar-title>Site</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-simple-table class="primary" dark>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Machine Name: </td>
                                            <td>{{detailsInTab.machineName}}</td>
                                            <v-btn x-small fab class="mx-2 ma-4"
                                                @click="doCopy(detailsInTab.machineName) , snackbar=true">
                                                <v-icon small>mdi-content-copy</v-icon>
                                            </v-btn>
                                            <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                                    <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                                        Close
                                                    </v-btn>
                                                </template>
                                            </v-snackbar>
                                        </tr>
                                        <tr>
                                            <td>Name: </td>
                                            <td>{{detailsInTab.name}}</td>
                                            <v-btn x-small fab class="mx-2 ma-4"
                                                @click="doCopy(detailsInTab.name) , snackbar=true">
                                                <v-icon small>mdi-content-copy</v-icon>
                                            </v-btn>
                                            <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                                    <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                                        Close
                                                    </v-btn>
                                                </template>
                                            </v-snackbar>
                                        </tr>
                                        <tr>
                                            <td>Application Pool Name: </td>
                                            <td>{{ detailsInTab.applicationPoolName }}</td>
                                        </tr>
                                        <tr>
                                            <td>Physical Path: </td>
                                            <td>{{detailsInTab.physicalPath}}</td>
                                            <v-btn x-small fab class="mx-2 ma-4"
                                                @click="doCopy(detailsInTab.physicalPath) , snackbar=true">
                                                <v-icon small>mdi-content-copy</v-icon>
                                            </v-btn>
                                            <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                                    <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                                        Close
                                                    </v-btn>
                                                </template>
                                            </v-snackbar>
                                        </tr>
                                        <tr>
                                            <td>Enabled Protocols: </td>
                                            <td>{{ detailsInTab.enabledProtocols }}</td>
                                        </tr>
                                        <tr>
                                            <td>Max Band With: </td>
                                            <td>{{ detailsInTab.maxBandwidth }}</td>
                                        </tr>
                                        <tr>
                                            <td>Max Connections: </td>
                                            <td>{{ detailsInTab.maxConnections }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="450">
                            <v-toolbar flat color="rgba(0,0,0,0)" dark>
                                <v-toolbar-title>Web Config</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-simple-table class="primary" dark>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Web Config Last Backup Date: </td>
                                            <td>{{ detailsInTab.webConfigLastBackupDate }}</td>
                                        </tr>
                                        <tr>
                                            <td>Web Config Backup Directory: </td>
                                            <td>{{ detailsInTab.webcConfigBackupDirectory }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <v-toolbar flat color="rgba(0,0,0,0)" dark>
                                <v-toolbar-title>Other</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-simple-table class="primary" dark>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Net Framework Version: </td>
                                            <td>{{ detailsInTab.netFrameworkVersion }}</td>
                                        </tr>
                                        <tr>
                                            <td>Send Alert Mail When Unavailable: </td>
                                            <td>{{ detailsInTab.sendAlertMAilWhenUnavailable }}</td>
                                        </tr>
                                        <tr>
                                            <td>App Type: </td>
                                            <td>{{ detailsInTab.appType }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="450">
                            <v-toolbar flat color="rgba(0,0,0,0)" dark>
                                <v-toolbar-title>Log</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-simple-table class="primary" dark>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td>Log File Enabled: </td>
                                            <td>{{ detailsInTab.logFileEnabled }}</td>
                                        </tr>
                                        <tr>
                                            <td>Log File Directory: </td>
                                            <td>{{ detailsInTab.logFileDirectory }}</td>
                                        </tr>
                                        <tr>
                                            <td>Log Format: </td>
                                            <td>{{ detailsInTab.logFormat }}</td>
                                        </tr>
                                        <tr>
                                            <td>Log Period: </td>
                                            <td>{{ detailsInTab.logPeriod }}</td>
                                        </tr>
                                        <tr>
                                            <td>Server Auto Start: </td>
                                            <td>{{ detailsInTab.serverAutoStart }}</td>
                                        </tr>
                                        <tr>
                                            <td>Trace Failed Requests Logging Enabled: </td>
                                            <td>{{ detailsInTab.traceFailedRequestsLoggingEnabled }}</td>
                                        </tr>
                                        <tr>
                                            <td>Last Updated: </td>
                                            <td>{{ detailsInTab.lastUpdated }}</td>
                                        </tr>
                                        <tr>
                                            <td>Date Deleted: </td>
                                            <td>{{ detailsInTab.dateDeleted }}</td>
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
            <v-card color="primary">
                <v-card-title>
                    Bindings
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table :headers="bindheaders" :items="siteBindings" :items-per-page="10" :footer-props="{
                  'items-per-page-options': [5, 10, 20, 50]
                }" class="elevation-1"></v-data-table>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card color="primary">
                <v-card-title>
                    Endpoints
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table :headers="endpointheaders" :items="siteEndpoints" :items-per-page="10" :footer-props="{
                  'items-per-page-options': [5, 10, 20, 50]
                }" class="elevation-1"></v-data-table>
                <v-card-title>
                    Direct DB Connection
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table :headers="directdbheaders" :items="directdbitem"></v-data-table>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card color="primary">
                <v-card-title>
                    Packages
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table :headers="packageheaders" :items="sitePackages" :items-per-page="10" :footer-props="{
                  'items-per-page-options': [5, 10, 20, 50]
                }" class="elevation-1"></v-data-table>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card color="primary">
                <v-card-title>
                    Event Tracking
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table :headers="eventheaders" :items="eventitem"></v-data-table>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card color="primary">
                <v-card-title>
                    Statics
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table :headers="staticheaders" :items="staticitem"></v-data-table>
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'SiteDialog',
    siteBindings: [],
    sitePackages: [],
    siteEndpoints: [],
    data() {
        return {
            snackbar: false,
            multiLine: true,
            text: 'Copy Successful ! ',
            bindheaders: [
                { text: 'IP Adress', value: 'ipAddress' },
                { text: 'IP Adress Family', value: 'ipAddressFamily', },
                { text: 'Ports', value: 'ports' },
                { text: 'Host', value: 'host' },
                { text: 'Protocol', value: 'protocols' },
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
            siteBindings: [],
            siteEndpoints: [],
            directdbitem: [
            ],
            sitePackages: [],
            eventitem: [

            ],
            staticitem: [

            ],
            dialogdetail: false,
            detailsInTab: {
                machineName: "",
                name: "",
                applicationPoolName: "",
                physicalPath: "",
                enabledProtocols: "",
                maxBandwidth: "",
                maxConnections: "",
                logFileEnabled: "",
                logFileDirectory: "",
                logFormat: "",
                logPeriod: "",
                serverAutoStart: "",
                traceFailedRequestsLoggingEnabled: "",
                lastUpdated: "",
                dateDeleted: "",
                webConfigLastBackupDate: "",
                webcConfigBackupDirectory: "",
                netFrameworkVersion: "",
                sendAlertMAilWhenUnavailable: "",
                appType: "",
            },
            selectedBindings: [],
            selectedPackages: [],
            selectedEndpoints: [],
            selectedSite: {},
        }
    },
    computed: {
        ...mapGetters('site', ['getSiteDetails', 'getSiteHeaders', 'getSiteBindings', 'getSitePackages', 'getSiteEndpoints']),
    },
    methods: {
        ...mapActions('site', ['setSiteDetails', 'setSiteHeader', 'setSiteBindings', 'setSitePackages', 'setSiteEndpoints']),
        async rowClick(item) {
            this.detailsInTab = await this.setSiteDetails(item.siteId)
            this.siteHeader = await this.setSiteHeader(item.siteId)
            this.selectedSite = item

            this.selectedBindings = item.siteId
            this.siteBindings = await this.setSiteBindings(item.siteId);

            this.selectedPackages = item.siteId
            this.sitePackages = await this.setSitePackages(item.siteId);

            this.selectedEndpoints = item.siteId
            this.siteEndpoints = await this.setSiteEndpoints(item.siteId);
            this.dialogdetail = true
        },
        async GetSiteBindings(siteId) {
            this.siteBindings = await this.setSiteBindings(siteId);
        },
        async GetSitePackages(siteId) {
            this.sitePackages = await this.setSitePackages(siteId);
        },
        async GetSiteEndpoints(siteId) {
            this.siteEndpoints = await this.setSiteEndpoints(siteId);
        },
        doCopy: function (text) {
            var copyText = document.createElement('input');
            copyText.setAttribute('value', text);
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
        },
    },
}
</script>