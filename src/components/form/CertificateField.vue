<template>
  <div>
    <v-textarea
        v-bind="$attrs"
        v-on="$listeners"
        class="v-textarea-certificate"
        :rules="rules.concat(this.certificateRules)"
        :label="label"
        :hint="hint"
        :value="value"
        persistent-hint
        outlined
        spellcheck="false"
    >
    </v-textarea>
    <v-file-input
        v-model="payload"
        @change="loadFile()"
        :label="`${label} file`"
        :loading="uploadInProgress"
        :error-messages="uploadErrorMessage"
        accept=".crt, .cer, .pem, .txt"
    ></v-file-input>
  </div>
</template>

<script type="ts">
import {VTextarea} from "vuetify/lib/components";

export default {
  name: 'CertificateField',
  props: {
    label: {
      type: String,
      required: true,
    },
    hint: {
      type: String,
    },
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {},
  },
  extends: VTextarea,
  data: () => ({
    certificateRules: [
      v => /^-----BEGIN CERTIFICATE-----([\s\S]*)-----END CERTIFICATE-----\s?$/.test(v) || 'This does not look like a PEM certificate.'
    ],
    uploadErrorMessage: '',
    uploadInProgress: false,
    payload: null,
  }),
  methods: {
    loadFile: function () {
      if (this.payload == null) {

        return
      }
      let reader = new FileReader();
      reader.readAsText(this.payload, "UTF-8");
      reader.onload = () => {
        this.$emit('input', reader.result
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n'))
      }
      reader.onerror = () => {
        this.uploadErrorMessage = 'The file failed to load! Please try again or paste certificate text from clipboard.';
      }
      reader.onloadstart = () => {
        this.uploadInProgress = true
      }
      reader.onloadend = () => {
        this.uploadInProgress = false
      }
    }
  },
  computed: {
    textarea: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.v-textarea-certificate textarea {
  font-family: Consolas, "Courier New", serif;
}
</style>