<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-textarea class="v-textarea-config" :value="configContent" readonly>
        </v-textarea>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-btn
            color="primary"
            v-show="isFileSaverSupported"
            @click="downloadConfig()"
        >
          <v-icon>{{ icons.mdiTrayArrowDown }}</v-icon>
          Download
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FileSaver from 'file-saver';
import { mdiTrayArrowDown } from '@mdi/js';

export default {
  name: 'Download',
  props: {
    answers: Object
  },
  components: {},
  methods: {
    downloadConfig: function() {
      let blob = new Blob(
          [this.configContent],
          {
            type: "text/plain; charset=utf-8"
          }
      );
      FileSaver.saveAs(blob, "config.yaml")
    }
  },
  mounted() {
    try {
      this.isFileSaverSupported = !!new Blob;
    } catch (e) {
      this.isFileSaverSupported = false;
    }
  },
  data: () => ({
    tls: false,
    isFileSaverSupported: false,
    configContent: `# Generated with ContainerSSH Configurator (https://configurator.containerssh.io)
---
# WIP
`,
    icons: {
      mdiTrayArrowDown
    }
  })
}
</script>

<style>
.v-textarea-config textarea {
  font-family: Consolas, "Courier New",serif;
}
</style>