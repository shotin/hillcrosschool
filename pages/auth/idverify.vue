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
              <h5 class="mb-3" style="color: #dc3545">ID verification</h5>
              <label style="color: #00473e"> Is your ID Number correct?</label>
            </div>
            <div class="card-body">
              <form role="form" @submit.prevent="processRegisterPassport()">
                <div class="mb-3">
                  <label for="" style="color: #00473e">
                    ID/Passport Number <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.student_id"
                    aria-label="Passport Number"
                    :readonly="isInputDisabled"
                    required
                  />
                </div>

                <div class="text-center d-flex app__correct">
                  <div class="text-center w-100">
                    <p
                      style="cursor: pointer"
                      class="btn btn-outline-danger mt-4 mb-0"
                      @click="handleEditClick"
                    >
                      No, Correct it
                    </p>
                  </div>
                  <div class="text-center w-100">
                    <custom-button
                      :name="`Yes, Proceed `"
                      :type="`submit`"
                      style="background: #006b5d"
                      :custom-class="`btn btn-success mt-4 mb-0`"
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
export default {
  components: { CustomButton },
  layout: "auth",
  props: {
    passport_id: {
      required: true,
      type: String,
    },
  },

  beforeRouteEnter(to, from, next) {
    const passport_id = to.params.passport_id || "";
    next((vm) => {
      vm.form.passport_id = passport_id;
    });
  },

  mounted() {
    this.$axios
      .get(`/students/records/${this.$route.params.passport_id}`)
      .then((res) => {
        this.user = res.data.data;
        this.form.student_id = res.data.data.profile.passport_number;
      })
      .catch((err) => {});
  },
  data() {
    return {
      // form: this.getForm(),
      user: null,
      form: {
        passport_id: "",
        student_id: ""
      },
      isInputDisabled: true,
    };
  },
  methods: {
    getForm() {
      return {
        passport_id: "",
      };
    },
    handleEditClick() {
      this.isInputDisabled = false;
    },
    processRegisterPassport() {
      // let data;
      this.form.id = this.user.id;
      this.$axios
        .patch(`students/passport-number/${this.form.id}`, this.form)
        .then((res) => {
          this.form = this.getForm();
          this.proceed(res.data.data);
        })
        .catch((err) => {
          handleError(err);
        });
    },
    proceed(data) {
      if (data && data.should_verify) {
        notify(
          "Registration successful, please verify your telephone number",
          "success"
        );
        this.$router.push(`/auth/verify/${data.id}`);
      } else {
        notify("Registration successful, please sign in", "success");
        this.$router.push("/auth/login");
      }
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

@media (min-width: 1000px) {
  .app__correct {
    display: flex !important;
  }
}

@media (max-width: 750px) {
 .app__correct button {
  width: 90%!important;
  font-size: 9px;
 }
}
</style>
