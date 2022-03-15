<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-text-field
            label="Host"
            hint="The docker connect URL."
            v-model="configuration.backend.docker.connection.host"
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
            v-model="configuration.backend.docker.connection.cacert"
        ></CertificateField>
      </v-col>
      <v-col>
        <CertificateField
            label="Certificate"
            hint="PEM-encoded certificate for TLS client certificate authentication."
            v-model="configuration.backend.docker.connection.cert"
        ></CertificateField>
      </v-col>
      <v-col>
        <CertificateField
            label="Key"
            hint="PEM-encoded client key for TLS client certificate authentication."
            v-model="configuration.backend.docker.connection.key"
        ></CertificateField>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiDocker } from '@mdi/js';
import CertificateField from "@/components/CertificateField";

export default {
  name: 'BackendDocker',
  props: {
    configuration: Object
  },
  components: {
    CertificateField
  },
  methods: {},
  data: () => ({
    tls: false,
    icons: {
      mdiDocker
    }
  })
}
</script>