<template>
  <div class="accordion-item mt-1">
    <div class="card accordion-custom">
      <div class="card-body p-1" style="height: 73px !important">
        <h2 class="accordion-header accordion-custom" id="contactDetails">
          <button
            :class="`accordion-button ${collapse}`"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseContactDetails"
            :aria-expanded="`${expand}`"
            aria-controls="collapseContactDetails"
            style="color: #006b5d; font-weight: bolder"
          >
            Contact Details
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
            user.registered_stages.includes('contact-details') &&
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
      id="collapseContactDetails"
      :class="`accordion-collapse collapse ${show}`"
      aria-labelledby="contactDetails"
      data-bs-parent="#accordionExample"
    >
      <div class="card accordion-custom" style="margin-top: 5px">
        <div class="card-body p-1 mt-3" v-if="user">
          <form role="form" @submit.prevent="processContactInformation()">
            <!-- <div class="row"> -->
            <div class="col-lg-12" style="margin-left: 2%;  width: 95%">
              <div class="d-flex flex-column h-100">
                <div class="mb-3">
                  <label class="custom-text" for="">Cell phone Number </label>
                  <input
                    type="text"
                    disabled
                    v-model="user.phone_number"
                    class="form-control"
                    placeholder="Mobile Number"
                    aria-label="Mobile Number"
                    aria-describedby="mobile-number-addon"
                  />
                </div>
                <validation-error
                  :message="validationKeys.phone_number.message"
                  :showError="validationKeys.phone_number.error"
                />
              </div>
            </div>
            <div class="col-lg-12" style="margin-left: 2%;  width: 95%">
              <div class="d-flex flex-column h-100">
                <div class="mb-3">
                  <label class="custom-text" for="">Alternative Cell phone number</label>
                  <vue-phone-number-input
                    v-model="telephone"
                    :default-country-code="country_code"
                    @update="phoneResult = $event"
                    :disabled="user.next_stage === 'end'"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="col-lg-6" style="margin-left: 2%; width: 48%">
              <div class="d-flex flex-column h-100">
                <div class="mb-3">
                  <label class="custom-text" for="">FAX</label>
                  <input
                    type="text"
                    v-model="form.fax"
                    class="form-control"
                    placeholder="FAX"
                    aria-label="Fax"
                    aria-describedby="fax-addon"
                    :disabled="user.next_stage === 'end'"
                  />
                </div>
              </div>
            </div> -->
            <!-- </div> -->
            <p><br /></p>
            <div class="row">
              <div class="col-lg-12 p-2 app_contact-mt" style="margin-left: 2%; margin-top: -3.5%; width: 95%">
                <div class="d-flex flex-column h-100">
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >House/Building No 
                      <span class="text-danger">* </span><span> (House Address)</span></label
                    >
                    <input
                      type="text"
                      v-model="form.house_number"
                      class="form-control"
                      placeholder="House/Building Number"
                      aria-label="house-number"
                      aria-describedby="house-number-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.house_number.message"
                    :showError="validationKeys.house_number.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Street <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.street"
                      class="form-control"
                      placeholder="Street"
                      aria-label="street"
                      aria-describedby="street-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.street.message"
                    :showError="validationKeys.street.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for="">Area/Location</label>
                    <input
                      type="text"
                      v-model="form.area"
                      class="form-control"
                      placeholder="Area/Location"
                      aria-label="area"
                      aria-describedby="area-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >City <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.city"
                      class="form-control"
                      placeholder="City"
                      aria-label="city"
                      aria-describedby="city-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.city.message"
                    :showError="validationKeys.city.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Postal Code <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.postal_code"
                      class="form-control"
                      placeholder="Postal Code"
                      aria-label="postal-code"
                      aria-describedby="postal-code-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.postal_code.message"
                    :showError="validationKeys.postal_code.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >State/Province <span class="text-danger">*</span></label
                    >
                    <multiselect
                      v-model="selectState"
                      :options="states"
                      track-by="id"
                      label="name"
                      required
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      placeholder="Select State/Province"
                      :disabled="user.next_stage === 'end'"
                    >
                    </multiselect>
                  </div>

                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Country <span class="text-danger">*</span></label
                    >
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
                  </div>
                  <validation-error
                    :message="validationKeys.country_id.message"
                    :showError="validationKeys.country_id.error"
                  />
                 
                  <validation-error
                    :message="validationKeys.state_id.message"
                    :showError="validationKeys.state_id.error"
                  />
                </div>
              </div>
              <!-- <div class="col-lg-6" style="margin-right: 2%; width: 48%">
                <p class="text-center">
                  Postal Address <span class="text-danger">*</span>
                </p>
                <div class="mb-3">
                  <label class="custom-text" for=""
                    >Same as Home Address?</label
                  >
                  <select
                    name=""
                    v-model="form.is_home"
                    class="form-control"
                    id=""
                    :disabled="user.next_stage === 'end'"
                  >
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                  </select>
                </div>
                <validation-error
                  :message="validationKeys.is_home.message"
                  :showError="validationKeys.is_home.error"
                />
                <div class="d-flex flex-column h-100" v-if="!form.is_home">
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >House/Building No
                      <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.postal_house_number"
                      class="form-control"
                      placeholder="House/Building Number"
                      aria-label="house-number"
                      aria-describedby="house-number-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.postal_house_number.message"
                    :showError="validationKeys.postal_house_number.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Street <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.postal_street"
                      class="form-control"
                      placeholder="Street"
                      aria-label="street"
                      aria-describedby="street-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.postal_street.message"
                    :showError="validationKeys.postal_street.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for="">Area/Location</label>
                    <input
                      type="text"
                      v-model="form.postal_area"
                      class="form-control"
                      placeholder="Area/Location"
                      aria-label="area"
                      aria-describedby="area-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >City <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.postal_city"
                      class="form-control"
                      placeholder="City"
                      aria-label="city"
                      aria-describedby="city-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.postal_city.message"
                    :showError="validationKeys.postal_city.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Postal Code <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      v-model="form.postal_postal_code"
                      class="form-control"
                      placeholder="Postal Code"
                      aria-label="postal-code"
                      aria-describedby="postal-code-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.postal_postal_code.message"
                    :showError="validationKeys.postal_postal_code.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Country <span class="text-danger">*</span></label
                    >
                    <multiselect
                      v-model="selectPostalCountry"
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
                  </div>
                  <validation-error
                    :message="validationKeys.postal_country_id.message"
                    :showError="validationKeys.postal_country_id.error"
                  />
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >State/Province <span class="text-danger">*</span></label
                    >
                    <multiselect
                      v-model="selectPostalState"
                      :options="postal_states"
                      track-by="id"
                      label="name"
                      required
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      placeholder="Select State/Province"
                      :disabled="user.next_stage === 'end'"
                    >
                    </multiselect>
                  </div>
                  <validation-error
                    :message="validationKeys.postal_state_id.message"
                    :showError="validationKeys.postal_state_id.error"
                  />
                </div>
              </div> -->
            </div>
            <p><br /></p>
            <div
              class="side-by-side-button  d-flex w-100 justify-content-center"
              style="margin-top: -20px;"
              v-if="user.next_stage != 'end'"
            >
              <nuxt-link
                to="/personal-details"
                class="btn"
                style="
                  background-color: #ffffff;
                  color: #006b5d;
                  text-transform: none;
                  border: 1px solid #006b5d;
                "
                >Go to previous form</nuxt-link
              >
              &nbsp;  &nbsp; <custom-button
                :name="`Proceed to next page`"
                :type="`submit`"
                :customClass="`btn`"
                :loading="loading"
                :disabled="disabled"
                style="
                  background-color: #006b5d;
                  color: #ffffff;
                  text-transform: none;
                "
                class="app__contact-btn"
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
      form: this.getForm(),
      loading: false,
      disabled: false,
      selectCountry: "",
      selectState: "",
      selectPostalCountry: "",
      selectPostalState: "",
      states: [],
      postal_states: [],
      phoneResult: "",
      country_code: "ZA",
      telephone: "",
      hasPersonalInformationValidationError: false,
      validationKeys: {
        phone_number: {
          error: false,
          message: "",
        },
        house_number: {
          error: false,
          message: "",
        },
        street: {
          error: false,
          message: "",
        },
        city: {
          error: false,
          message: "",
        },
        postal_code: {
          error: false,
          message: "",
        },
        country_id: {
          error: false,
          message: "",
        },
        state_id: {
          error: false,
          message: "",
        },
        is_home: {
          error: false,
          message: "",
        },
        postal_house_number: {
          error: false,
          message: "",
        },
        postal_street: {
          error: false,
          message: "",
        },
        postal_city: {
          error: false,
          message: "",
        },
        postal_postal_code: {
          error: false,
          message: "",
        },
        postal_country_id: {
          error: false,
          message: "",
        },
        postal_state_id: {
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
        if (newVal) {
          this.form.house_number = newVal.address
            ? newVal.address.house_number
            : "";
          this.form.street = newVal.address ? newVal.address.street : "";
          this.form.area = newVal.address ? newVal.address.area : "";
          this.form.city = newVal.address ? newVal.address.city : "";
          this.form.postal_code = newVal.address
            ? newVal.address.postal_code
            : "";
          this.form.is_home = newVal.address
            ? newVal.address.is_home_address
            : false;
          this.selectState = newVal.address ? newVal.address.state : "";
          this.selectCountry = newVal.address ? newVal.address.country : "";
          this.form.postal_house_number = newVal.address
            ? newVal.address.postal_house_number
            : "";
          this.form.postal_street = newVal.address
            ? newVal.address.postal_street
            : "";
          this.form.postal_area = newVal.address
            ? newVal.address.postal_area
            : "";
          this.form.postal_city = newVal.address
            ? newVal.address.postal_city
            : "";
          this.form.postal_postal_code = newVal.address
            ? newVal.address.postal_postal_code
            : "";
          this.selectPostalState = newVal.address
            ? newVal.address.postal_state
            : "";
          this.selectPostalCountry = newVal.address
            ? newVal.address.postal_country
            : "";
          this.form.email = newVal.email;
          this.telephone = newVal.profile ? newVal.profile.telephone : "";
          this.form.fax = newVal.profile ? newVal.profile.fax : "";
          this.country_code = newVal.profile.telephone_country_code
            ? newVal.profile.telephone_country_code
            : this.country_code;
        }
      },
      immediate: true,
      deep: true,
    },
    selectCountry: {
      handler(newVal, oldVal) {
        this.states = _.filter(this.select.states, { country_id: newVal.id });
      },
    },
    selectPostalCountry: {
      handler(newVal, oldVal) {
        this.postal_states = _.filter(this.select.states, {
          country_id: newVal.id,
        });
      },
    },
  },
  methods: {
    async processContactInformation() {
      this.loading = true;
      this.disabled = true;
      if (this.selectCountry) {
        this.form.country_id = this.selectCountry.id;
      }
      if (this.selectState) {
        this.form.state_id = this.selectState.id;
      }
      if (this.selectPostalCountry) {
        this.form.postal_country_id = this.selectPostalCountry.id;
      }
      if (this.selectPostalState) {
        this.form.postal_state_id = this.selectPostalState.id;
      }
      if (this.phoneResult) {
        this.form.telephone = {
          country_code: this.phoneResult.countryCode,
          phone_code: this.phoneResult.countryCallingCode,
          phone_number: this.telephone,
        };
      }
      await this.$axios
        .post("/students/contact-details", this.form)
        .then((res) => {
          this.stopLoader();
          notify("Contact details updated successfully", "success");
          this.$store.commit("auth/UPDATE_USER_INFO", res.data.data);
          this.$router.push("/education-history");
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
        house_number: "",
        street: "",
        area: "",
        city: "",
        postal_code: "",
        state_id: "",
        country_id: "",
        is_home: false,
        postal_house_number: "",
        postal_street: "",
        postal_area: "",
        postal_city: "",
        postal_postal_code: "",
        postal_state_id: "",
        postal_country_id: "",
        email: "",
        fax: "",
        telephone: "",
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

/* .side-by-side-button {
  width: 100%!important;
  text-align: center;
} */
/* style="margin-left: 34%; margin-right: 35%; margin-top: -20px" */

@media(max-width: 750px){
  .app_contact-mt {
    margin-top: -30px!important;
  }

  .side-by-side-button {
  margin-left: 0!important;
  font-size: 10px!important;
  /* margin-right: -34%!important; */
  display: inline-block!important;
  text-align: center;
}
  /* .app__contact-btn {
    width: 100%;
    text-align: center;
    margin-left:-60px;
  } */
}
</style>
