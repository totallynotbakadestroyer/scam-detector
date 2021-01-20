<template>
  <div class="d-flex flex-column" style="width: 100%; height: 100%">
    <v-card-text class="fill-height">
      <v-row>
        <v-col cols="12">
          <v-text-field
            counter="50"
            label="Report review*"
            placeholder="Briefly describe your report"
            v-model="payload.review"
            :error-messages="reviewErrors"
            v-on:input="$v.payload.review.$touch"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="payload.website"
            label="Website*"
            :items="websites"
            :error-messages="websiteErrors"
            v-on:input="$v.payload.website.$touch"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            :error-messages="typeErrors"
            v-model="payload.type"
            label="Type*"
            row
            :items="types"
            v-on:input="$v.payload.type.$touch"
          >
          </v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            placeholder="For example: https://vk.com/baka_destroyer"
            label="Link*"
            v-model="payload.link"
            v-on:input="$v.payload.link.$touch"
            :error-messages="linkErrors"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            placeholder="Explain why we should add this user/group to our database"
            auto-grow
            clearable
            rows="1"
            label="Description"
            v-model="payload.description"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field
            prepend-icon=""
            multiple
            label="Proofs"
            placeholder="Imgur album link with pictures that will proof allegation"
            v-model="payload.proofs"
          ></v-text-field>
        </v-col>
      </v-row>
      <div id="info">
        <p class="caption float-right mt-auto">
          Fields marked with * are required
        </p>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn @click="resetForm" class="mr-2" color="error">Clear Report</v-btn>
      <v-btn
        @click="
          $v.$touch();
          !$v.$invalid && $emit('submit', payload);
        "
        class="ml-2"
        color="primary"
        >Submit Report</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "NewReportForm",
  mixins: [validationMixin],
  props: {
    payload: {
      type: Object,
      default() {
        return {
          payload: {
            review: "",
            website: "",
            type: "",
            link: "",
            description: "",
            proofs: ""
          }
        };
      }
    }
  },
  data() {
    return {
      websites: ["vk.com"],
      types: ["user", "group"]
    };
  },
  validations: {
    payload: {
      review: {
        required,
        maxLength: maxLength(50)
      },
      website: {
        required
      },
      type: {
        required
      },
      link: {
        required
      }
    }
  },
  computed: {
    reviewErrors() {
      const errors = [];
      if (!this.$v.payload.review.$dirty) {
        return errors;
      }
      if (!this.$v.payload.review.required) {
        errors.push("Review is required");
        return errors;
      }
      if (!this.$v.payload.review.maxLength) {
        errors.push("Review should be less than 50 symbols");
        return errors;
      }
      return errors;
    },
    websiteErrors() {
      const errors = [];
      if (!this.$v.payload.website.$dirty) {
        return errors;
      }
      if (!this.$v.payload.website.required) {
        errors.push("Website is required");
        return errors;
      }
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.payload.type.$dirty) {
        return errors;
      }
      if (!this.$v.payload.type.required) {
        errors.push("Type is required");
        return errors;
      }
      return errors;
    },
    linkErrors() {
      const errors = [];
      if (!this.$v.payload.link.$dirty) {
        return errors;
      }

      if (!this.$v.payload.link.required) {
        errors.push("Link is required");
        return errors;
      }
      return errors;
    }
  },
  methods: {
    resetForm() {
      const emptyPayload = { ...this.payload };
      Object.keys(emptyPayload).forEach(key => {
        emptyPayload[key] = "";
      });
      this.payload = emptyPayload;
    }
  }
};
</script>
