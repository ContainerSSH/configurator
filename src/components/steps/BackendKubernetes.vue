<template>
  <v-container fluid class="fill-height">
    <v-row dense>
      <v-col>
        <v-text-field
            label="Server name"
            hint="Server name to be set in the SNI and used by the client for TLS verification."
            v-model="configuration.backend.kubernetes.connection.serverName"
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
            v-model="configuration.backend.kubernetes.connection.host"
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
            v-model="configuration.backend.kubernetes.connection.path"
            persistent-hint
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
            label="Burst"
            hint="Burst indicates the maximum burst for throttle."
            v-model="configuration.backend.kubernetes.connection.burst"
            persistent-hint
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
            label="QPS"
            hint="QPS indicates the maximum QPS to the master from this client. Defaults to 5."
            v-model="configuration.backend.kubernetes.connection.qps"
            persistent-hint
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-radio-group
            label="Authentication method"
            v-model="configuration.meta.authMethod"
            column
        >
          <v-radio
              label="Bearer"
              value="bearer"
          ></v-radio>
          <v-radio
              label="Basic authentication"
              value="basic"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense v-if="configuration.meta.authMethod === 'basic'">
      <v-col>
          <v-text-field
              label="Username"
              v-model="configuration.backend.kubernetes.connection.username"
              persistent-hint
              outlined
              required
          ></v-text-field>
      </v-col>
      <v-col>
          <v-text-field
              type="password"
              label="Password"
              v-model="configuration.backend.kubernetes.connection.password"
              persistent-hint
              outlined
              required
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense v-if="configuration.meta.authMethod === 'bearer'">
      <v-col>
        <v-textarea
            label="Bearer token"
            hint="Bearer (service) token for authentication."
            v-model="configuration.backend.kubernetes.connection.bearerToken"
            persistent-hint
            outlined
            required
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-checkbox
            label="Configure TLS certificates"
            v-model="configuration.meta.tls"
            persistent-hint
            outlined
            required
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row dense v-if="configuration.meta.tls">
      <v-col>
        <v-alert
            border="left"
            dense
            outlined
            type="info"
        >
          Certificates inserted here are processed client-side and are not uploaded or shared with third parties.
        </v-alert>
      </v-col>
    </v-row>
    <v-row dense v-if="configuration.meta.tls">
      <v-col>
        <CertificateField
            label="CA Cert"
            hint="PEM-encoded trusted root certificates for the server."
            v-model="configuration.backend.kubernetes.connection.cacert"
        ></CertificateField>
      </v-col>
      <v-col>
        <CertificateField
            label="Certificate"
            hint="PEM-encoded certificate for TLS client certificate authentication."
            v-model="configuration.backend.kubernetes.connection.cert"
        ></CertificateField>
      </v-col>
      <v-col>
        <CertificateField
            label="Key"
            hint="PEM-encoded client key for TLS client certificate authentication."
            v-model="configuration.backend.kubernetes.connection.key"
        ></CertificateField>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CertificateField from "@/components/CertificateField";
import { mdiKubernetes } from '@mdi/js';

export default {
  name: 'BackendKubernetes',
  props: {
    configuration: Object
  },
  components: {
    CertificateField
  },
  methods: {},
  data: () => ({
    icons: {
      mdiKubernetes
    }
  })
}
</script>