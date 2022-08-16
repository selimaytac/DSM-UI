<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <SideBar/>
    <NavBar/>
      <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
          md="4"
        >
          <v-card height="250px" width="400px">
            <v-img :src="card.src" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="150px" width="400px">
            </v-img>
            <v-card-actions>
              <v-card-title v-text="card.title"></v-card-title>
              <v-btn class="ma-1" outlined color="teal" rounded>Open Page</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";
  export default {
    data() {
      return {
        cards: [
        { title: 'AppDynamics', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6},
        { title: 'Automic Nöbetçi Telefon Tablosu', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Automic Talep Açma', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Automic Talimat', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Azure DevOps', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Cloud & Mobile Envanter', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'CyberArk', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6},
        { title: 'Disk Doluluk ve Kullanımı', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Domino', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'DT-Uygulama Planner', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Eclit-Zabbix', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Elastic Search Envanteri', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Grafana', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6},
        { title: 'Haftalık Rapor', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Microsoft Azure', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Nöbet - Mesai Sonrası Problem Listesi', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Nöbet Listesi', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Office 365', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Openshift 4.4.0', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6},
        { title: 'Scorecard Erişim', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Self Service (AD Lock kaldırma)', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Uygulama Topolojileri', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Veritabanı Envanteri', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'VRealize VM Talep', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        
      ],
      };
    },
    components: {
      SideBar,
      NavBar
    }
  }
</script>