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
    <v-row dense>
      <v-col>
        <v-radio-group
            label="Authentication method"
            v-model="answers.backend.docker.authenticationMethod"
            column
        >
          <v-radio v-for="(record, index) in authenticationMethods" :key="index" :value="record.value">
            <template v-slot:label>
              {{ record.displayName }}
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
            v-model="answers.backend.docker.image"
            label="Container image"
            outlined
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <EnvironmentField v-model="answers.backend.docker.env" label="Container environment variables" class="pl-0 pr-0" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <DockerMountField v-model="answers.backend.docker.mount" label="Host mount points" class="pl-0 pr-0" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EnvironmentField from "@/components/form/EnvironmentField";
import DockerMountField from "@/components/form/DockerMountField";

export default {
  name: 'BackendDocker',
  props: {
    answers: Object
  },
  components: {
    DockerMountField,
    EnvironmentField
  },
  methods: {},
  data: () => ({
    authenticationMethods: [
      {
        displayName: 'None',
        value: 'none',
      },
      {
        displayName: 'Certificate',
        value: 'certificate',
      }
    ]
  })
}
</script>