<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-6 d-flex align-items-center mt-1 ml-1">
                <h6 class="mb-0">Cash Position</h6>
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
import ListComponent from "../../components/CashPosition/ListComponent.vue";

export default {
  components: { DashboardFooter, ListComponent },
};
</script>
