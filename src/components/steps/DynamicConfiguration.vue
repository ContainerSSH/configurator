<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
            label="Config server URL"
            hint="ContainerSSH will send a HTTP request to this URL for every authentication attempt. The webhook server can decide to allow or deny the request. You can find more information about the webhook protocol in the documentation."
            v-model="configuration.dynamicConfiguration.server.url"
            :rules="[
              v => !!v || 'URL is required',
              v => this.validateURL(v) || 'Valid URL required'
            ]"
            persistent-hint
            outlined
            required
        ></v-text-field>
        <v-alert
            v-show="configuration.dynamicConfiguration.server.url.startsWith('http:')"
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
  </v-container>
</template>

<script>
import isURL from 'validator/lib/isURL'
import {mdiAlert} from '@mdi/js';

export default {
  name: 'DynamicConfiguration',
  props: {
    configuration: Object
  },
  methods: {
    validateURL: function (value) {
      return isURL(value, {protocols: ['http', 'https'], require_tld: false})
    },
  },
  data: () => ({
    icons: {
      mdiAlert
    },
    rules: {
      required: v => !!v || 'Required.'
    }
  })
}
</script>