<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12 col-sm-12 mb-xl-0 mb-4">
        <div class="card" style="margin-top: 40px; border-radius: 7px;">
          <div class="card-body p-3">
            <div class="row" v-if="user">
              <span v-if="user.admission_status === 'Admitted'" class="text-center" style="padding-top:30px; color: #006B5D;">
                  <h4 style="color: #006B5D;">Welcome to HillCross College download center</h4>
                  <p>It's a pleasure to have you join us.</p>
                  <p>Download your admission letter or study contract <br> using the links below</p>
                  <div
                  class="text-left side-by-side-button w-200"
                >
                  <a
                    href="https://hillcrosscollege.s3.eu-west-2.amazonaws.com/Study+Contract+Updated.pdf"
                    class="btn"
                    target="blank"
                    style="background-color: #006B5D; color: #ffffff; text-transform: none;"
                    >Study Contract</a
                  >
                  <a
                    :href="user.admission_letter_url"
                    class="btn"
                    target="blank"
                    style="background-color: #006B5D; color: #ffffff; text-transform: none;"
                    >Admission Letter</a
                  >
                </div>
              </span>
              <span v-if="user.admission_status === 'Registered'">
                <p>
                  Hi {{ user.first_name }}, Thank you for successfully
                  submitting your application.
                </p>
                <p>
                  The admissions office will assess your application and get
                  back to you with feedback within 5 working days.
                </p>
                <p>
                  Kindly be on the lookout for feedback to your application via
                  email and or SMS.
                </p>
                <p>
                  Feel free to always come back here to check also. We can't
                  wait to see you join us. Cheers! HillCross College. Thank you.
                </p>
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.$store.commit("app/SET_TITLE", "Dashboard");
    if (this.user.registered_stages && this.user.next_stage === "end") {
      this.r.push(`/`);
    } else {
      this.$router.push(`/${this.user.next_stage}`);
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>
