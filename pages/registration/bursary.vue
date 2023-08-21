<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12 col-sm-12 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
};
</script>
