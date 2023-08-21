<!-- <template>
  <div class="accordion-item mt-1">
    <div class="card accordion-custom">
      <div class="card-body p-1" style="height: 73px !important">
        <h2 class="accordion-header accordion-custom" id="sponsorInformation">
          <button
            :class="`accordion-button ${collapse}`"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSponsorInformation"
            :aria-expanded="`${expand}`"
            aria-controls="collapseSponsorInformation"
            style="color: #006b5d"
          >
            Sponsor Information
          </button>
        </h2>
        <span v-if="hasPersonalInformationValidationError">
          <p class="text-left custom-summary">
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
            user.registered_stages.includes('sponsor-information') &&
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
      id="collapseSponsorInformation"
      :class="`accordion-collapse collapse ${show}`"
      aria-labelledby="sponsorInformation"
      data-bs-parent="#accordionExample"
    >
      <div class="card accordion-custom" style="margin-top: 5px">
        <div class="card-body p-1" v-if="user">
          <form role="form" @submit.prevent="processSponsorInformation()">
            <div class="row">
              <div class="col-lg-6" style="margin-left: 2%; width: 48%">
                <div class="d-flex flex-column h-100">
                  <div class="mb-3">
                    <label class="custom-text" for=""
                      >Who will be paying your fees?
                      <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.sponsor_type"
                      class="form-control"
                      id=""
                      :disabled="user.next_stage === 'end'"
                    >
                      <option
                        :value="optionType.key"
                        v-for="optionType in sponsorTypes"
                        :key="optionType.key"
                      >
                        {{ optionType.value }}
                      </option>
                    </select>
                  </div>
                  <validation-error
                    :message="validationKeys.sponsor_type.message"
                    :showError="validationKeys.sponsor_type.error"
                  />
                  <div class="mb-3" v-if="form.sponsor_type === 'bursary'">
                    <label class="custom-text" for="">Bursary Body </label>
                    <input
                      type="text"
                      v-model="form.body_name"
                      class="form-control"
                      placeholder="Bursary Body Name"
                      aria-label="OtherName"
                      aria-describedby="other_name-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.body_name.message"
                    :showError="validationKeys.body_name.error"
                  />
                  <div class="mb-3" v-if="form.sponsor_type === 'bursary'">
                    <label class="custom-text" for=""
                      >Bursary Body Telephone
                      <span class="text-danger">*</span></label
                    >
                    <vue-phone-number-input
                      v-model="bursaryPhone"
                      :default-country-code="bursary_country_code"
                      :required="true"
                      @update="bursaryBodyPhoneResult = $event"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.bursary_phone_number.message"
                    :showError="validationKeys.bursary_phone_number.error"
                  />
                  <div
                    class="mb-3"
                    v-if="
                      ['myself', 'parents', 'family_members'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for=""
                      >Title <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.title"
                      class="form-control"
                      id=""
                      :disabled="shouldDisabled"
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
                  <div
                    class="mb-3"
                    v-if="
                      ['myself', 'parents', 'family_members'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
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
                      :disabled="shouldDisabled"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.first_name.message"
                    :showError="validationKeys.first_name.error"
                  />
                  <div
                    class="mb-3"
                    v-if="
                      ['myself', 'parents', 'family_members'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for="">Other Name </label>
                    <input
                      type="text"
                      v-model="form.other_name"
                      class="form-control"
                      placeholder="Other Name"
                      aria-label="OtherName"
                      aria-describedby="other_name-addon"
                      :disabled="shouldDisabled"
                    />
                  </div>
                  <div
                    class="mb-3"
                    v-if="
                      ['myself', 'parents', 'family_members'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for=""
                      >Nationality <span class="text-danger">*</span></label
                    >
                    <multiselect
                      v-model="selectCountry"
                      :options="select.countries"
                      track-by="id"
                      label="name"
                      :disabled="shouldDisabled"
                      required
                      :multiple="false"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      placeholder="Select Nationality"
                    >
                    </multiselect>
                  </div>
                  <validation-error
                    :message="validationKeys.country_id.message"
                    :showError="validationKeys.country_id.error"
                  />
                  <div class="mb-3" v-if="form.sponsor_type === 'myself'">
                    <label class="custom-text" for=""
                      >Home Language <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.home_language"
                      class="form-control"
                      id=""
                      :disabled="shouldDisabled"
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
                  <div
                    class="mb-3"
                    v-if="
                      ['employer', 'trust_fund'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for="">Employer Name </label>
                    <input
                      type="text"
                      v-model="form.cooperate_name"
                      class="form-control"
                      placeholder="Employer Name"
                      aria-label="EmployerName"
                      aria-describedby="employer-name-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.cooperate_name.message"
                    :showError="validationKeys.cooperate_name.error"
                  />
                  <div
                    class="mb-3"
                    v-if="
                      ['employer', 'trust_fund'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for="">Employer Email </label>
                    <input
                      type="text"
                      v-model="form.cooperate_email"
                      class="form-control"
                      placeholder="Employer Email"
                      aria-label="EmployerEmail"
                      aria-describedby="employer-email-addon"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.cooperate_email.message"
                    :showError="validationKeys.cooperate_email.error"
                  />
                </div>
              </div>
              <div class="col-lg-6" style="margin-right: 2%; width: 48%">
                <div class="d-flex flex-column h-100">
                  <div
                    class="mb-3"
                    v-if="
                      ['myself', 'parents', 'family_members'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for=""
                      >Gender <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.gender"
                      class="form-control"
                      id=""
                      :disabled="shouldDisabled"
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
                  <div
                    class="mb-3"
                    v-if="
                      ['myself', 'parents', 'family_members'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
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
                      :disabled="shouldDisabled"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.last_name.message"
                    :showError="validationKeys.last_name.error"
                  />
                  <div class="mb-3" v-if="form.sponsor_type === 'myself'">
                    <label class="custom-text" for="">Maiden Name </label>
                    <input
                      type="text"
                      v-model="form.maiden_name"
                      class="form-control"
                      placeholder="Maiden Name if applicable"
                      aria-label="Maidenname"
                      aria-describedby="maiden_name-addon"
                      :disabled="shouldDisabled"
                    />
                  </div>
                  <div
                    class="mb-3"
                    v-if="
                      ['myself', 'parents', 'family_members'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for=""
                      >Race <span class="text-danger">*</span></label
                    >
                    <select
                      name=""
                      v-model="form.race"
                      class="form-control"
                      id=""
                      :disabled="shouldDisabled"
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
                  <div
                    class="mb-3"
                    v-if="
                      ['myself', 'parents', 'family_members'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for=""
                      >ID/Passport Number
                    </label>
                    <input
                      type="text"
                      v-model="form.passport_number"
                      class="form-control"
                      placeholder="Passport Number"
                      aria-label="OtherName"
                      aria-describedby="other_name-addon"
                      :disabled="shouldDisabled"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.passport_number.message"
                    :showError="validationKeys.passport_number.error"
                  />
                  <div
                    class="mb-3"
                    v-if="
                      ['employer', 'trust_fund'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for=""
                      >Employer Telephone
                      <span class="text-danger">*</span></label
                    >
                    <vue-phone-number-input
                      v-model="telephone"
                      :default-country-code="country_code"
                      :required="true"
                      @update="phoneResult = $event"
                      :disabled="user.next_stage === 'end'"
                    />
                  </div>
                  <validation-error
                    :message="validationKeys.home_language.message"
                    :showError="validationKeys.home_language.error"
                  />
                  <div
                    class="mb-3"
                    v-if="
                      ['employer', 'trust_fund'].includes(
                        this.form.sponsor_type
                      )
                    "
                  >
                    <label class="custom-text" for=""
                      >Employer Address
                      <span class="text-danger">*</span></label
                    >
                    <textarea
                      name=""
                      v-model="form.cooperate_address"
                      class="form-control"
                      id=""
                      cols="10"
                      rows="2"
                      :disabled="user.next_stage === 'end'"
                    ></textarea>
                  </div>
                  <validation-error
                    :message="validationKeys.cooperate_address.message"
                    :showError="validationKeys.cooperate_address.error"
                  />
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
                to="/contact-details"
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
                :name="`Proceed to next`"
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
</template> -->
<script>
// import Swal from "sweetalert2";
// import { mapGetters } from "vuex";
// import { handleError, notify } from "../../assets/js/utility";
// import CustomButton from "@/components/Button.vue";
// import Multiselect from "vue-multiselect";
// import "vue-multiselect/dist/vue-multiselect.min.css";
// export default {
//   props: {
//     load: {
//       required: true,
//       type: Boolean,
//     },
//     collapse: {
//       required: true,
//       type: String,
//     },
//     expand: {
//       required: true,
//       type: String,
//     },
//     show: {
//       required: true,
//       type: String,
//     },
//   },
//   components: {
//     CustomButton,
//     Multiselect,
//   },
//   data() {
//     return {
//       sponsorTypes: [
//         {
//           key: "",
//           value: "Select Sponsor Type",
//         },
//         {
//           key: "myself",
//           value: "Myself",
//         },
//         {
//           key: "parents",
//           value: "Parents/Guardian",
//         },
//         {
//           key: "family_members",
//           value: "Family member",
//         },
//         {
//           key: "employer",
//           value: "Employer",
//         },
//         {
//           key: "trust_fund",
//           value: "Trust Fund",
//         },
//         {
//           key: "bursary",
//           value: "Bursary",
//         },
//       ],
//       homeLanguages: [
//         "Afrikaans",
//         "English",
//         "IsiNdebele",
//         "IsiXhosa",
//         "IsiZulu",
//         "Sepedi/N Sotho",
//         "Sesotho",
//         "SeTswana",
//         "SiSwati",
//         "TshiVenda",
//         "XiTsonga",
//         "Other",
//       ],
//       form: this.getForm(),
//       loading: false,
//       disabled: false,
//       selectCountry: "",
//       shouldDisabled: false,
//       phoneResult: null,
//       country_code: "ZA",
//       bursary_country_code: "ZA",
//       telephone: "",
//       bursaryPhone: "",
//       bursaryBodyPhoneResult: null,
//       hasPersonalInformationValidationError: false,
//       validationKeys: {
//         sponsor_type: {
//           error: false,
//           message: "",
//         },
//         title: {
//           error: false,
//           message: "",
//         },
//         first_name: {
//           error: false,
//           message: "",
//         },
//         last_name: {
//           error: false,
//           message: "",
//         },
//         country_id: {
//           error: false,
//           message: "",
//         },
//         gender: {
//           error: false,
//           message: "",
//         },
//         race: {
//           error: false,
//           message: "",
//         },
//         passport_number: {
//           error: false,
//           message: "",
//         },
//         cooperate_name: {
//           error: false,
//           message: "",
//         },
//         cooperate_email: {
//           error: false,
//           message: "",
//         },
//         cooperate_telephone: {
//           error: false,
//           message: "",
//         },
//         cooperate_address: {
//           error: false,
//           message: "",
//         },
//         body_name: {
//           error: false,
//           message: "",
//         },
//         bursary_phone_number: {
//           error: false,
//           message: "",
//         },
//         home_language: {
//           error: false,
//           message: "",
//         },
//       },
//     };
//   },
//   computed: {
//     ...mapGetters({
//       user: "auth/user",
//       select: "select/select",
//     }),
//   },
//   watch: {
//     user: {
//       handler(newVal, oldVal) {
//         this.form.sponsor_type = newVal.sponsor
//           ? newVal.sponsor.sponsor_type
//           : "";
//         if (newVal.next_stage === "end") {
//           this.shouldDisabled = true;
//         }
//       },
//       immediate: true,
//       deep: true,
//     },
//     "form.sponsor_type": {
//       handler(newVal, oldVal) {
//         if (newVal === "myself") {
//           (this.form.first_name = this.user.first_name),
//             (this.form.last_name = this.user.last_name),
//             (this.form.title = this.user.profile
//               ? this.user.profile.title
//               : "");
//           this.form.gender = this.user.profile ? this.user.profile.gender : "";
//           this.form.other_name = this.user.profile
//             ? this.user.profile.other_name
//             : "";
//           this.form.maiden_name = this.user.profile
//             ? this.user.profile.maiden_name
//             : "";
//           this.form.race = this.user.profile ? this.user.profile.race : "";
//           this.form.home_language = this.user.profile
//             ? this.user.profile.home_language
//             : "";
//           this.form.disability = this.user.profile
//             ? this.user.profile.have_disability
//               ? "Yes"
//               : "No"
//             : "";
//           this.form.passport_number = this.user.student_id;
//           this.selectCountry = this.user.profile
//             ? this.user.profile.nationality
//             : "";
//           this.shouldDisabled = true;
//         } else if (newVal === "employer" || newVal === "trust_fund") {
//           this.form.cooperate_name = this.user.sponsor
//             ? this.user.sponsor.cooperate_name
//             : "";
//           this.form.cooperate_email = this.user.sponsor
//             ? this.user.sponsor.cooperate_email
//             : "";
//           this.telephone =
//             this.user.sponsor && this.user.sponsor.cooperate_telephone
//               ? this.user.sponsor.cooperate_telephone
//               : "";
//           this.country_code = this.user.sponsor
//             ? this.user.sponsor.country_code
//             : this.country_code;
//           this.form.cooperate_address = this.user.sponsor
//             ? this.user.sponsor.cooperate_address
//             : "";
//           this.shouldDisabled = false;
//         } else if (newVal === "parents" || newVal === "family_members") {
//           (this.form.first_name = this.user.sponsor
//             ? this.user.sponsor.first_name
//             : ""),
//             (this.form.last_name = this.user.sponsor
//               ? this.user.sponsor.last_name
//               : ""),
//             (this.form.title = this.user.sponsor
//               ? this.user.sponsor.title
//               : "");
//           this.form.gender = this.user.sponsor ? this.user.sponsor.gender : "";
//           this.form.other_name = this.user.sponsor
//             ? this.user.sponsor.other_name
//             : "";
//           this.form.maiden_name = this.user.sponsor
//             ? this.user.sponsor.maiden_name
//             : "";
//           this.form.race = this.user.sponsor ? this.user.sponsor.race : "";
//           this.form.passport_number = this.user.sponsor
//             ? this.user.sponsor.passport_number
//             : "";
//           this.selectCountry = this.user.profile
//             ? this.user.profile.nationality
//             : "";
//           this.shouldDisabled = false;
//         } else if (newVal === "bursary") {
//           if (this.user.next_stage != "end") {
//             Swal.fire({
//               title: `IMPORTANT NOTICE!`,
//               text: "No NASFAS! but we accept other Bursaries",
//               icon: "warning",
//               showCancelButton: false,
//               confirmButtonColor: "#3085d6",
//               showLoaderOnConfirm: true,
//               confirmButtonText: "Continue",
//               allowOutsideClick: false,
//             });
//           }
//           this.form.body_name = this.user.sponsor
//             ? this.user.sponsor.body_name
//             : "";
//           this.bursaryPhone = this.user.sponsor
//             ? `${this.user.sponsor.bursary_body_phone}`
//             : "";
//           this.bursary_country_code =
//             this.user.sponsor &&
//             this.user.sponsor.bursary_body_phone_country_code
//               ? this.user.sponsor.bursary_body_phone_country_code
//               : this.bursary_country_code;
//         }
//       },
//       immediate: true,
//       deep: true,
//     },
//   },
//   methods: {
//     async processSponsorInformation() {
//       this.loading = true;
//       this.disabled = true;
//       if (this.selectCountry) {
//         this.form.country_id = this.selectCountry.id;
//       }
//       if (this.phoneResult) {
//         this.form.cooperate_telephone = {
//           country_code: this.phoneResult.countryCode,
//           phone_code: this.phoneResult.countryCallingCode,
//           phone_number: this.telephone,
//         };
//       }
//       if (this.bursaryBodyPhoneResult) {
//         this.form.bursary_phone_number = {
//           country_code: this.bursaryBodyPhoneResult.countryCode,
//           phone_code: this.bursaryBodyPhoneResult.countryCallingCode,
//           phone_number: this.bursaryPhone,
//         };
//       }
//       if (this.form.race === "") {
//         delete this.form.race;
//       }
//       if (this.form.maiden_name === "" || this.form.maiden_name === null) {
//         delete this.form.maiden_name;
//       }
//       if (this.form.other_name === "" || this.form.other_name === null) {
//         delete this.form.other_name;
//       }
//       if (this.form.country_id === "") {
//         delete this.form.country_id;
//       }
//       if (this.form.gender === "") {
//         delete this.form.gender;
//       }
//       if (this.form.cooperate_telephone === "") {
//         delete this.form.cooperate_telephone;
//       }
//       await this.$axios
//         .post("/students/sponsor-information", this.form)
//         .then((res) => {
//           this.stopLoader();
//           notify("Sponsor information updated successfully", "success");
//           this.$store.commit("auth/UPDATE_USER_INFO", res.data.data);
//           this.$router.push("/education-history");
//         })
//         .catch((error) => {
//           this.stopLoader();
//           if (error.response.status === 422) {
//             this.hasPersonalInformationValidationError = true;
//             for (var validationKey in error.response.data.errors) {
//               error.response.data.errors[validationKey].forEach(
//                 (validationElement) => {
//                   for (var key in this.validationKeys) {
//                     if (key == validationKey) {
//                       console.log(this.validationKeys[validationKey]);
//                       this.validationKeys[validationKey].error = true;
//                       this.validationKeys[validationKey].message =
//                         validationElement;
//                     }
//                   }
//                 }
//               );
//             }
//           } else {
//             handleError(error);
//           }
//         });
//     },
//     stopLoader() {
//       this.loading = false;
//       this.disabled = false;
//     },
//     getForm() {
//       return {
//         sponsor_type: "myself",
//         title: "",
//         first_name: "",
//         last_name: "",
//         other_name: "",
//         maiden_name: "",
//         country_id: "",
//         gender: "",
//         home_language: "",
//         race: "",
//         passport_number: "",
//         cooperate_name: "",
//         cooperate_email: "",
//         cooperate_telephone: "",
//         cooperate_address: "",
//         body_name: "",
//       };
//     },
//   },
// };
</script>
<style>
/* .accordion-custom {
  border-radius: 5px;
  margin: 1px 2px 1px 2px;
} */
</style>
