<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-text-field
            label="Webhook URL"
            hint="ContainerSSH will send a HTTP request to this URL for every authentication attempt. The webhook server can decide to allow or deny the request. You can find more information about the webhook protocol in the documentation."
            v-model="answers.authentication.webhook.url"
            :rules="[rules.required, rules.isURL]"
            persistent-hint
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense v-show="webhookUrlIsInsecure()">
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
          ) connection. ContainerSSH will transmit user credentials in clear text. We strongly recommend using a
          TLS-encrypted connection between ContainerSSH and the authentication webhook.
        </v-alert>
      </v-col>
    </v-row>
    <v-row dense v-if="webhookUrlIsSecure()">
      <v-col>
        <CertificateField
            label="Webhook server certificate"
            v-model="answers.authentication.webhook.certificate"
            :rules="[
            v => (webhookUrlIsSecure() && !!v) || 'Please provide a certificate for the webhook server. ContainerSSH uses this certificate to validate it is sending the user credentials to the correct server.'
        ]"
        ></CertificateField>
      </v-col>
    </v-row>
    <v-row dense v-if="webhookUrlIsSecure()">
      <v-col>
        <v-checkbox
            label="TLS client authentication"
            :hint="
            webhookUrlIsInsecure() ?
            'TLS client authentication is not available with http:// URLs.' :
            'ContainerSSH can authenticate itself with the authentication webhook server using TLS client certificates. Use this option to prevent brute forcing passwords against a publicly available authentication webhook server. Alternatively, firewall your webhook server.'
          "
            v-model="answers.authentication.webhook.tlsClientAuthentication"
            :disabled="webhookUrlIsInsecure()"
            persistent-hint
        >
        </v-checkbox>
      </v-col>
    </v-row>
    <v-row dense v-if="webhookUrlIsSecure()">
      <v-col>
        <v-alert
            v-show="!answers.authentication.webhook.tlsClientAuthentication"
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
            v-show="answers.authentication.webhook.tlsClientAuthentication"
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
  name: 'Authentication',
  props: {
    answers: Object
  },
  components: {
    CertificateField
  },
  methods: {
    webhookUrlIsInsecure: function () {
      return this.answers.authentication.webhook.url.startsWith('http:')
    },
    webhookUrlIsSecure: function () {
      return this.answers.authentication.webhook.url.startsWith('https:')
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