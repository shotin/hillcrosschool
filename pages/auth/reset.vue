<template>
  <section class="min-vh-100 mb-8">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="background-image: url('../../assets/img/Hillcross-student.jpeg');"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Hillcross College!</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5 style="color: #dc3545;">Reset Password</h5>
            </div>
            <div class="card-body">
              <form
                role="form text-left"
                @submit.prevent="processResetPassword()"
              >
                <div class="mb-3">
                  <label for=""
                    >OTP <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    v-model="form.otp"
                    class="form-control"
                    placeholder="Enter the OTP sent to your telephone number"
                    aria-label="Email"
                    aria-describedby="email-addon"
                  />
                </div>
                <div class="mb-3">
                  <label for=""
                    >Password <span class="text-danger">*</span></label
                  >
                  <input
                    type="password"
                    v-model="form.password"
                    class="form-control"
                    placeholder="Enter your new password"
                    aria-label="Email"
                    aria-describedby="email-addon"
                  />
                </div>
                <div class="mb-3">
                  <label for=""
                    >Confirm Password <span class="text-danger">*</span></label
                  >
                  <input
                    type="password"
                    v-model="form.re_password"
                    class="form-control"
                    placeholder="Confirm your password"
                    aria-label="Email"
                    aria-describedby="email-addon"
                  />
                </div>
                <div class="text-center">
                  <div class="text-center">
                    <custom-button
                      :name="`Reset`"
                      :type="`submit`"
                      :loading="loading"
                      :disabled="disabled"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import CustomButton from "../../components/Button.vue";
import { handleError, notify } from "@/assets/js/utility";
import Loader from "../../components/Loader.vue";
export default {
  components: { CustomButton, Loader },
  layout: "auth",
  middleware: ["guest"],
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
    };
  },
  methods: {
    getForm() {
      return {
        otp: "",
        password: "",
        re_password: ""
      };
    },

    async processResetPassword() {
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .post("/students/reset-password", this.form)
        .then(res => {
          this.stopLoader();
          this.form = this.getForm();
          notify("Password reset successfully", "success");
          this.$router.push("/auth/login");
        })
        .catch(err => {
          this.stopLoader();
          handleError(err);
        });
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    }
  }
};
</script>
<style>
.text-gradient.text-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545);
}
.bg-gradient-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545 100%);
}
</style>
