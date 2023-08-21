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
              <h5 style="color: #dc3545; font-weight: bolder">Welcome Back</h5>
              <p class="mb-0" style="color: #006b5d">
                Enter your email and password to sign in
              </p>
            </div>
            <div class="card-body">
              <form role="form" @submit.prevent="processLogin()">
                <label>ID/Passport/Cellphone number</label>
                <div class="mb-3">
                  <input
                    type="text"
                    v-model="form.student_id"
                    class="form-control"
                    placeholder="Enter ID or Passport or Cell Phone Number"
                    aria-label="Email"
                    required
                    aria-describedby="email-addon"
                  />
                </div>
                <validation-error
                  :message="validationKeys.student_id.message"
                  :showError="validationKeys.student_id.error"
                />
                <label>Password</label>
                <div class="mb-3">
                  <input
                    :type="passwordType"
                    v-model="form.password"
                    class="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    required
                    aria-describedby="password-addon"
                  />
                  <i
                    class="fa field-icon toggle-password"
                    :class="[stage ? 'fa-eye' : 'fa-eye-slash']"
                    @click="togglePassword(stage)"
                    id="togglePassword"
                    style="cursor: pointer"
                  ></i>
                </div>
                <validation-error
                  :message="validationKeys.password.message"
                  :showError="validationKeys.password.error"
                />
                <div class="form-check form-switch remember_me">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    v-model="form.remember_me"
                  />
                  <label  style="color: #00473e; font-weight: bolder" class="form-check-label" for="rememberMe"
                    >Remember me</label
                  >

                  <p
                    class="mb-4 text-sm mx-auto"
                    style="color: #00473e; font-weight: bolder"
                  >
                    Forgot your password?
                    <nuxt-link
                      to="/auth/password/forget"
                      class="text-info text-gradient font-weight-bold"
                      >Click here</nuxt-link
                    >
                  </p>
                </div>
                <div class="text-center">
                  <custom-button
                    :name="`START APPLICATION PROCESS`"
                    :type="`submit`"
                    :loading="loading"
                    :disabled="disabled"
                  />
                </div>
              </form>
            </div>
            <div class="card-footer text-left pt-0">
              <p class="mb-4 text-sm mx-auto"  style="color: #00473e; font-weight: bolder">
                New application?
                <nuxt-link
                style="text-decoration:underline"
                  to="/auth/register"
                  class="text-info text-gradient font-weight-bold"
                  >Click here</nuxt-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import CustomButton from "../../components/Button.vue";
import { handleError } from "@/assets/js/utility";
import ValidationError from "../../components/ValidationError.vue";
export default {
  components: { CustomButton, ValidationError },
  layout: "auth",
  middleware: "guest",
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      passwordType: "password",
      stage: false,
      validationKeys: {
        student_id: {
          error: false,
          message: "",
        },
        password: {
          error: false,
          message: "",
        },
      },
    };
  },
  methods: {
    getForm() {
      return {
        student_id: "",
        password: "",
        remember_me: false,
      };
    },

    togglePassword(stage) {
      if (stage === false) {
        this.stage = true;
        this.passwordType = "text";
      } else {
        this.stage = false;
        this.passwordType = "password";
      }
    },

    async processLogin() {
      let data;
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .post("/students/login", this.form)
        .then((res) => {
          data = res.data;
          this.stopLoader();
          this.form = this.getForm();
        })
        .catch((error) => {
          this.stopLoader();
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
          } else {
            handleError(error);
          }
        });
      if (!data) return;
      if (data.data && data.data.should_verify) {
        this.$router.push(`/auth/verify/${data.data.id}`);
      } else {
        // Save the token.
        await this.$store.dispatch("auth/saveToken", {
          token: data.access_token,
          remember: Date.parse(data.expires_at),
        });
        // Redirect home.
        this.$router.push("/auth/callback");
      }
    },

    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
  },
};
</script>
<style>
.text-gradient.text-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545);
}
.bg-gradient-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545 100%);
}
.validation-error {
  color: red;
  font-size: 12px;
  font-style: italic;
}
.field-icon {
  float: right;
  margin-left: -28px;
  margin-top: -28px;
  position: relative;
  z-index: 2;
}

@media (min-width: 1200px) {
  .remember_me {
    display: flex !important;
    justify-content: space-between !important;
  }
}
</style>
