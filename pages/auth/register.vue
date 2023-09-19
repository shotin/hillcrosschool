<template>
  <section class="min-vh-100">
    <div
      class="page-header align-items-start min-vh-50"
      style="background-image: url('../assets/img/auth_background.png')"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">
              <img
                src="/assets/img/new-hillcross-logo.png"
                style="width: 200px"
                alt="LOGO"
              />
            </h1>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-7">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10">
        <div class="col-xl-6 col-lg-6 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5 style="color: #dc3545; font-weight: bolder">
                Admission Application
              </h5>
            </div>
            <div class="card-body">
              <form role="form text-left" @submit.prevent="processRegister()">
                <div class="mb-3">
                  <label for=""
                    >Nationality <span class="text-danger">*</span></label
                  >
                  <multiselect
                    v-model="selectResidence"
                    :options="select.countries"
                    track-by="id"
                    label="name"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select Nationality"
                  >
                  </multiselect>
                </div>

                <div class="mb-3">
                  <label style="font-weight: bolder" for=""
                    >ID/Passport Number
                    <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    v-model="form.passport_number"
                    class="form-control"
                    placeholder="ID/Passport Number"
                    aria-label="Email"
                    aria-describedby="email-addon"
                  />
                  <validation-error
                    :message="validationKeys.passport_number.message"
                    :showError="validationKeys.passport_number.error"
                  />
                </div>

                <div class="mb-3">
                  <label for=""
                    >Cell Phone Number <span class="text-danger">*</span></label
                  >
                  <vue-phone-number-input
                    v-model="phone_number"
                    :default-country-code="`ZA`"
                    :required="true"
                    @update="phoneResult = $event"
                  />
                  <validation-error
                    :message="validationKeys.phone_number.message"
                    :showError="validationKeys.phone_number.error"
                  />
                </div>

                <div class="mb-3">
                  <label for=""
                    >Password <span class="text-danger">*</span></label
                  >
                  <input
                    :type="passwordType"
                    v-model="form.password"
                    class="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="password-addon"
                  />
                  <i
                    class="fa field-icon toggle-password"
                    :class="[stage ? 'fa-eye' : 'fa-eye-slash']"
                    @click="togglePasswordRegister(stage)"
                    id="togglePasswordRegister"
                    style="cursor: pointer"
                  ></i>
                  <validation-error
                    :message="validationKeys.password.message"
                    :showError="validationKeys.password.error"
                  />
                </div>
                <div class="mb-3">
                  <label for=""
                    >Re-type Password <span class="text-danger">*</span></label
                  >
                  <input
                    :type="passwordTypeConfirm"
                    v-model="form.confirm_password"
                    class="form-control"
                    placeholder="Confirm Password"
                    aria-label="Password"
                    aria-describedby="password-addon"
                  />
                  <i
                    class="fa field-icon toggle-password"
                    :class="[stageConfirm ? 'fa-eye' : 'fa-eye-slash']"
                    @click="togglePasswordRegisterConfirm(stage)"
                    id="togglePasswordRegisterConfirm"
                    style="cursor: pointer"
                  ></i>
                  <validation-error
                    :message="validationKeys.confirm_password.message"
                    :showError="validationKeys.confirm_password.error"
                  />
                </div>
                <div class="form-check form-check-info text-left">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    I agree the
                    <a
                      href="javascript:;"
                      style="color: #dc3545"
                      class="font-weight-bolder"
                      >Terms and Conditions</a
                    >
                  </label>
                </div>
                <div class="text-center w-100">
                  <custom-button
                    :name="`START APPLICATION PROCESS`"
                    :type="`submit`"
                    :loading="loading"
                    :disabled="disabled"
                  />
                </div>
                <p class="text-sm mt-3 mb-5">
                  To complete existing application
                  <nuxt-link
                    to="/auth/login"
                    style="color: #ec1b22"
                    class="font-weight-bolder"
                    >Sign in</nuxt-link
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <help-message /> -->
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import CustomButton from "../../components/Button.vue";
import { handleError, notify } from "@/assets/js/utility";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import ValidationError from "../../components/ValidationError.vue";
export default {
  components: { CustomButton, Multiselect, ValidationError },
  layout: "auth",
  middleware: ["guest", "select"],
  data() {
    return {
      form: this.$vform(this.getForm()),
      loading: false,
      disabled: false,
      selectResidence: {
        id: "94af03be-3ee9-4560-a35f-d60801dc5a0b",
        name: "South Africa",
      },
      passwordType: "password",
      passwordTypeConfirm: "password",
      stage: false,
      stageConfirm: false,
      phoneResult: null,
      phone_number: "",
      validationKeys: {
        phone_number: {
          error: false,
          message: "",
        },
        residence_country: {
          error: false,
          message: "",
        },
        passport_number: {
          error: false,
          message: "",
        },
        password: {
          error: false,
          message: "",
        },
        confirm_password: {
          error: false,
          message: "",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  methods: {
    customFormatter(date) {
      return moment(date).format("Y-m-d");
    },
    getForm() {
      return {
        residence_country: "",
        phone_number: "",
        passport_number: "",
        password: "",
        confirm_password: "",
      };
    },

    togglePasswordRegister(stage) {
      this.stage = !this.stage;
      this.passwordType = this.stage ? "text" : "password";
    },

    togglePasswordRegisterConfirm(stageConfirm) {
      this.stageConfirm = !this.stageConfirm;
      this.passwordTypeConfirm = this.stageConfirm ? "text" : "password";
    },

    async processRegister() {
      this.loading = true;
      this.disabled = true;
      this.form.residence_country = this.selectResidence.id;
      this.form.phone_number = {
        phone_number: this.phone_number,
        country_code: this.phoneResult.countryCode,
        phone_code: this.phoneResult.countryCallingCode,
      };
      await this.form
        .post("/students/register")
        .then((res) => {
          this.stopLoader();
          this.form = this.getForm();
          this.proceed(res.data.data);
        })
        .catch((error) => {
          this.stopLoader();
          // handleError(error);
          if (error.response.status === 422) {
            for (var validationKey in error.response.data.errors) {
              error.response.data.errors[validationKey].forEach(
                (validationElement) => {
                  for (var key in this.validationKeys) {
                    if (key == validationKey) {
                      console.log(this.validationKeys[validationKey]);
                      this.validationKeys[validationKey].error = true;
                      this.validationKeys[validationKey].message =
                        validationElement;
                    }
                  }
                }
              );
            }
          }
          // handleError(error);
        });
    },

    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },

    proceed(data) {
      const student_id = data.profile.passport_number;
      if (data && data.should_verify) {
        this.$router.push({
          path: `/auth/idverify/${student_id}`,
          params: {
            student_id: student_id,
          },
        });
      } else {
        notify("Registration successful, please sign in", "success");
        this.$router.push("/auth/login");
      }
      // if (data && data.should_verify) {
      //   notify(
      //     "Registration successful, please verify your telephone number",
      //     "success"
      //   );
      //   this.$router.push(`/auth/verify/${data.id}`);
      // } else {
      //   notify("Registration successful, please sign in", "success");
      //   this.$router.push("/auth/login");
      // }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
* {
  font-family: "Inter", sans-serif;
}
.text-gradient.text-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545);
}
.bg-gradient-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545 100%);
}
.error-validation {
  color: #dc3545;
  font-size: small;
  font-weight: bold;
  margin-top: 2px;
  margin-bottom: 10px;
}

label {
  color: #00473e;
}

.field-icon {
  float: right;
  margin-left: -28px;
  margin-top: -28px;
  position: relative;
  z-index: 2;
}
</style>
