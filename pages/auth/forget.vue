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
              <h5 style="color: #dc3545; font-weight:bolder">Forgot Password</h5>
              <p style="color: #006B5D; font-weight:bolder">Enter your cellphone number to reset your password</p>
            </div>
            <div class="card-body">
              <form
                role="form text-left"
                @submit.prevent="processForgetPassword()"
              >
                <div class="mb-1 app__cellphone">
                  <label for=""
                    >Cellphone Number <span class="text-danger">*</span></label
                  >
                  <!-- <input
                    type="text"
                    v-model="form.student_id"
                    class="form-control"
                    placeholder="Enter your Student ID"
                    aria-label="Email"
                    aria-describedby="email-addon"
                  /> -->
                   <vue-phone-number-input
                    v-model="form.phone_number"
                    :default-country-code="`ZA`"
                    :required="true"
                    @update="phoneResult = $event"
                  />
                  <!-- <validation-error
                    :message="validationKeys.phone_number.message"
                    :showError="validationKeys.phone_number.error"
                  /> -->
                </div>
                <div class="text-center">
                  <div class="text-center">
                    <custom-button
                      :name="`Get verification code`"
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
        phone_number: ""
      };
    },

    async processForgetPassword() {
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .post("/students/forget-password", this.form)
        .then(res => {
          this.stopLoader();
          this.form = this.getForm();
          notify("We have sent an OTP to your registered phone number", "success");
          this.$router.push("/auth/password/reset");
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

.app__cellphone {
  margin-top: -30px;
}
</style>
