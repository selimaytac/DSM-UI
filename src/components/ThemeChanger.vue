<template>
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on }">

            <v-btn class="ma-2" icon v-on="on">
                <v-icon size="30" color="white">mdi-palette</v-icon>
            </v-btn>

        </template>
        <v-card>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">
                        Dark Mode</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-switch v-model="$vuetify.theme.dark" />
                </v-list-item-action>
            </v-list-item>
            <v-divider />
            <v-card-text>
                Default color is Blue
                <v-card class="my-2" :disabled="$vuetify.theme.themes.name === theme.name" @click="setTheme(theme)"
                    hover outlined v-for="(theme, index) in themes" :key="index">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                {{ theme.name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-avatar color="success" size="30" v-if="$vuetify.theme.themes.name === theme.name">
                                <v-icon>mdi-check</v-icon>
                            </v-avatar>
                        </v-list-item-action>
                    </v-list-item>
                    <!-- <div class="my-2">
                        <v-chip class="mx-1" label :color="theme.dark[key]"
                            v-for="(key, index) in Object.keys(theme.dark)" :key="index">
                            {{ key }}</v-chip>
                    </div>
                    <div class="my-2">
                        <v-chip class="mx-1" label :color="theme.light[key]"
                            v-for="(key, index) in Object.keys(theme.light)" :key="index">
                            {{ key }}</v-chip>
                    </div> -->
                </v-card>
            </v-card-text>
            <v-divider />
            <v-card-actions>
                <v-btn text @click="menu = false" color="grey">Close</v-btn>
                <v-spacer />
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    name: "ThemeChanger",
    data: () => ({
        menu: false,
        themes: [
            { name: "Red", dark: { primary: "#FF0000", }, light: { primary: "#F70D1A", } },
            { name: "Green", dark: { primary: "#33691E", }, light: { primary: "#6ae240", } },
            { name: "Blue", dark: { primary: "#0D47A1", }, light: { primary: "#00b0ff", } },
            { name: "Yellow", dark: { primary: "#FFEB3B", }, light: { primary: "#ffff00", } },
            { name: "Orange", dark: { primary: "#E65100", }, light: { primary: "#ffa450", } },
            { name: "Purple", dark: { primary: "#9C27B0", }, light: { primary: "#e040fb", } },
            { name: "Brown", dark: { primary: "#795548", }, light: { primary: "#a1887f", } },
            { name: "Grey", dark: { primary: "#9E9E9E", }, light: { primary: "#e0e0e0", } },
            { name: "Pink", dark: { primary: "#E91E63", }, light: { primary: "#ff4081", } },
        ]
    }),
    methods: {
        setTheme(theme) {

            this.menu = false;
            const name = theme.name;
            const dark = theme.dark;
            const light = theme.light;

            Object.keys(dark).forEach(i => {
                this.$vuetify.theme.themes.dark[i] = dark[i];
            });
            Object.keys(light).forEach(i => {
                this.$vuetify.theme.themes.light[i] = light[i];
            });

            this.$vuetify.theme.themes.name = name;
        }
    }
};
</script>
<style scoped>
</style>