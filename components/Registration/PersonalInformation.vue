<template>
  <div class="accordion-item">
    <div class="card accordion-custom">
      <div class="card-body p-1" style="height: 73px !important">
        <h2 class="accordion-header accordion-custom" id="personalInformation">
          <button
            :class="`accordion-button ${collapse}`"
            type="button"
            id="button-personal-information"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePersonalInformation"
            :aria-expanded="`${expand}`"
            aria-controls="collapsePersonalInformation"
            style="color: #006b5d; font-weight: bolder"
          >
            Personal Information
          </button>
        </h2>
        <span v-if="hasPersonalInformationValidationError">
          <p
            class="text-left custom-summary"
            style="color: #006b5d; font-weight: bolder"
          >
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
            user.registered_stages.includes('personal-details') &&
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
      id="collapsePersonalInformation"
      :class="`accordion-collapse collapse ${show}`"
      aria-labelledby="personalInformation"
      data-bs-parent="#accordionExample"
    >
      <div class="card accordion-custom" style="margin-top: 5px">
        <div class="card-body p-1">
          <form role="form" @submit.prevent="processPersonalInformation()">
            <div class="row">
              <div class="col-lg-6 app__personal-info" style="margin-left: 2%; width: 48%">
                <div class="d-flex flex-column h-100">
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Title <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.title"
                      class="form-control"
                      id=""
                      :disabled="user.next_stage === 'end'"
                    >
                      <option value="">Select Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                    </select>
                  </div>
                  <validation-error
                    :message="validationKeys.title.message"
                    :showError="validationKeys.title.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >First Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.first_name"
                      class="form-control"
                      placeholder="First Name"
                      aria-label="FirstName"
                      aria-describedby="first_name-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.first_name.message"
                    :showError="validationKeys.first_name.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for="">Other Name </label>
                    <input
                      type="text"
                      v-model="form.other_name"
                      class="form-control"
                      placeholder="Other Name"
                      aria-label="OtherName"
                      aria-describedby="other_name-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="">DOB <span class="text-danger">*</span></label>
                    <date-picker
                      :minimumView="'day'"
                      :maximumView="'month'"
                      :initialView="'month'"
                      input-class="form-control"
                      v-model="form.dob"
                      :typeable="true"
                    ></date-picker>
                  </div>
                  <div class="mb-3">
                    <label class="custom-text" for="">Country </label>
                    <!-- <input
                      type="text"
                      class="form-control"
                      placeholder="Nationality"
                      aria-label="OtherName"
                      aria-describedby="other_name-addon"
                    /> -->
                    <multiselect
                      v-model="selectCountry"
                      :options="select.countries"
                      track-by="id"
                      label="name"
                      required
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      placeholder="Select Country"
                      :disabled="user.next_stage === 'end'"
                    >
                    </multiselect>
                    <validation-error
                    :message="validationKeys.country_id.message"
                    :showError="validationKeys.country_id.error"
                  />
                  </div>
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Home Language <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.home_language"
                      class="form-control"
                      id=""
                      :disabled="user.next_stage === 'end'"
                    >
                      <option value="">Select Home Language</option>
                      <option
                        :value="language"
                        v-for="(language, index) in homeLanguages"
                        :key="index"
                      >
                        {{ language }}
                      </option>
                    </select>
                  </div>
                  <validation-error
                    :message="validationKeys.home_language.message"
                    :showError="validationKeys.home_language.error"
                  />
                </div>
              </div>
              <div class="col-lg-6 app__personal-info_" style="margin-right: 2%; width: 48%">
                <div class="d-flex flex-column h-100">
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Gender <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.gender"
                      class="form-control"
                      id=""
                      :disabled="user.next_stage === 'end'"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <validation-error
                    :message="validationKeys.gender.message"
                    :showError="validationKeys.gender.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Surname <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.last_name"
                      class="form-control"
                      placeholder="Surname"
                      aria-label="Surname"
                      aria-describedby="surname-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.last_name.message"
                    :showError="validationKeys.last_name.error"
                  />
                  <!-- <div class="mb-3">
                    <label class="custom-text" for="">Maiden Name </label>
                    <input
                      type="text"
                      v-model="form.maiden_name"
                      class="form-control"
                      placeholder="Maiden Name if applicable"
                      aria-label="Maidenname"
                      aria-describedby="maiden_name-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div> -->
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Race <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.race"
                      class="form-control"
                      id=""
                      :disabled="user.next_stage === 'end'"
                    >
                      <option value="">Select Race</option>
                      <option value="Black">Black</option>
                      <option value="Coloured">Coloured</option>
                      <option value="Indian">Indian</option>
                      <option value="White">White</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <validation-error
                    :message="validationKeys.race.message"
                    :showError="validationKeys.race.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >ID/Passport Number
                    </label>
                    <input
                      type="text"
                      v-model="user.student_id"
                      class="form-control"
                      placeholder="Passport Number"
                      aria-label="OtherName"
                      aria-describedby="other_name-addon"
                      disabled
                    />
                  </div>
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Do you have any disability
                      <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.disability"
                      class="form-control"
                      id=""
                      :disabled="user.next_stage === 'end'"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <validation-error
                    :message="validationKeys.disability.message"
                    :showError="validationKeys.disability.error"
                  />
                </div>
              </div>
            </div>
            <p><br /></p>
            <div
              class="side-by-side-button w-200"
              style="margin-left: 40%; margin-right: 40%; margin-top: -20px"
              v-if="user.next_stage != 'end'"
            >
              <nuxt-link
                to="/"
                class="btn"
                style="
                  background-color: #006b5d;
                  color: #ffffff;
                  text-transform: none;
                "
                v-if="user.admission_status === 'Admitted'"
                >Back</nuxt-link
              >
              <custom-button
                :name="`Proceed to next page`"
                :type="`submit`"
                :customClass="`btn mt-1`"
                :loading="loading"
                :disabled="disabled"
                style="
                  background-color: #006b5d;
                  color: #ffffff;
                  text-transform: none;
                "
                class="app__personal-btn"
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
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
  components: {
    CustomButton,
    Multiselect,
  },
  data() {
    return {
      homeLanguages: [
        "Afrikaans",
        "English",
        "IsiNdebele",
        "IsiXhosa",
        "IsiZulu",
        "Sepedi/N Sotho",
        "Sesotho",
        "SeTswana",
        "SiSwati",
        "TshiVenda",
        "XiTsonga",
        "Other",
      ],
      form: this.getForm(),
      loading: false,
      disabled: false,
      selectCountry: "",
      hasPersonalInformationValidationError: false,
      validationKeys: {
        title: {
          error: false,
          message: "",
        },
        dob: {
          error: false,
          message: "",
        },
        // title: {
        //   error: false,
        //   message: "",
        // },
        gender: {
          error: false,
          message: "",
        },
        country_id: {
          error: false,
          message: "",
        },
        first_name: {
          error: false,
          message: "",
        },
        last_name: {
          error: false,
          message: "",
        },
        home_language: {
          error: false,
          message: "",
        },
        race: {
          error: false,
          message: "",
        },
        disability: {
          error: false,
          message: "",
        },
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
        (this.form.first_name = newVal ? newVal.first_name : ""),
          (this.form.last_name = newVal ? newVal.last_name : ""),
          (this.form.title = newVal.profile
            ? newVal.profile.title
              ? newVal.profile.title
              : ""
            : "");
        this.form.gender = newVal.profile
          ? newVal.profile.gender
            ? newVal.profile.gender
            : ""
          : "";
        this.form.other_name = newVal.profile ? newVal.profile.other_name : "";
        this.form.dob = newVal.profile ? newVal.profile.dob : "";
        this.selectCountry = newVal.address ? newVal.address.country : "";
        this.form.race = newVal.profile
          ? newVal.profile.race
            ? newVal.profile.race
            : ""
          : "";
        this.form.home_language = newVal.profile
          ? newVal.profile.home_language
            ? newVal.profile.home_language
            : ""
          : "";
        this.form.disability = newVal.profile
          ? newVal.profile.have_disability
            ? "Yes"
            : "No"
          : "";
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async processPersonalInformation() {
      this.loading = true;
      this.disabled = true;
      if (this.selectCountry) {
        this.form.country_id = this.selectCountry.id;
      }
      await this.$axios
        .post("/students/personal-details", this.form)
        .then((res) => {
          this.stopLoader();
          notify("Personal details updated successfully", "success");
          this.$store.commit("auth/UPDATE_USER_INFO", res.data.data);
          this.$router.push("/contact-details");
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
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    getForm() {
      return {
        title: "",
        dob: "",
        selectNationality: "",
        gender: "",
        first_name: "",
        last_name: "",
        other_name: "",
        // maiden_name: "",
        home_language: "",
        race: "",
        disability: "No",
      };
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
* {
  font-family: "Inter", sans-serif;
}
.accordion-custom {
  border-radius: 5px;
  margin: 1px 2px 1px 2px;
}

@media(max-width:750px){
  .app__personal-info {
    width: 97%!important;
  }
  
  .app__personal-btn {
    width: 290%;
    text-align: center;
    margin-left:-60px;
  }

  .app__personal-info_ {
    width: 97%!important;
    margin-left: 2%
  }
}
</style>
