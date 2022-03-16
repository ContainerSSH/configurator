<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-radio-group
            label="Select your backend"
            v-model="answers.backend.backend"
            row
        >
          <v-radio value="docker">
            <template v-slot:label>
              <v-icon>{{ icons.mdiDocker }}</v-icon>
              <div>Docker</div>
            </template>
          </v-radio>
          <v-radio value="kubernetes">
            <template v-slot:label>
              <v-icon>{{ icons.mdiKubernetes }}</v-icon>
              <div>Kubernetes</div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiKubernetes, mdiDocker } from '@mdi/js';

export default {
  name: 'Backend',
  props: {
    answers: Object
  },
  methods: {},
  data: () => ({
    icons: {
      mdiKubernetes,
      mdiDocker
    }
  })
}
</script>