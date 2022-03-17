<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-textarea
            class="v-textarea-config"
            :value="configContent"
            readonly
            persistent-hint
            outlined
            spellcheck="false"
        >
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
        <v-btn
          color="secondary"
          class="ml-5"
          v-clipboard="() => configContent"
        >
          <v-icon>{{ icons.mdiClipboardTextOutline }}</v-icon>
          Copy to clipboard
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import YAML from 'yaml';
import FileSaver from 'file-saver';
import { mdiTrayArrowDown, mdiClipboardTextOutline } from '@mdi/js';

export default {
  name: 'Download',
  props: {
    answers: Object
  },
  components: {},
  methods: {
    generateConfig: function() {
      this.yamlStructure = {
        ssh: {
          banner: "Welcome to ContainerSSH!\n",
          hostkeys: [
            "/var/secrets/ssh_host_rsa_key",
          ],
        },
        log: {
          level: "debug",
        },
        auth: {
          url: "",
        },
        backend: "",
      }

      // region Auth
      this.yamlStructure.auth.url = this.answers.authentication.webhook.url

      if (this.answers.authentication.webhook.url.startsWith('https:')) {
        this.yamlStructure.auth = Object.assign(this.yamlStructure.auth, {
          cert: this.answers.authentication.webhook.certificate
        })
      }

      // TODO: Implemenet TLS client authentication switch (What we need to put in the conf?)

      // endregion

      // region Dynamic Configuration

      // TODO Implement Dynamic Configuration

      // endregion

      // region Backend

      this.yamlStructure.backend = this.answers.backend.backend

      // region Backend: Docker
      if (this.answers.backend.backend === "docker") {
        this.yamlStructure = Object.assign(this.yamlStructure, {
          docker: {
            connection: {
              host: this.answers.backend.docker.host
            }
          }
        })
        if (this.answers.backend.docker.authenticationMethod === "certificate") {
          this.yamlStructure.docker.connection = Object.assign(this.yamlStructure.docker.connection, {
            cacert: '--- PLEASE INSERT YOUR CA CERT HERE OR ... ---\n',
            cacertFile: '/specify/the/path/of/ca.crt',
            cert: '--- PLEASE INSERT YOUR CERTIFICATE HERE OR ... ---\n',
            certFile: '/specify/the/path/of/certificate/file.pem',
            key: '--- PLEASE INSERT YOUR PRIVATE KEY HERE OR ... ---\n',
            keyFile: '/specify/the/path/of/private/key/file.key',
          })
        }
      }
      // endregion

      // region Backend: Kubernetes
      if (this.answers.backend.backend === "kubernetes") {
        this.yamlStructure = Object.assign(this.yamlStructure, {
          kubernetes: {
            connection: {
              serverName: this.answers.backend.kubernetes.serverName,
              host: this.answers.backend.kubernetes.host,
              path: this.answers.backend.kubernetes.path,
              cacert: '--- PLEASE INSERT YOUR CA CERT HERE OR ... ---\n',
              cacertFile: '/specify/the/path/of/ca.crt',
            },
            pod: {
              metadata: {
                namespace: 'containerssh',
              },
              spec: {
                containers: [
                  {
                    name: 'shell',
                    image: 'containerssh/containerssh-guest-image',
                  }
                ],
              },
            }
          }
        })

        if (this.answers.backend.kubernetes.authenticationMethod === "bearer") {
          this.yamlStructure.kubernetes.connection = Object.assign(this.yamlStructure.kubernetes.connection, {
            bearerToken: '--- PLEASE INSERT YOUR BEARER TOKEN HERE OR ... ---\n',
            bearerTokenFile: '/specify/the/path/of/bearer/token',
          })
        }
        if (this.answers.backend.kubernetes.authenticationMethod === "certificate") {
          this.yamlStructure.kubernetes.connection = Object.assign(this.yamlStructure.kubernetes.connection, {
            cert: '--- PLEASE INSERT YOUR CERTIFICATE HERE OR ... ---\n',
            certFile: '/specify/the/path/of/certificate/file.pem',
            key: '--- PLEASE INSERT YOUR PRIVATE KEY HERE OR ... ---\n',
            keyFile: '/specify/the/path/of/private/key/file.key',
          })
        }
      }
      // endregion

      // endregion

      this.configContent =  "# Generated with ContainerSSH Configurator (https://configurator.containerssh.io)\n"
          + "---\n"
          + YAML.stringify(this.yamlStructure)
    },
    downloadConfig: function() {
      let blob = new Blob(
          [this.configContent],
          {
            type: "text/plain; charset=utf-8"
          }
      );
      FileSaver.saveAs(blob, "config.yaml")
    },
    copyToClipboard: function() {
      //
    },
  },
  mounted() {
    try {
      this.isFileSaverSupported = !!new Blob;
    } catch (e) {
      this.isFileSaverSupported = false;
    }
    this.generateConfig()
  },
  data: () => ({
    icons: {
      mdiClipboardTextOutline,
      mdiTrayArrowDown,
    },
    isFileSaverSupported: false,
    yamlStructure: null,
    configContent: "",
  })
}
</script>

<style>
.v-textarea-config textarea {
  font-family: Consolas, "Courier New",serif;
}
</style>