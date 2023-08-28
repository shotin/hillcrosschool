<template>
  <div class="accordion-item mt-1">
    <div class="card accordion-custom">
      <div class="card-body p-1" style="height: 73px !important">
        <h2 class="accordion-header accordion-custom" id="educationHistory">
          <button
            :class="`accordion-button ${collapse}`"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseEducationHistory"
            :aria-expanded="`${expand}`"
            aria-controls="collapseEducationHistory"
            style="color: #006b5d; font-weight: bolder"
          >
            Education History
          </button>
        </h2>
        <span v-if="hasPersonalInformationValidationError">
          <p class="text-left custom-summary" style="color: #006b5d; font-weight: bolder;">
            Fields marked with asterisk(<span class="text-danger">*</span>) must
            be filled before advancing to the next page!
          </p>
          <svg
            width="25"
            height="25"
            viewBox="0 0 36 36"
            fill="none"
            class="svg-close"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.096 12.4734C24.096 12.3187 23.9694 12.1921 23.8147 12.1921L21.4944 12.2027L17.9999 16.3687L14.5089 12.2062L12.1851 12.1957C12.0304 12.1957 11.9038 12.3187 11.9038 12.4769C11.9038 12.5437 11.9284 12.607 11.9706 12.6597L16.5444 18.1089L11.9706 23.5546C11.9281 23.6062 11.9046 23.6707 11.9038 23.7375C11.9038 23.8921 12.0304 24.0187 12.1851 24.0187L14.5089 24.0082L17.9999 19.8421L21.4909 24.0046L23.8112 24.0152C23.9659 24.0152 24.0925 23.8921 24.0925 23.7339C24.0925 23.6671 24.0679 23.6039 24.0257 23.5511L19.4589 18.1054L24.0327 12.6562C24.0749 12.607 24.096 12.5402 24.096 12.4734Z"
              fill="#EC1B22"
            />
            <path
              d="M18 2.28516C9.30234 2.28516 2.25 9.3375 2.25 18.0352C2.25 26.7328 9.30234 33.7852 18 33.7852C26.6977 33.7852 33.75 26.7328 33.75 18.0352C33.75 9.3375 26.6977 2.28516 18 2.28516ZM18 31.1133C10.7789 31.1133 4.92188 25.2563 4.92188 18.0352C4.92188 10.8141 10.7789 4.95703 18 4.95703C25.2211 4.95703 31.0781 10.8141 31.0781 18.0352C31.0781 25.2563 25.2211 31.1133 18 31.1133Z"
              fill="#EC1B22"
            />
          </svg>
        </span>
        <span
          v-else-if="
            user.registered_stages.includes('education-history') &&
            !hasPersonalInformationValidationError
          "
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 36 36"
            fill="none"
            class="svg-marked"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.5742 12.4102H22.9253C22.5668 12.4102 22.2257 12.5824 22.0148 12.8777L16.4882 20.5418L13.9851 17.0684C13.7742 16.7766 13.4367 16.6008 13.0746 16.6008H11.4257C11.1972 16.6008 11.0636 16.8609 11.1972 17.0473L15.5777 23.1223C15.6812 23.2667 15.8176 23.3844 15.9756 23.4656C16.1337 23.5468 16.3088 23.5891 16.4865 23.5891C16.6642 23.5891 16.8393 23.5468 16.9973 23.4656C17.1554 23.3844 17.2918 23.2667 17.3953 23.1223L24.7992 12.8566C24.9363 12.6703 24.8027 12.4102 24.5742 12.4102Z"
              fill="#006B5D"
            />
            <path
              d="M18 2.25C9.30234 2.25 2.25 9.30234 2.25 18C2.25 26.6977 9.30234 33.75 18 33.75C26.6977 33.75 33.75 26.6977 33.75 18C33.75 9.30234 26.6977 2.25 18 2.25ZM18 31.0781C10.7789 31.0781 4.92188 25.2211 4.92188 18C4.92188 10.7789 10.7789 4.92188 18 4.92188C25.2211 4.92188 31.0781 10.7789 31.0781 18C31.0781 25.2211 25.2211 31.0781 18 31.0781Z"
              fill="#006B5D"
            />
          </svg>
        </span>
      </div>
    </div>
    <div
      v-if="load"
      id="collapseEducationHistory"
      :class="`accordion-collapse collapse ${show}`"
      aria-labelledby="educationHistory"
      data-bs-parent="#accordionExample"
    >
      <div class="card accordion-custom" style="margin-top: 5px">
        <div class="card-body p-1" v-if="user">
          <form role="form" @submit.prevent="processEducationHistory()">
            <div class="row">
              <div class="col-lg-6 app__personal-info" style="margin-left: 2%; width: 48%">
                <div class="d-flex flex-column h-100">
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Name of High School
                      <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.school_name"
                      class="form-control"
                      placeholder="Name of High School"
                      aria-label="FirstName"
                      aria-describedby="first_name-addon"
                      required
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.school_name.message"
                    :showError="validationKeys.school_name.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Matriculation Year
                      <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.matriculation_year"
                      class="form-control"
                      id=""
                      required
                      :disabled="user.next_stage === 'end'"
                    >
                      <option value="">Select Matriculation Year</option>
                      <option
                        :value="year.toString()"
                        v-for="(year, index) in years"
                        :key="index"
                      >
                        {{ year }}
                      </option>
                    </select>
                  </div>
                  <validation-error
                    :message="validationKeys.matriculation_year.message"
                    :showError="validationKeys.matriculation_year.error"
                  />
                  <!-- <div class="mb-3" v-if="!is_base">
                    <label class="custom-text" for=""
                      >Matriculation Result Status
                      <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.matriculation_status"
                      class="form-control"
                      id=""
                      required
                      :disabled="user.next_stage === 'end'"
                    >
                      <option value="">Select Matriculation Status</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Higher Certificate">
                        Higher Certificate
                      </option>
                      <option v-if="!is_base" value="Currently in Matric">
                        Currently in Matric
                      </option>
                      <option value="No Matric">No Matric</option>
                      <option value="Failed Matric">Failed Matric</option>
                    </select>
                  </div> -->
                  <!-- <validation-error
                    :message="validationKeys.matriculation_status.message"
                    :showError="validationKeys.matriculation_status.error"
                  /> -->
                  <div class="mb-3" v-if="!is_base && !has_failed">
                    <label class="custom-text" for=""
                      >Have you studied beyond Matric?
                      <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.has_studied_beyond_matric"
                      class="form-control"
                      id=""
                      :disabled="user.next_stage === 'end'"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                class="row"
                v-if="!studied_beyond_matric && !is_base && !has_failed"
              >
                <div class="col-md-12 col-sm-12" style="margin-left: 2%; width: 98%">
                  <p>Post Matric Education Record</p>
                  <div class="form-group">
                    <div
                      class="row"
                      v-for="(data, index) in form.institution_object"
                      :key="index"
                    >
                      <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                          <label class="custom-text"
                            >Institution Attended</label
                          >
                          <input
                            type="text"
                            required
                            v-model="data.institution"
                            class="form-control"
                            :disabled="user.next_stage === 'end'"
                          />
                        </div>
                      </div>
                      <div class="col-md-3 col-sm-12">
                        <div class="form-group">
                          <label class="custom-text"
                            >Qualification Obtained</label
                          >
                          <input
                            type="text"
                            required
                            v-model="data.qualification"
                            class="form-control"
                            :disabled="user.next_stage === 'end'"
                          />
                        </div>
                      </div>
                      <div
                        class="ms-auto col-md-5 mt-4"
                        v-if="user.next_stage != 'end'"
                      >
                        <button
                          type="button"
                          class="btn btn-link text-success text-sm mb-0 px-3"
                          title="Add More"
                          v-if="index + 1 === form.institution_object.length"
                          @click="addRow()"
                        >
                          <i class="fas fa-plus text-lg me-1"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-link text-danger text-sm mb-0 px-3"
                          title="Remove"
                          v-if="index > 0"
                          @click="deleteRow(index)"
                        >
                          <i class="fas fa-minus text-lg me-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p><br /></p>
            <div
              class="side-by-side-button w-200"
              style="margin-left: 34%; margin-right: 35%; margin-top: -20px"
              v-if="user.next_stage != 'end'"
            >
              <nuxt-link
                to="/sponsor-information"
                class="btn"
                style="
                  background-color: #ffffff;
                  color: #006b5d;
                  text-transform: none;
                  border: 1px solid #006b5d;
                "
                >Go to previous form</nuxt-link
              >
              <custom-button
                :name="`Proceed to next page`"
                :type="`submit`"
                :customClass="`btn w-200`"
                :loading="loading"
                :disabled="disabled"
                style="
                  background-color: #006b5d;
                  color: #ffffff;
                  text-transform: none;
                "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { handleError, notify } from "../../assets/js/utility";
import CustomButton from "@/components/Button.vue";
export default {
  props: {
    load: {
      required: true,
      type: Boolean,
    },
    collapse: {
      required: true,
      type: String,
    },
    expand: {
      required: true,
      type: String,
    },
    show: {
      required: true,
      type: String,
    },
  },
  mounted() {
    if (!this.form.institution_object.length) {
      this.addRow();
    }
  },
  components: {
    CustomButton,
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      years: this.getYears(),
      is_base: false,
      has_failed: false,
      studied_beyond_matric: false,
      hasPersonalInformationValidationError: false,
      validationKeys: {
        school_name: {
          error: false,
          message: "",
        },
        matriculation_year: {
          error: false,
          message: "",
        },
        // matriculation_status: {
        //   error: false,
        //   message: "",
        // }
      },
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      select: "select/select",
    }),
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        this.form.school_name = newVal.education
          ? newVal.education.school_name
          : "";
        // this.form.matriculation_status = newVal.education
        //   ? newVal.education.matriculation_status
        //   : "";
        this.form.matriculation_year = newVal.education
          ? newVal.education.matriculation_year
          : "";
        this.form.has_studied_beyond_matric = newVal.education
          ? newVal.education.has_studied_beyond_matric
          : "";
        if (newVal.education && newVal.education.institution_object.length) {
          _.map(newVal.education.institution_object, (value) => {
            this.form.institution_object.push({
              institution: value.institution,
              qualification: value.qualification,
            });
          });
        }
      },
      immediate: true,
      deep: true,
    },
    "form.matriculation_year": {
      handler(newVal, oldVal) {
        if (newVal === moment().format("Y")) {
          this.is_base = true;
        } else {
          this.is_base = false;
        }
      },
      immediate: true,
      deep: true,
    },
    // "form.matriculation_status": {
    //   handler(newVal, oldVal) {
    //     if (newVal === "Failed Matric") {
    //       this.has_failed = true;
    //     } else {
    //       this.has_failed = false;
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
    "form.has_studied_beyond_matric": {
      handler(newVal, oldVal) {
        if (newVal === "No") {
          this.studied_beyond_matric = true;
        } else {
          this.studied_beyond_matric = false;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async processEducationHistory() {
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .post("/students/education-histories", this.form)
        .then((res) => {
          this.stopLoader();
          notify("Education history updated successfully", "success");
          this.$store.commit("auth/UPDATE_USER_INFO", res.data.data);
          this.$router.push("/qualification-information");
        })
        .catch((error) => {
          this.stopLoader();
          if (error.response.status === 422) {
            this.hasPersonalInformationValidationError = true;
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
    },
    getYears() {
      var currentYear = new Date().getFullYear();
      let years = [];
      let startYear = 1970;
      while (startYear <= currentYear) {
        years.push(startYear++);
      }
      return years;
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    addRow() {
      if (this.form.institution_object.length < 3) {
        this.form.institution_object.push({
          institution: "",
          qualification: "",
        });
      }
    },
    deleteRow(index) {
      this.form.institution_object.splice(index, 1);
    },
    getForm() {
      return {
        school_name: "",
        matriculation_year: "",
        // matriculation_status: "",
        has_studied_beyond_matric: "Yes",
        institution_object: [],
      };
    },
  },
};
</script>
<style>
.accordion-custom {
  border-radius: 5px;
  margin: 1px 2px 1px 2px;
}
</style>
