<template>
  <div class="container-fluid py-4">
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="accordion" id="accordionExample">
          <personal-information
            :load="shouldLoadPersonalInformation"
            :collapse="''"
            :expand="'true'"
            :show="'show'"
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
            :collapse="'collapsed'"
            :expand="'false'"
            :show="''"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { handleError, notify } from "../../assets/js/utility";
import CustomButton from "@/components/Button.vue";
import PersonalInformation from "../../components/Registration/PersonalInformation.vue";
import ContactDetails from "../../components/Registration/ContactDetails.vue";
// 

import EducationHistory from "../../components/Registration/EducationHistory.vue";
import QualificationInformation from "../../components/Registration/QualificationInformation.vue";
import DocumentUpload from "../../components/Registration/DocumentUpload.vue";
export default {
  mounted() {
    this.$store.commit("app/SET_TITLE", "Personal Information");
    if (
      this.user.registered_stages &&
      !(
        this.user.registered_stages.includes("personal-details") ||
        this.user.next_stage === "personal-details"
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
    CustomButton,
    PersonalInformation,
    ContactDetails,
    // SponsorInformation,
    EducationHistory,
    QualificationInformation,
    DocumentUpload,
  },
  data() {
    return {
      shouldLoadPersonalInformation: true,
      shouldLoadContactDetails: false,
      // shouldLoadSponsorInformation: false,
      shouldLoadEducationHistory: false,
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
.accordion-button::after {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000000'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
}
.custom-summary {
  margin-left: 18px !important;
  font-size: 11px !important;
  margin-top: -18px !important;
  color: red !important;
}
.svg-close {
  margin-left: 93%;
  margin-top: -108px;
}
.svg-marked {
  margin-left: 93%;
  margin-top: -75px;
}
@media only screen and (max-width: 900px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 92%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 92%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 750px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 89%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 89%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 603px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 88%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 88%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 560px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 87%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 87%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 520px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 86%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 86%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 490px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 85%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 85%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 460px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 84%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 84%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 440px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 83%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 83%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 415px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 82%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 82%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 400px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 81%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 81%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 370px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 80%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 80%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 360px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 79%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 79%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 345px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 78%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 78%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 325px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 77%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 77%;
    margin-top: -75px;
  }
}

@media only screen and (max-width: 320px) {
  .custom-summary {
    margin-left: 18px !important;
    font-size: 11px !important;
    margin-top: -18px !important;
    color: red !important;
  }
  .svg-close {
    margin-left: 76%;
    margin-top: -108px;
  }
  .svg-marked {
    margin-left: 76%;
    margin-top: -75px;
  }
}
</style>
