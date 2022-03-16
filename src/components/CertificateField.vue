<template>
  <div>
    <v-textarea
      class="v-textarea-certificate"
      :rules="rules.concat([
        v => /^-----BEGIN CERTIFICATE-----([\s\S]*)-----END CERTIFICATE-----\s?$/.test(v) || 'This does not look like a PEM certificate.'
      ])"
      v-bind="$attrs"
      v-on="$listeners"
      :label="label"
      :hint="hint"
      :value="value"
      persistent-hint
      outlined
      spellcheck="false"
    >
    </v-textarea>
    <v-file-input
        :label="`${label} file`"
        v-model="payload"
        accept=".crt, .cer, .pem, .txt"
        @change="loadFile()"
    ></v-file-input>
  </div>
</template>

<script>
import { VTextarea } from "vuetify/lib/components";

export default {
  name: 'CertificateField',
  props: ['label', 'hint', 'type', 'rules'],
  extends: VTextarea,
  data: () => ({
    payload: null,
  }),
  methods: {
    loadFile: function() {
      if (this.payload == null) {
        this.$emit('input', '');
        return
      }
      let reader = new FileReader();
      reader.readAsText(this.payload);
      reader.onload = () => {
        this.$emit('input', reader.result)
      }
    }
  },
  computed: {
    textarea: {
      get: function() {
        return this.value
      },
      set: function(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.v-textarea-certificate textarea {
  font-family: Consolas, "Courier New",serif;
}
</style>