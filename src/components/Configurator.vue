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
          Start configuring
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
          step="5"
      >
        Deployment
      </v-stepper-step>
      <v-stepper-content step="5">
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
        <v-btn text @click="goToStep(1)">
          Create new
        </v-btn>
        <v-btn text @click="goToStep(4)">
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
import { mdiTrayArrowUp, mdiTrayArrowDown } from '@mdi/js';

export default {
  name: 'Configurator',
  components: {
    Welcome,
    Authentication,
    DynamicConfiguration,
    Backend,
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
      backend: {
        backend: "docker",
        docker: {
          connection: {
            host: "unix:///var/run/docker.sock"
          }
        },
        kubernetes: {}
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