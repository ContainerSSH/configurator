<template>
  <v-container fluid class="fill-height">
    <v-row dense>
      <v-col>
        <v-text-field
            label="Server name"
            hint="Server name to be set in the SNI and used by the client for TLS verification."
            v-model="answers.backend.kubernetes.serverName"
            :rules="[rules.required]"
            persistent-hint
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
            label="Host"
            hint="A host:port pair, or a URL to the Kubernetes apiserver. Defaults to kubernetes.default.svc."
            v-model="answers.backend.kubernetes.host"
            :rules="[rules.required]"
            persistent-hint
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
            label="API Endpoint"
            hint="Sub-path that points to the API root. Defaults to /api"
            v-model="answers.backend.kubernetes.path"
            :rules="[rules.required]"
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
            v-model="answers.backend.kubernetes.authenticationMethod"
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
            v-model="answers.backend.kubernetes.image"
            :rules="[rules.required]"
            label="Container guest image"
            outlined
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="ts">
export default {
  name: 'BackendKubernetes',
  props: {
    answers: Object
  },
  components: {},
  methods: {},
  data: () => ({
    authenticationMethods: [
      {
        displayName: 'Bearer token',
        value: 'bearer',
      },
      {
        displayName: 'Certificate',
        value: 'certificate',
      },
    ],
    rules: {
      required: v => !!v || 'Required.'
    }
  })
}
</script>