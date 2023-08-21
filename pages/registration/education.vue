<template>
  <div class="container-fluid py-4">
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <personal-information
          :load="shouldLoadPersonalInformation"
          :collapse="'collapsed'"
          :expand="'false'"
          :show="''"
        />
        <contact-details
          :load="shouldLoadContactDetails"
          :collapse="'collapsed'"
          :expand="'false'"
          :show="''"
        />
        <!-- <sponsor-information
          :load="shouldLoadSponsorInformation"
          :collapse="'collapsed'"
          :expand="'false'"
          :show="''"
        /> -->
        <education-history
          :load="shouldLoadEducationHistory"
          :collapse="''"
          :expand="'true'"
          :show="'show'"
        />
        <qualification-information
          :load="shouldQualificationInformation"
          :collapse="'collapsed'"
          :expand="'false'"
          :show="''"
        />
        <document-upload
          :load="shouldDocumentUpload"
          :collapse="'collapsed'"
          :expand="'false'"
          :show="''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PersonalInformation from "../../components/Registration/PersonalInformation.vue";
import ContactDetails from "../../components/Registration/ContactDetails.vue";
// import SponsorInformation from "../../components/Registration/SponsorInformation.vue";
import EducationHistory from "../../components/Registration/EducationHistory.vue";
import QualificationInformation from "../../components/Registration/QualificationInformation.vue";
import DocumentUpload from "../../components/Registration/DocumentUpload.vue";
export default {
  mounted() {
    this.$store.commit("app/SET_TITLE", "Education History");
    if (
      this.user.registered_stages &&
      !(
        this.user.registered_stages.includes("education-history") ||
        this.user.next_stage === "education-history"
      )
    ) {
      if (this.user.next_stage === "end") {
        this.$router.push(`/`);
      } else {
        this.$router.push(`/${this.user.next_stage}`);
      }
    }
  },
  components: {
    PersonalInformation,
    ContactDetails,
    // SponsorInformation,
    EducationHistory,
    QualificationInformation,
    DocumentUpload,
  },
  data() {
    return {
      shouldLoadPersonalInformation: false,
      shouldLoadContactDetails: false,
      // shouldLoadSponsorInformation: false,
      shouldLoadEducationHistory: true,
      shouldQualificationInformation: false,
      shouldDocumentUpload: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {},
};
</script>
<style>
.text-gradient.text-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545);
}
.bg-gradient-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545 100%);
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  margin-right: 2rem;
  padding: 1rem;
  padding-right: 2rem;
}
</style>
