<template>
  <button :type="type" :disabled="disabled" :class="customClass">
    <i class="fa fa-refresh fa-spin" v-if="loading"></i> {{name}}
  </button>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'button'
    },
    customClass: {
      type: String,
      default: "btn bg-gradient-info w-100 mt-4 mb-0"
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
