<template>
  <div class="accordion-item mt-1">
    <div class="card accordion-custom">
      <div class="card-body p-1" style="height: 73px !important">
        <h2 class="accordion-header accordion-custom" id="documentUpload">
          <button
            :class="`accordion-button ${collapse}`"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseDocumentUpload"
            :aria-expanded="`${expand}`"
            aria-controls="collapseDocumentUpload"
            style="color: #006b5d; font-weight: bolder"
          >
            Document Upload
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
            user.registered_stages.includes('document-uploads') &&
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
      id="collapseDocumentUpload"
      :class="`accordion-collapse collapse ${show}`"
      aria-labelledby="documentUpload"
      data-bs-parent="#accordionExample"
    >
      <div class="card accordion-custom" style="margin-top: 5px">
        <div class="card-body p-1" v-if="user">
          <div class="text-center mt-3">
            <h3
              class="font-weight-bolder"
              style="color: #ec0000; text-decoration: underline"
            >
              IMPORTANT NOTICE
            </h3>
            <p style="color: #000">
              <span class="font-weight-bolder"
                >1. All documents required for upload must be certified. </span
              ><br />
              <span class="font-weight-bolder">
                2. If you are unable to upload your documents at this stage
                please</span
              >
              <br />
              (a)Send them via email to
              <span class="text-danger font-weight-bolder"
                >admissions@hillcrosscollege.com</span
              >
              or <br />
              (b) Come with them to the College during the registration period.
            </p>
          </div>
          <form role="form" @submit.prevent="processDocumentUpload()">
            <div class="row mb-4 mt-4" style="margin-left: 2%; width: 98%">
              <div class="col-md-4">
                <label class="custom-text" for=""
                  >ID copy or Passport copy or Birth certificate
                </label>
              </div>
              <div class="col-md-6">
                <uploader
                  :document_type="`student_id`"
                  :disabledInput="user.next_stage === 'end'"
                  req
                />
              </div>
            </div>
            <!-- <div class="row mb-4" style="margin-left: 2%; width: 98%">
              <div class="col-md-4">
                <label class="custom-text" for=""
                  >Certified ID/Passport Of One Parent
                </label>
              </div>
              <div class="col-md-6">
                <uploader
                  :document_type="`parent_id`"
                  :disabledInput="user.next_stage === 'end'"
                />
              </div>
            </div> -->
            <div class="row mb-4" style="margin-left: 2%; width: 98%">
              <div class="col-md-4">
                <label class="custom-text" for=""
                  >Copy of Matric or ABET L4 or Senior School Certificate or N3
                  certificate or Current Grade 12 result with school stamp.
                </label>
              </div>
              <div class="col-md-6">
                <uploader
                  :document_type="`student_result`"
                  :disabledInput="user.next_stage === 'end'"
                />
              </div>
            </div>
            <div class="row mb-4" style="margin-left: 2%; width: 98%">
              <div class="col-md-4">
                <label class="custom-text" for=""
                  >Copy Of Proof Of Address
                </label>
              </div>
              <div class="col-md-6">
                <uploader
                  :document_type="`student_address`"
                  :disabledInput="user.next_stage === 'end'"
                />
              </div>
            </div>
            <!-- <div class="row mb-4" style="margin-left: 2%; width: 98%">
              <div class="col-md-4">
                <label class="custom-text" for=""
                  >Bursary/Trust Fund award letter
                </label>
              </div>
              <div class="col-md-6">
                <uploader
                  :document_type="`bursary_letter`"
                  :disabledInput="user.next_stage === 'end'"
                />
              </div>
            </div> -->
            <!-- <div class="row mb-4" style="margin-left: 2%; width: 98%">
              <div class="col-md-4">
                <label class="custom-text" for=""
                  >Evidence/Result Of Higher Education Qualification (For
                  Students Who Have Studied Beyond Matric)
                </label>
              </div>
              <div class="col-md-6">
                <uploader
                  :document_type="`student_qualification`"
                  :disabledInput="user.next_stage === 'end'"
                />
              </div>
            </div> -->
            <p><br /></p>
            <div
              class="side-by-side-button w-200"
              style="margin-left: 34%; margin-right: 35%; margin-top: -20px"
              v-if="user.next_stage != 'end'"
            >
              <nuxt-link
                to="/qualification-information"
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
                :name="`Done`"
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Uploader from "@/components/Uploader.vue";
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
    Uploader,
  },
  data() {
    return {
      loading: false,
      disabled: false,
      has_bursary: false,
      hasPersonalInformationValidationError: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      document: "document/files",
    }),
  },
  watch: {
    document: {
      handler(newVal, oldVal) {
        return (this.has_bursary = _.filter(newVal, [
          "type",
          "bursary_letter",
        ]).length);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async processDocumentUpload() {
      this.loading = true;
      this.disabled = true;
      let uploadedDocs = {};
      if (this.document.length) {
        uploadedDocs.documents = this.document;
      }
      await this.$axios
        .post("/students/document-uploads", uploadedDocs)
        .then((res) => {
          this.stopLoader();
          this.$store.commit("document/SET_FILES", []);
          notify("Upload submitted successfully", "success");
          this.$store.commit("auth/UPDATE_USER_INFO", res.data.data);
          // window.location.href = "/";
          this.$router.push("/acknowledgement");
        })
        .catch((err) => {
          console.log(err);
          this.stopLoader();
          handleError(err);
        });
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
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
