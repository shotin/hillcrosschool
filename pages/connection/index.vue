<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-6 d-flex align-items-center mt-1 ml-1">
                <h6 class="mb-0">Bank Connection</h6>
              </div>
              <div class="col-6 text-end mt-1 mr-1">
                <button
                  class="btn bg-gradient-dark mb-0"
                  @click="launchMono"
                  type="button"
                >
                  <i class="fas fa-plus"></i> New Connection
                </button>
              </div>
            </div>
          </div>
          <p><br /></p>
          <list-component />
        </div>
      </div>
    </div>
    <!-- <dashboard-footer /> -->
  </div>
</template>

<script>
import DashboardFooter from "@/layouts/partials/DashboardFooter.vue";
import ListComponent from "../../components/BankConnection/ListComponent.vue";
import Button from "../../components/Button.vue";
import { handleError, notify } from "@/assets/js/utility";
export default {
  components: { DashboardFooter, ListComponent, Button },
  methods: {
    launchMono() {
      let self = this
      const options = {
        onSuccess: function(response) {
          self.storeAccount(response);
          self.$root.$emit("connection_pagination", {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
          });
        },
        onClose: function() {
          // alert("user closed the widget.");
        }
      };
      this.$launchMono(options);
    },
    storeAccount(response) {
      this.$axios
        .post("/bank-connections/accounts", {
          "code": response.code
        })
        .then(res => {
          notify("Account added successfully", "success");
        })
        .catch(err => {
          handleError(err);
        });
    }
  }
};
</script>
