<template>
  <loader fullscreen />
</template>

<script>
import Cookies from "js-cookie";
import { cookieFromRequest } from "~/utils";
import Loader from "@/components/Loader";

export default {
  layout: "blank",
  head() {
    return {
      title: "Logining you in..."
    };
  },
  components: {
    Loader
  },

  asyncData({ store, req, redirect, route }) {
    const params = { ...route.params, ...route.query };
    const passReset = !!params.id && !!params.expires && !!params.signature;
    const user = store.state.auth.user;
    let redirectTo = "";
    // Allow relative paths only - strip protocol/host/port if they exist.
    redirectTo = redirectTo.replace(
      /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//,
      ""
    );
    redirectTo = (redirectTo.startsWith("/") ? "" : "/") + redirectTo;
    return {
      user,
      redirectTo,
      passReset
    };
  },

  data: () => ({
    user: null,
    redirectTo: "/",
    passReset: false
  }),

  methods: {
    async resolveLogin() {
      // temporary login
      const uri = this.$route.fullPath;
      const request = await this.$axios.get(uri);
      let user = request.data;
      // store user session
      if (request.status === 200) {
        // Save the token.
        await this.$store.dispatch("auth/saveToken", {
          token: user.access_token,
          remember: Date.parse(user.expires_at)
        });
        // store user data
        this.$store.dispatch("auth/fetchUser");
      } else {
        this.$router.push("/auth/login");
      }
    }
  },

  async mounted() {
    this.$store.commit("app/SET_TITLE", this.title);
    // if (this.passReset && !this.user) return this.resolveLogin()
    // decide
    if (this.user) {
      if (this.user.next_stage === "end") {
        return this.$router.push("/");
      } else if (this.user.next_stage === "personal_details") {
        return this.$router.push("/personal-details");
      } else if (this.user.next_stage === "contact_details") {
        return this.$router.push("/contact-details");
      } else if (this.user.next_stage === "sponsor_information") {
        return this.$router.push("/sponsor-information");
      } else if (this.user.next_stage === "education_history") {
        return this.$router.push("/education-history");
      } else if (this.user.next_stage === "qualification_information") {
        return this.$router.push("/qualification-information");
      } else if (this.user.next_stage === "document_upload") {
        return this.$router.push("/document-uploads");
      } else if (this.user.next_stage === "bursary_application") {
        return this.$router.push("/bursary-application");
      }else {
        return this.$router.push("/");
      }
      // this.$router.push(this.redirectTo || '/')
    } else {
      return this.$router.push("/auth/login");
    }
  }
};
</script>
