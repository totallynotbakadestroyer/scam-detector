<template>
  <v-card width="100%" height="100%">
    <v-card-title>Check user</v-card-title>
    <v-card-text class="fill-height">
      <v-row align="center">
        <v-col cols="12">
          <div>
            <v-text-field label="User id" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" cols="12">
          <v-data-table>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>User's reported friends</v-toolbar-title>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
        <v-col md="6" cols="12">
          <v-data-table>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Reports on user</v-toolbar-title>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
