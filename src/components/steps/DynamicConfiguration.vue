<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <!-- TODO Hint -->
        <v-checkbox
            label="Use dynamic configuration"
            v-model="answers.configuration.use"
            persistent-hint
        >
        </v-checkbox>
      </v-col>
    </v-row>
    <v-row v-show="useDynamicConfiguration()">
      <v-col>
        <v-text-field
            label="Server server URL"
            hint="ContainerSSH will send a HTTP request to this URL for every authentication attempt. The webhook server can decide to allow or deny the request. You can find more information about the webhook protocol in the documentation."
            v-model="answers.configuration.server.url"
            :rules="[rules.required, rules.isURL]"
            persistent-hint
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense v-show="useDynamicConfiguration() && serverUrlIsInsecure()">
      <v-col>
        <v-alert
            :icon="icons.mdiAlert"
            border="left"
            color="orange"
            dense
            outlined
            type="warning"
        >
          You are using an unencrypted (
          <pre class="d-inline">http://</pre>
          ) connection. ContainerSSH will transmit configuration in clear text. We strongly recommend using a
          TLS-encrypted connection between ContainerSSH and the config server.
        </v-alert>
      </v-col>
    </v-row>
    <v-row dense v-show="useDynamicConfigurationAndUrlIsSecure()">
      <v-col>
        <CertificateField
            label="Configuration server certificate"
            v-model="answers.configuration.server.certificate"
            :rules="[
              v => (!serverUrlIsInsecure() && !!v) || 'Please provide a certificate for the configuration server. ContainerSSH uses this certificate to validate it is sending the user credentials to the correct server.'
          ]"
        ></CertificateField>
      </v-col>
    </v-row>
    <v-row dense v-show="useDynamicConfigurationAndUrlIsSecure()">
      <v-col>
        <v-checkbox
            label="TLS client authentication"
            :hint="
              serverUrlIsInsecure() ?
              'TLS client authentication is not available with http:// URLs.' :
              'ContainerSSH can authenticate itself with the authentication configuration server using TLS client certificates. Use this option to prevent brute forcing passwords against a publicly available authentication webhook server. Alternatively, firewall your webhook server.'
            "
            v-model="answers.configuration.server.tlsClientAuthentication"
            :disabled="serverUrlIsInsecure()"
            persistent-hint
        >
        </v-checkbox>
      </v-col>
    </v-row>
    <v-row dense v-show="useDynamicConfigurationAndUrlIsSecure()">
      <v-col>
        <v-alert
            v-show="!answers.configuration.server.tlsClientAuthentication"
            :icon="icons.mdiAlert"
            border="left"
            color="orange"
            dense
            outlined
            type="warning"
        >
          You are not using TLS client authentication. Anyone able to reach your authentication webhook server can brute
          force SSH credentials. Please firewall your webhook.
        </v-alert>
        <v-alert
            v-show="answers.configuration.server.tlsClientAuthentication"
            :icon="icons.mdiCheck"
            border="left"
            color="green"
            dense
            outlined
            type="success"
        >
          Please add your client TLS certificates to the final config file in the marked space.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="ts">
import isURL from 'validator/lib/isURL'
import CertificateField from "@/components/form/CertificateField";
import {mdiAlert, mdiCheck} from '@mdi/js';

export default {
  name: 'DynamicConfiguration',
  props: {
    answers: Object
  },
  components: {
    CertificateField
  },
  methods: {
    serverUrlIsInsecure: function () {
      return this.answers.configuration.server.url.startsWith('http:')
    },
    useDynamicConfiguration: function() {
      return this.answers.configuration.use
    },
    useDynamicConfigurationAndUrlIsSecure: function() {
      return this.useDynamicConfiguration() && !this.serverUrlIsInsecure();
    }
  },
  data: () => ({
    icons: {
      mdiAlert,
      mdiCheck
    },
    rules: {
      required: v => !!v || 'Required.',
      isURL: v => isURL(v, {protocols: ['http', 'https'], require_tld: false}) || 'The specified URL is valid.',
    }
  })
}
</script>

<style>
.textarea-certificate textarea {
  font-family: Consolas, "Courier New", serif;
}
</style>