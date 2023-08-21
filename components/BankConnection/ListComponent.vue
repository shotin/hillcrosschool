<template>
  <div class="card-body px-0 pt-0 pb-2" v-if="type === 'connections'">
    <div class="table-responsive p-0">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Bank
            </th>
            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              Account Name
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Account Number
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              Account Type
            </th>
            <th class="text-secondary opacity-7"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(connection, index) in connections" :key="index">
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ connection.bank }}</h6>
                </div>
              </div>
            </td>
            <td>
              <h6 class="mb-0 text-sm">{{ connection.account_name }}</h6>
            </td>
            <td class="align-middle text-center text-sm">
              <h6 class="mb-0 text-sm">{{ connection.account_number }}</h6>
            </td>
            <td class="align-middle text-center">
              <h6 class="mb-0 text-sm">{{ connection.type }}</h6>
            </td>
            <td class="align-middle">
              <delete-button
                :want_block="false"
                :data="connection"
                :url="`/bank-connections/${connection.id}`"
                :storeItem="`app/REMOVE_DATA`"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <paginate
        :pagination="records"
        @paginate="connections"
        :offset="4"
        :emitTo="`connection_pagination`"
        class="mb-1 ml-2"
        v-if="connections.length"
      />
    </div>
  </div>
  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import Paginate from "@/components/Pagination.vue";
import DeleteButton from "../DeleteButton.vue";
export default {
  components: {
    Loader,
    Paginate,
    DeleteButton
  },
  data() {
    return {
      records: this.getRecords()
    };
  },
  computed: {
    ...mapGetters({
      connections: "app/pageData",
      type: "app/pageType"
    })
  },
  mounted() {
    let self = this;
    this.$root.$on("connection_pagination", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getConnections();
      }
    });
    this.getConnections();
  },
  methods: {
    getConnections() {
      this.$axios
        .get(`/bank-connections?page=${this.records.current_page}`)
        .then(res => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "connections");
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
