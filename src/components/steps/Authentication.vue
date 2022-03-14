<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
            label="Webhook URL"
            hint="ContainerSSH will send a HTTP request to this URL for every authentication attempt. The webhook server can decide to allow or deny the request. You can find more information about the webhook protocol in the documentation."
            v-model="configuration.authentication.webhook.url"
            :rules="[
              v => !!v || 'URL is required',
              v => this.validateURL(v) || 'Valid URL required'
            ]"
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
        <v-textarea
            label="Webhook server certificate"
            v-model="configuration.authentication.webhook.certificate"
            :rules="configuration.authentication.webhook.certificateRules"
            persistent-hint
            outlined
            required
        ></v-textarea>
          <label
              class="mt-n5 float-right v-btn v-btn--text theme--light v-size--default"
              for="certificateContentFileUploader"
          >
            <v-icon>{{ icons.mdiTrayArrowUp }}</v-icon>
            Browse files
          </label>
        <v-file-input
            hide-input
            id="certificateContentFileUploader"
            v-model="certificateContentFile"
            @change="loadCertificateFromFile()"
            accept=".crt, .cer, .pem, .txt"
            class="d-none"
        ></v-file-input>
        <v-alert
            color="red"
            dense
            type="error"
            v-model="certificateContentMessage"
        ></v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import isURL from 'validator/lib/isURL'
import {mdiTrayArrowUp, mdiContentPaste, mdiAlert} from '@mdi/js';

export default {
  name: 'Authentication',
  props: {
    configuration: Object
  },
  methods: {
    validateURL: function (value) {
      return isURL(value, {protocols: ['http', 'https'], require_tld: false})
    },
    selectCertificateFromDevice: function () {
      this.$refs.certificateContentFileUploader.input.click();
    },
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
    }
  })
}
</script>