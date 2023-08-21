<template>
  <table class="table align-items-center mb-0">
    <thead>
      <tr>
        <th
          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          v-for="(header, index) in headers" :key="index"
        >
          {{header.label}}
        </th>
        <th class="text-secondary opacity-7"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, index) in data" :key="index">
        <td>
          <div class="d-flex px-2 py-1">
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm">{{ value.key }}</h6>
            </div>
          </div>
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
</template>
<script>
export default {
  props: {
    headers: {
      retuired: true,
      type: Array
    },
    data: {
      required: true,
      type: Array
    }
  }
};
</script>
