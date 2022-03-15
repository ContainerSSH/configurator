<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
            label="Webhook URL"
            hint="ContainerSSH will send a HTTP request to this URL for every authentication attempt. The webhook server can decide to allow or deny the request. You can find more information about the webhook protocol in the documentation."
            v-model="configuration.authentication.webhook.url"
            :rules="[rules.required, rules.isURL]"
            persistent-hint
            outlined
            required
        ></v-text-field>
        <v-alert
            v-show="configuration.authentication.webhook.url.startsWith('http:')"
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
    <v-row v-show="configuration.authentication.webhook.url.startsWith('https:')">
      <v-col>
        <CertificateField
          label="Webhook server certificate"
          v-model="configuration.authentication.webhook.certificate"
        ></CertificateField>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import isURL from 'validator/lib/isURL'
import CertificateField from "@/components/CertificateField";
import {mdiTrayArrowUp, mdiContentPaste, mdiAlert} from '@mdi/js';

export default {
  name: 'Authentication',
  props: {
    configuration: Object
  },
  components: {
    CertificateField
  },
  methods: {
    loadCertificateFromFile: function () {
      let reader = new FileReader();
      reader.readAsText(this.certificateContentFile);
      reader.onload = () => {
        this.configuration.authentication.webhook.certificate = reader.result
      }
      reader.onerror = () => {
        this.certificateContentMessage = reader.error
      }
    },
  },
  data: () => ({
    certificateContentFile: null,
    certificateContentMessage: null,
    icons: {
      mdiTrayArrowUp,
      mdiContentPaste,
      mdiAlert
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
  font-family: Consolas, "Courier New",serif;
}
</style>