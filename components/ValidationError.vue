<template>
    <div class="error-validation" v-if="showError">
        <img src="/assets/img/Vector.png" alt=""> {{message}}
    </div>
</template>
<script>
export default {
    props : {
        message: {
            required: true,
            type: String
        },
        showError: {
            required: true,
            type: Boolean
        },
    }
}
</script>
<style>
.error-validation {
  color: #dc3545;
  font-size: small;
  font-weight: bold;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>