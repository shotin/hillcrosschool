<template>
  <span class="custom-auth-content">
    <main class="main-content mt-0">
      <nuxt />
    </main>
    <!-- <page-footer /> -->
  </span>
</template>
<script>
import HelpMessage from '../components/HelpMessage.vue';
import PageFooter from "./partials/Footer.vue";
import NavBar from "./partials/NavBar.vue";
export default {
  components: { PageFooter, NavBar, HelpMessage  },
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
.custom-auth-content {
  background-color: rgb(250, 244, 244);
}
#__nuxt {
  background-color: rgb(250, 244, 244);
}
</style>
