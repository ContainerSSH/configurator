<template>
  <v-form
      v-model="configurationForm"
  >
    <v-stepper
        v-model="step"
        vertical
    >
      <!-- region Step 1: Welcome -->
      <!-- region Header -->
      <v-stepper-step
          :complete="isCompleted(1)"
          @click="goToStepIfCompleted(1)"
          step="1"
      >
        Welcome
      </v-stepper-step>
      <!-- endregion -->
      <!-- region Content -->
      <v-stepper-content step="1">
        <Welcome :answers="answers"/>
        <v-btn
            color="primary"
            @click="goToStep(2)"
        >
          Continue
        </v-btn>
      </v-stepper-content>
      <!-- endregion -->
      <!-- endregion -->

      <!-- region Step 2: Authentication -->
      <!-- region Header -->
      <v-stepper-step
          :complete="isCompleted(2)"
          @click="goToStepIfCompleted(2)"
          step="2"
      >
        Authentication
        <small class="mt-1" v-show="isCompleted(2)">
          Webhook URL:
          <pre class="d-inline">{{ answers.authentication.webhook.url }}</pre>
          <span v-show="webhookUrlIsInsecure()">
            without TLS-encryption
          </span>
        </small>
      </v-stepper-step>
      <!-- endregion -->
      <!-- region Content -->
      <v-stepper-content step="2">
        <Authentication :answers="answers"/>
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
      <!-- endregion -->

      <!-- region Step 3: Dynamic configuration -->
      <!-- region Header -->
      <v-stepper-step
          :complete="isCompleted(3)"
          @click="goToStepIfCompleted(3)"
          step="3"
      >
        Dynamic configuration
        <small class="mt-1" v-show="isCompleted(3) && answers.configuration.use">
          Config server URL:
          <pre class="d-inline">{{ answers.configuration.server.url }}</pre>
          <span v-show="configServerUrlIsInsecure()">
            without TLS-encryption
          </span>
        </small>
        <small class="mt-1" v-show="isCompleted(3) && !answers.configuration.use">
          Disabled.
        </small>
      </v-stepper-step>
      <!-- endregion -->
      <!-- region Content -->
      <v-stepper-content step="3">
        <DynamicConfiguration :answers="answers"/>
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
      <!-- endregion -->

      <!-- region Step 4: Backend -->
      <!-- region Header -->
      <v-stepper-step
          :complete="isCompleted(4)"
          @click="goToStepIfCompleted(4)"
          step="4"
      >
        Backend
        <small class="mt-1" v-show="isCompleted(4)">
          Using:
          <pre class="d-inline">{{ answers.backend.backend }}</pre>,
          host:
          <pre v-if="answers.backend.backend === 'docker'"
               class="d-inline">{{ answers.backend.docker.host }}</pre>
          <pre v-if="answers.backend.backend === 'kubernetes'"
               class="d-inline">{{ answers.backend.kubernetes.host }}</pre>
        </small>
      </v-stepper-step>
      <!-- endregion -->
      <!-- region Content -->
      <v-stepper-content step="4">
        <Backend :answers="answers"/>
        <div v-if="answers.backend.backend === 'docker'">
          <BackendDocker :answers="answers"/>
        </div>
        <div v-if="answers.backend.backend === 'kubernetes'">
          <BackendKubernetes :answers="answers"/>
        </div>
        <v-btn
            color="primary"
            @click="goToStep(5)"
        >
          Continue
        </v-btn>
        <v-btn text @click="goToStep(3)">
          Back
        </v-btn>
      </v-stepper-content>
      <!-- endregion -->
      <!-- endregion -->

      <!-- region Step 5: Download -->
      <!-- region Header -->
      <v-stepper-step
          :complete="isCompleted(5)"
          step="5"
      >
        Download
      </v-stepper-step>
      <!-- endregion -->
      <!-- region Content -->
      <v-stepper-content step="5">
        <Download :answers="answers" ref="configGenerator" />
      </v-stepper-content>
      <!-- endregion -->
      <!-- endregion -->
    </v-stepper>
  </v-form>
</template>

<script type="ts">
import Welcome from "@/components/steps/Welcome";
import Authentication from "@/components/steps/Authentication";
import DynamicConfiguration from "@/components/steps/DynamicConfiguration";
import Backend from "@/components/steps/Backend";
import BackendDocker from "@/components/steps/BackendDocker";
import BackendKubernetes from "@/components/steps/BackendKubernetes";
import Download from "@/components/steps/Download";

export default {
  name: 'Configurator',
  components: {
    Welcome,
    Authentication,
    DynamicConfiguration,
    Backend,
    BackendDocker,
    BackendKubernetes,
    Download,
  },
  data: () => ({
    icons: {},
    step: 1,
    configurationForm: "",
    answers: {
      authentication: {
        webhook: {
          url: 'http://authconfig:8080',
          certificate: null,
          tlsClientAuthentication: false,
        },
      },
      configuration: {
        // use dynamic configuration option
        use: false,
        server: {
          url: 'http://authconfig:8080/config',
          certificate: null,
          tlsClientAuthentication: false,
        },
      },
      backend: {
        backend: "docker",
        docker: {
          host: "unix:///var/run/docker.sock",
          authenticationMethod: 'none',
          image: 'containerssh/containerssh',
          env: [],
          mount: []
        },
        kubernetes: {
          host: 'kubernetes.default.svc',
          serverName: 'kubernetes.default.svc',
          path: '/api',
          authenticationMethod: 'bearer',
          image: 'containerssh/containerssh-guest-image',
        },
      },
    },
  }),
  methods: {
    isCompleted: function (step) {
      return this.step > step
    },
    webhookUrlIsInsecure: function () {
      return this.answers.authentication.webhook.url.startsWith('http:')
    },
    configServerUrlIsInsecure: function() {
      return this.answers.configuration.server.url.startsWith('http:')
    },
    goToStep: function (step) {
      this.step = step
      this.$refs.configGenerator.generateConfig()
    },
    goToStepIfCompleted: function (step) {
      if (this.isCompleted(step)) {
        this.goToStep(step)
      }
    }
  }
}
</script>