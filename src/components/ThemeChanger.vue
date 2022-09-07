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
                    <v-btn icon @click="toggle_dark_mode">
                        <v-icon>mdi-theme-light-dark</v-icon>
                    </v-btn>
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
        toggle_dark_mode: function () {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
        },
        setTheme(theme) {

            this.$vuetify.theme.red = !this.$vuetify.theme.red;
            localStorage.setItem("red_theme", this.$vuetify.theme.red.toString());

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
    },
    mounted() {
        const theme = localStorage.getItem("dark_theme");
        if (theme) {
            if (theme === "true") {
                this.$vuetify.theme.dark = true;
            } else {
                this.$vuetify.theme.dark = false;
            }
        } else if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            this.$vuetify.theme.dark = true;
            localStorage.setItem(
                "dark_theme",
                this.$vuetify.theme.dark.toString()
            );
        }
    }
};
</script>
<style scoped>
</style>