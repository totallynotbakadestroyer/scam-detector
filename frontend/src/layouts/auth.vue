<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-2">
            Hey, BakaDestroyer
          </v-list-item-title>
          <v-list-item-subtitle>
            Log out?
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid fill-height>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",
  data() {
    return {
      items: [
        { title: "Check user", icon: "mdi-account-search", link: "/check" },
        {
          title: "My Reports",
          icon: "mdi-clipboard-text-multiple",
          link: "/my-reports"
        },
        { title: "New Report", icon: "mdi-clipboard-check", link: "/report" },
        { title: "Settings", icon: "mdi-cog", link: "/settings" }
      ]
    };
  }
};
</script>
