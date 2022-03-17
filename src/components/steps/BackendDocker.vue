<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-text-field
            label="Host"
            hint="The docker connect URL."
            v-model="answers.backend.docker.host"
            persistent-hint
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- TODO: Hide when using socket -->
    <v-row dense>
      <v-col>
        <v-radio-group
            label="Authentication method"
            v-model="answers.backend.docker.authenticationMethod"
            column
        >
          <v-radio value="none">
            <template v-slot:label>
              None
            </template>
          </v-radio>
          <v-radio value="certificate">
            <template v-slot:label>
              Certificate
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiDocker } from '@mdi/js';

export default {
  name: 'BackendDocker',
  props: {
    answers: Object
  },
  components: {},
  methods: {},
  data: () => ({
    tls: false,
    icons: {
      mdiDocker
    }
  })
}
</script>