<template>
  <v-container fluid class="fill-height">
    <v-row dense>
      <v-col>
        <v-text-field
            label="Server name"
            hint="Server name to be set in the SNI and used by the client for TLS verification."
            v-model="answers.backend.kubernetes.serverName"
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
          <v-radio value="bearer">
            <template v-slot:label>
              Bearer token
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
export default {
  name: 'BackendKubernetes',
  props: {
    answers: Object
  },
  components: {},
  methods: {},
  data: () => ({})
}
</script>