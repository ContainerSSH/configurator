<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-subheader class="pl-0 pr-0 mb-n3">{{ label }}</v-subheader>
      </v-col>
    </v-row>
    <v-row v-show="value.length > 0" dense>
      <v-col>
        <v-card outlined>
          <v-container fluid>
            <v-row v-for="(record, index) in value" :key="index" dense>
              <v-col cols="5">
                <v-text-field v-model="record.key" label="Key" :rules="[v => !!v || 'Required']">
                  <template v-slot:append-outer>
                    <v-icon>{{ icons.mdiEqual }}</v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field v-model="record.value" label="Value" :rules="[v => !!v || 'Required']"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn @click="removeItem(value, index)" class="mt-5" color="red" small>
                  <v-icon color="white" small>
                    {{ icons.mdiCloseThick }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <div v-show="hint" class="v-messages theme--light mb-5">
          <div class="v-messages__wrapper">
            <div class="v-messages__message">
              {{ hint }}
            </div>
          </div>
        </div>
        <v-btn @click="addItem(value)" color="secondary" small>
          <v-icon>
            {{ icons.mdiPlus }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="ts">
import { mdiPlus, mdiEqual, mdiCloseThick } from '@mdi/js';

export default {
  name: 'EnvironmentField',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      // TODO Finding a better way to check that we get the right structure.
      type: Array,
    },
    hint: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {
      defaults: {
        key: '',
        value: '',
      },
      icons: {
        mdiPlus,
        mdiEqual,
        mdiCloseThick,
      }
    }
  },
  methods: {
    addItem: function(records) {
      // A new object must be created, otherwise the changes on the form will write back to the defaults variable.
      records.push(Object.assign({}, this.defaults))
    },
    removeItem: function(records, index) {
      records.splice(index, 1)
    }
  }
}
</script>