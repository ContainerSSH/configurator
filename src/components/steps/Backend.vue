<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-radio-group
            label="Select your backend"
            v-model="answers.backend.backend"
            row
        >
          <v-radio v-for="(record, index) in backends" :key="index" :value="record.value">
            <template v-slot:label>
              <v-icon>{{ record.icon }}</v-icon>
              {{ record.displayName }}
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
    backends: [
      {
        displayName: 'Docker',
        icon: mdiDocker,
        value: 'docker',
      },
      {
        displayName: 'Kubernetes',
        icon: mdiKubernetes,
        value: 'kubernetes',
      }
    ]
  })
}
</script>