<template>
  <v-form
      v-model="configurationForm"
  >
    <v-stepper
        v-model="step"
        vertical
    >
      <!-- region Step 1 -->
      <v-stepper-step
          :complete="isCompleted(1)"
          @click="goToStep(1)"
          step="1"
      >
        Welcome
      </v-stepper-step>
      <v-stepper-content step="1">
        <Welcome :configuration="configuration"/>
        <v-btn
            color="primary"
            @click="goToStep(2)"
        >
          Continue
        </v-btn>
      </v-stepper-content>
      <!-- endregion -->

      <!-- region Step 2 -->
      <v-stepper-step
          :complete="isCompleted(2)"
          @click="isCompleted(2) && goToStep(2)"
          step="2"
      >
        Authentication
        <small class="mt-1" v-show="isCompleted(2)">
          Webhook URL: <pre class="d-inline">{{ configuration.authentication.webhook.url }}</pre>
          <span v-show="configuration.authentication.webhook.url.startsWith('http:')">
            without TLS-encryption
          </span>
        </small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <Authentication :configuration="configuration"/>
        <v-btn
            color="primary"
            @click="goToStep(3)"
        >
          Continue
        </v-btn>
        <v-btn text @click="goToStep(1)">
          Back
        </v-btn>
      </v-stepper-content>
      <!-- endregion -->

      <!-- region Step 3 -->
      <v-stepper-step
          :complete="isCompleted(3)"
          @click="isCompleted(3) && goToStep(3)"
          step="3"
      >
        Dynamic configuration
        <small class="mt-1" v-show="isCompleted(3)">
          Config server URL: <pre class="d-inline">{{ configuration.dynamicConfiguration.server.url }}</pre>
          <span v-show="configuration.dynamicConfiguration.server.url.startsWith('http:')">
            without TLS-encryption
          </span>
        </small>
      </v-stepper-step>
      <v-stepper-content step="3">
        <DynamicConfiguration :configuration="configuration"/>
        <v-btn
            color="primary"
            @click="goToStep(4)"
        >
          Continue
        </v-btn>
        <v-btn text @click="goToStep(2)">
          Back
        </v-btn>
      </v-stepper-content>
      <!-- endregion -->

      <!-- region Step 4 -->
      <v-stepper-step
          :complete="isCompleted(4)"
          @click="isCompleted(4) && goToStep(4)"
          step="4"
      >
        Backend
        <small class="mt-1" v-show="isCompleted(4)">
          Using: <pre class="d-inline">{{ configuration.backend.backend }}</pre>
        </small>
      </v-stepper-step>
      <v-stepper-content step="4">
        <Backend :configuration="configuration"/>
        <v-btn
            color="primary"
            @click="step = 5"
        >
          Continue
        </v-btn>
        <v-btn text @click="goToStep(3)">
          Back
        </v-btn>
      </v-stepper-content>
      <!-- endregion -->

      <!-- region Step 5 -->
      <v-stepper-step
          :complete="isCompleted(5)"
          @click="isCompleted(5) && goToStep(5)"
          step="5"
      >
        Configure backend
        <small class="mt-1" v-show="isCompleted(5)">
          Host:
          <pre v-if="configuration.backend.backend === 'docker'" class="d-inline">{{ configuration.backend.docker.connection.host }}</pre>
          <pre v-if="configuration.backend.backend === 'kubernetes'" class="d-inline">{{ configuration.backend.kubernetes.connection.host }}</pre>
          <span v-show="configuration.meta.tls">
            with configured certificates
          </span>
        </small>
      </v-stepper-step>
      <v-stepper-content step="5">
        <div v-if="configuration.backend.backend === 'docker'">
          <BackendDocker :configuration="configuration" />
        </div>
        <div v-if="configuration.backend.backend === 'kubernetes'">
          <BackendKubernetes :configuration="configuration" />
        </div>
        <v-btn
            color="primary"
            @click="goToStep(6)"
        >
          Continue
        </v-btn>
        <v-btn text @click="goToStep(4)">
          Back
        </v-btn>
      </v-stepper-content>
      <!-- endregion -->

      <!-- region Step 6 -->
      <v-stepper-step
          :complete="isCompleted(6)"
          step="6"
      >
        Deployment
      </v-stepper-step>
      <v-stepper-content step="6">
        <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
        ></v-card>
        <!-- TODO: Implement me -->
        <v-btn
            color="primary"
            @click="goToStep(1)"
        >
          <v-icon>{{ icons.mdiTrayArrowDown }}</v-icon> Download
        </v-btn>
        <v-btn text @click="goToStep(5)">
          Back
        </v-btn>
      </v-stepper-content>
      <!-- endregion -->
    </v-stepper>
  </v-form>
</template>

<script>
import Welcome from "@/components/steps/Welcome";
import Authentication from "@/components/steps/Authentication";
import DynamicConfiguration from "@/components/steps/DynamicConfiguration";
import Backend from "@/components/steps/Backend";
import BackendDocker from "@/components/steps/BackendDocker";
import BackendKubernetes from "@/components/steps/BackendKubernetes";
import { mdiTrayArrowUp, mdiTrayArrowDown } from '@mdi/js';

export default {
  name: 'Configurator',
  components: {
    Welcome,
    Authentication,
    DynamicConfiguration,
    Backend,
    BackendDocker,
    BackendKubernetes,
  },
  methods: {
    isCompleted: function (step) {
      return this.step > step
    },
    goToStep: function (step) {
      this.step = step
    }
  },
  data: () => ({
    icons: {
      mdiTrayArrowUp,
      mdiTrayArrowDown
    },
    step: 1,
    configurationForm: "",
    configuration: {
      meta: {
        authMethod: "bearer",
        tls: false,
      },
      backend: {
        backend: "docker",
        docker: {
          connection: {
            cacert: null,
            cert: null,
            host: "unix:///var/run/docker.sock",
            key: null,
          }
        },
        kubernetes: {
          connection: {
            bearerToken: null, //
            bearerTokenFile: null,
            burst: 0,
            cacert: null,
            cacertFile: null,
            cert: null,
            certFile: null,
            host: 'kubernetes.default.svc', //
            key: null,
            keyFile: null,
            password: null,
            path: '/api',
            qps: 5,
            serverName: null, //
            username: null, //
          }
        }
      },
      authentication: {
        webhook: {
          url: "http://authconfig:8080",
          certificate: "",
        }
      },
      dynamicConfiguration: {
        server: {
          url: "http://authconfig:8080/config"
        },
        ssh: {
          banner: "Welcome to ContainerSSH!\n",
          hostkeys: []
        }
      }
    },
  }),
}
</script>