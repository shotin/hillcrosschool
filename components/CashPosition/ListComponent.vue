<template>
  <div class="card-body px-0 pt-0 pb-2" v-if="type === 'positions'">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Cash at Bank
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              Cico Wallet Balance
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Agent Wallet Balance
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Settlement Expectation
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Cash Position
            </th>
            <th class="text-secondary opacity-7"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(position, index) in positions" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ position.cash_bank }}</h6>
                </div>
              </div>
            </td>
            <td>
              <h6 class="mb-0 text-sm">{{ position.cico_wallet }}</h6>
            </td>
            <td class="align-middle text-center text-sm">
              <h6 class="mb-0 text-sm">{{ position.agent_wallet }}</h6>
            </td>
            <td class="align-middle text-center">
              <h6 class="mb-0 text-sm">{{ position.expectation }}</h6>
            </td>
            <td class="align-middle text-center">
              <h6 class="mb-0 text-sm">{{ position.position }}</h6>
            </td>
            <td class="align-middle text-center">
              <h6 class="mb-0 text-sm">{{ position.transaction_date }}</h6>
            </td>
            <td class="align-middle"></td>
          </tr>
        </tbody>
      </table>
      <hr />
      <paginate
        :pagination="records"
        @paginate="positions"
        :offset="4"
        :emitTo="`position_pagination`"
        class="mb-1 ml-2"
        v-if="positions.length"
      />
    </div>
  </div>
  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import Paginate from "@/components/Pagination.vue";
export default {
  components: {
    Loader,
    Paginate
  },
  data() {
    return {
      records: this.getRecords()
    };
  },
  computed: {
    ...mapGetters({
      positions: "app/pageData",
      type: "app/pageType"
    })
  },
  mounted() {
    let self = this;
    this.$root.$on("position_pagination", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getPositions();
      }
    });
    this.getPositions();
  },
  methods: {
    getPositions() {
      this.$axios
        .get(`/cash-positions?page=${this.records.current_page}`)
        .then(res => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "positions");
          this.records = res.data.meta;
        })
        .catch(err => {});
    },
    getRecords() {
      return {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      };
    }
  }
};
</script>
