<template>
  <section class="min-vh-100 mb-8">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="background-image: url('../../assets/img/Hillcross-student.jpeg')"
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
        <div class="col-xl-5 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5 style="color: #dc3545">Enter Verification code</h5>
            </div>
            <div class="card-body">
              <form role="form" @submit.prevent="processVerify()" v-if="user">
                <div class="mb-3 text-center">
                  <label for="" style="color: #00473e"
                    >Enter the otp sent to your registered cellphone number
                    <span class="text-danger">*</span></label
                  >
                  
                  <div class="otp-container">
                    <input
                      v-for="(digit, index) in otpDigits"
                      :key="index"
                      ref="otpInput"
                      v-model="otpDigits[index]"
                      @input="handleInput(index, $event)"
                      class="form-control otp-input"
                      maxlength="1"
                    />
                  </div>
                </div>
                 
                <div class="text-center">
                  <label>
                    Didn’t receive the code?
                    <a  @click="resendOTP" class="text-danger" style="cursor: pointer"
                      >Send again</a
                    ></label
                  >
                </div>
                <div class="text-center">
                  <div class="text-center">
                    <custom-button
                      :name="`START APPLICATION PROCESS`"
                      :type="`submit`"
                      :loading="loading"
                      :disabled="disabled"
                    />
                  </div>
                </div>
              </form>
              <loader v-else />
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Loader from "../../components/Loader.vue";
export default {
  components: { CustomButton, Multiselect, Loader },
  layout: "auth",
  middleware: ["guest"],
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      user: null,
      otpDigits: ["", "", "", "", "", ""],
    };
  },
  mounted() {
    this.$axios
      .get(`/students/records/${this.$route.params.id}`)
      .then((res) => {
        this.user = res.data.data;
        // console.log(res.data.data);
      })
      .catch((err) => {});
  },
  methods: {
    getForm() {
      return {
        otp: "",
      };
    },

    handleInput(index, event) {
      const input = event.target;
      if (event.data === null && index > 0) {
        this.otpDigits[index] = ""; // Clear the digit
        this.$refs.otpInput[index - 1].focus(); // Focus on the previous input
      } else if (index < this.otpDigits.length - 1 && this.otpDigits[index]) {
        this.$refs.otpInput[index + 1].focus(); // Focus on the next input
      }
    },

    async processVerify() {
      let data;
      this.loading = true;
      this.disabled = true;
      this.form.otp = this.otpDigits.join(""); // Combine OTP digits into a single string
      this.form.student_id = this.user.student_id;
      await this.$axios
        .post("/students/otp/verify", this.form)
        .then((res) => {
          this.stopLoader();
          // this.form = this.getForm();
          this.otpDigits = this.getForm().otp.split(""); // Clear OTP digits after successful verification
          notify(
            "Your verification is successful, please login with your ID and PASSWORD",
            "success"
          );
          this.$router.push("/auth/login");
        })
        .catch((err) => {
          this.stopLoader();
          notify("Invalid OTP");
        });
    },

    async resendOTP() {
    this.loading = true; // Set loading state while sending OTP
    
    try {
      // Make an API request to resend OTP
      await this.$axios.post(`/students/resend-otp/${this.user.id}`);
      notify("OTP resent successfully.", "success");
    } catch (error) {
      notify("Failed to resend OTP.", "error");
    } finally {
      this.loading = false; // Reset loading state
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

/* .otp-input {
  width: 2em;
  text-align: center;
  margin: 0 0.5em;
  display: flex;
} */

.otp-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* Add styling for otp-input class as needed */
.otp-input {
  width: 3.3em;
  text-align: center;
  border-radius: 0 !important;
  background: #d9d9d9;
  margin: 0 0.3em;
}

@media (max-width: 1200px) {
  .otp-container input {
    width: 22%;
    height: 3%;
  }
}
</style>
