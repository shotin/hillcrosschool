<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12 col-sm-12 mb-xl-0 mb-4">
        <div class="card" style="margin-top: 40px; border-radius: 7px">
          <div class="card-body p-3">
            <div class="row" v-if="user">
              <span
                class="text-center"
                style="padding-top: 30px; color: #006b5d"
              >
                <svg
                  width="81"
                  height="80"
                  viewBox="0 0 92 91"
                  style="margin-bottom: 8px"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M62.6183 31.3701H58.4504C57.544 31.3701 56.682 31.8056 56.1488 32.552L42.1789 51.9251L35.8515 43.145C35.3183 42.4074 34.4652 41.9631 33.5499 41.9631H29.382C28.8043 41.9631 28.4667 42.6207 28.8043 43.0917L39.8772 58.448C40.1388 58.813 40.4836 59.1105 40.8831 59.3158C41.2826 59.521 41.7253 59.628 42.1744 59.628C42.6236 59.628 43.0662 59.521 43.4657 59.3158C43.8652 59.1105 44.2101 58.813 44.4716 58.448L63.1871 32.4987C63.5336 32.0277 63.1959 31.3701 62.6183 31.3701Z"
                    fill="#006B5D"
                  />
                  <path
                    d="M46 5.6875C24.0143 5.6875 6.1875 23.5143 6.1875 45.5C6.1875 67.4857 24.0143 85.3125 46 85.3125C67.9857 85.3125 85.8125 67.4857 85.8125 45.5C85.8125 23.5143 67.9857 5.6875 46 5.6875ZM46 78.5586C27.7467 78.5586 12.9414 63.7533 12.9414 45.5C12.9414 27.2467 27.7467 12.4414 46 12.4414C64.2533 12.4414 79.0586 27.2467 79.0586 45.5C79.0586 63.7533 64.2533 78.5586 46 78.5586Z"
                    fill="#006B5D"
                  />
                </svg>

                <h4 style="color: #006b5d">Application Submitted</h4>
                <p>
                  You have successfully completed and submitted your application <br />
                  to HillCross College. Expect a feedback in 3-5 working days.
                  <!-- Thank you! You have successfully completed and submitted -->
              
                  <!-- your application into HillCross College. -->
                </p>
                <p>Your application is currently been accessed. Thank you!</p>
                <div class="text-left w-200">
                  <a href="/" class="btn custom-link" target="blank"
                    >Go to Dashboard</a
                  >
                </div>
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
    this.$store.commit("app/SET_TITLE", "Acknowledgement");
    if (!this.user.registered_stages && !this.user.next_stage === "end") {
      this.$router.push(`/${this.user.next_stage}`);
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>
<style>
.custom-link {
  background-color: #006b5d;
  color: #ffffff;
  text-transform: none;
}
a:hover {
  text-decoration: none;
  cursor: pointer;
  color: #ffffff !important;
}
</style>
