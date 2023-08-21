<template>
  <span
    class="g-sidenav-show custom-auth-content bg-gray-100"
    id="toggle-side-menu"
  >
    <side-bar />
    <main
      class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg"
    >
      <!-- Navbar -->
      <navigation />
      <!-- End Navbar -->
      <nuxt />
    </main>
    <!-- <settings-configurator /> -->
    <help-message />
  </span>
</template>
<script>
import SettingsConfigurator from "../components/SettingsConfigurator.vue";
import PageFooter from "./partials/Footer.vue";
import NavBar from "./partials/NavBar.vue";
import Navigation from "./partials/Navigation.vue";
import SideBar from "./partials/SideBar.vue";
import HelpMessage from '../components/HelpMessage.vue';
export default {
  middleware: ["auth", "select"],
  components: { PageFooter, NavBar, SideBar, Navigation, SettingsConfigurator, HelpMessage },
  mounted() {
    var win = navigator.platform.indexOf("Win") > -1;
    if (win && document.querySelector("#sidenav-scrollbar")) {
      var options = {
        damping: "0.5",
      };
      Scrollbar.init(document.querySelector("#sidenav-scrollbar"), options);
    }
  },
};
</script>
<style>
.side-by-side-button {
  display: inline-block;
}
.custom-text {
  font-size: smaller !important;
  color: #006b5d;
}
.custom-auth-content {
  background-color: rgb(250, 244, 244);
}

html {
  background-color: rgb(250, 244, 244);
}
</style>
