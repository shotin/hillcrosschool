<template>
  <section class="min-vh-100 mb-8">
    <div class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="background-image: url('../../assets/img/Hillcross-student.jpeg')">
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
              <!-- @submit.prevent="processRegisterPassport()" -->
              <form role="form" @submit.prevent="processRegisterPassport()">
                <div class="mb-3">
                  <label for="" style="color: #00473e">
                    ID/Passport Number <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control"  v-model="form.student_id" aria-label="Passport Number"
                    :disabled="isInputDisabled" required />
                </div>

                <div class="text-center app__correct">
                  <div class="text-center">
                    <input style="cursor: pointer" value="No, Correct it" class="btn btn-outline-danger mt-4 mb-0 w-75"
                      @click="handleEditClick" />
                  </div>
                  <div class="text-center w-50">
                    <custom-button :name="`Yes, Proceed `" :type="`submit`" style="background: #006b5d"
                      :custom-class="`btn btn-success mt-4 mb-0`" />
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
    student_id: {
      required: true,
      type: String,
    },
  },

  beforeRouteEnter(to, from, next) {
    const student_id = to.params.student_id || "";
    next((vm) => {
      vm.form.student_id = student_id;
    });
  },
  data() {
    return {
      form: this.getForm(),
      isInputDisabled: true,
    };
  },
  methods: {
    getForm() {
      return {
        student_id: "",
        // new_student_id: ""
      };
    },
    handleEditClick() {
      this.isInputDisabled = false;
    },
    processRegisterPassport() {
      let data;
      this.$axios
        .post(`students/passport-number`, this.form)
        .then((res) => {
          data = res.data;
          this.form = this.getForm();
          notify("Registration successful, please verify your telephone number", "success");
          this.$router.push(`/auth/verify/${data.data.id}`);
        })
        .catch((err) => {
          handleError(err);
        });
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

@media(min-width: 1000px){
  .app__correct {
    display: flex!important;
  }
}

@media(max-width: 750px){
.app__correct button {
    width: 130%;
    text-align: center;
    margin-left: 50px;
  }
}
</style>
