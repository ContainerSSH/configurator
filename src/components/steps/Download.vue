<!--
  TODO Specify custom docker image (containerssh/containerssh-guest-image)
  TODO Support ENV variables
  TODO Support Volume mounts ( https://containerssh.io/reference/docker/#mounts )
 -> docker:
      execution:
        host:
          mounts:
            - target: /path/in/container
              source: <volume name, host path, etc>
              type: <bind*|volume|tmpfs|npipe>
  TODO Looking for copy to clipboard solution --> gh --> https://github.com/haveyoudebuggedit/debugged.it/blob/main/assets/js/codecopy.js

-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-alert
            type="info"
        >
          Please review the configuration below before use, as some parameters need to be set manually.
        </v-alert>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea
            label="config.yaml"
            class="v-textarea-config"
            :value="configContent"
            persistent-hint
            outlined
            readonly
            spellcheck="false"
            rows="15"
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
            large
        >
          <v-icon>{{ icons.mdiTrayArrowDown }}</v-icon>
          Download
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="ts">
import lodash from 'lodash';
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
        this.yamlStructure.auth = lodash.mergeWith(this.yamlStructure.auth, {
          cert: this.answers.authentication.webhook.certificate
        })
      }
      // endregion

      // region Dynamic Configuration
      if (this.answers.configuration.use) {
        this.yamlStructure = lodash.mergeWith(this.yamlStructure, {
          configserver: {
            url: this.answers.configuration.server.url
          }
        })
        if (this.answers.configuration.server.url.startsWith('https:')) {
          this.yamlStructure = lodash.mergeWith(this.yamlStructure, {
            configserver: {
              cert: this.answers.configuration.server.certificate
            }
          })
        }
        if (this.answers.configuration.server.tlsClientAuthentication) {
          this.yamlStructure = lodash.mergeWith(this.yamlStructure, {
            configserver: {
              cacert: "-----BEGIN CERTIFICATE-----\n(PLEASE REPLACE)\n-----END CERTIFICATE-----",
              key: "-----BEGIN RSA PRIVATE KEY-----\n(PLEASE REPLACE)\n-----END RSA PRIVATE KEY-----"
            }
          })
        }
      }
      // endregion

      // region Backend

      this.yamlStructure.backend = this.answers.backend.backend

      // region Backend: Docker
      if (this.answers.backend.backend === "docker") {
        this.yamlStructure = lodash.mergeWith(this.yamlStructure, {
          docker: {
            connection: {
              host: this.answers.backend.docker.host
            },
            execution: {
              container: {
                image: this.answers.backend.docker.image
              }
            }
          }
        })
        if (this.answers.backend.docker.authenticationMethod === "certificate") {
          this.yamlStructure.docker.connection = lodash.mergeWith(this.yamlStructure.docker.connection, {
            cacert: "-----BEGIN CERTIFICATE-----\n(PLEASE REPLACE)\n-----END CERTIFICATE-----",
            cert:  "-----BEGIN CERTIFICATE-----\n(PLEASE REPLACE)\n-----END CERTIFICATE-----",
            key: "-----BEGIN RSA PRIVATE KEY-----\n(PLEASE REPLACE)\n-----END RSA PRIVATE KEY-----",
          })
        }
        // this.answers.backend.docker.env
        if (this.answers.backend.docker.env.length > 0) {
          this.yamlStructure.docker = lodash.mergeWith(this.yamlStructure.docker, {
            execution: {
              container: {
                env: Object.entries(this.answers.backend.docker.env).map(([ k, v ]) => v.key + "=" + v.value)
              }
            }
          })
        }
        if (this.answers.backend.docker.mount.length > 0) {
          this.yamlStructure.docker = lodash.mergeWith(this.yamlStructure.docker, {
            execution: {
              host: {
                mounts: this.answers.backend.docker.mount
              }
            }
          })
        }
      }
      // endregion

      // region Backend: Kubernetes
      if (this.answers.backend.backend === "kubernetes") {
        this.yamlStructure = lodash.mergeWith(this.yamlStructure, {
          kubernetes: {
            connection: {
              serverName: this.answers.backend.kubernetes.serverName,
              host: this.answers.backend.kubernetes.host,
              path: this.answers.backend.kubernetes.path,
              cacertFile: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
            },
            pod: {
              metadata: {
                namespace: 'containerssh',
              },
              spec: {
                containers: [
                  {
                    name: 'shell',
                    image: this.answers.backend.kubernetes.image,
                  }
                ],
              },
            }
          }
        })

        if (this.answers.backend.kubernetes.authenticationMethod === "bearer") {
          this.yamlStructure.kubernetes.connection = lodash.mergeWith(this.yamlStructure.kubernetes.connection, {
            bearerTokenFile: '/var/run/secrets/kubernetes.io/serviceaccount/token',
          })
        }
        if (this.answers.backend.kubernetes.authenticationMethod === "certificate") {
          this.yamlStructure.kubernetes.connection = lodash.mergeWith(this.yamlStructure.kubernetes.connection, {
            certFile: '/specify/the/path/of/certificate/file.pem',
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