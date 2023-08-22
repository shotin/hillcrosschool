<template>
  <div class="container-fluid py-4">
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6 offset-lg-3">
                <div class="d-flex flex-column h-100">
                  <form role="form" @submit.prevent="processChangePassword()">
                    <label class="custom-text">Student ID</label>
                    <div class="mb-3">
                      <input
                        type="text"
                        v-model="user.student_id"
                        class="form-control"
                        aria-label="Email"
                        disabled
                        required
                        aria-describedby="email-addon"
                      />
                    </div>
                    <label class="custom-text">Current Password</label>
                    <div class="mb-3">
                      <input
                        type="password"
                        v-model="form.old_password"
                        class="form-control"
                        placeholder="Current Password"
                        aria-label="Password"
                        required
                        aria-describedby="password-addon"
                      />
                    </div>
                    <label class="custom-text">New Password</label>
                    <div class="mb-3">
                      <input
                        type="password"
                        v-model="form.new_password"
                        class="form-control"
                        placeholder="New Password"
                        aria-label="Password"
                        required
                        aria-describedby="password-addon"
                      />
                    </div>
                    <label class="custom-text">Confirm New Password</label>
                    <div class="mb-3">
                      <input
                        type="password"
                        v-model="form.re_new_password"
                        class="form-control"
                        placeholder="Confirm New Password"
                        aria-label="Password"
                        required
                        aria-describedby="password-addon"
                      />
                    </div>
                    <div class="text-center">
                      <custom-button
                        :name="`Update`"
                        :type="`submit`"
                        :customClass="`btn bg-gradient-info w-50 mt-4 mb-0`"
                        :loading="loading"
                        :disabled="disabled"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { handleError, notify } from "../../assets/js/utility";
import CustomButton from "../../components/Button.vue";
export default {
  components: { CustomButton },
  mounted() {
    this.$store.commit('app/SET_TITLE', 'Profile')
  },
  data() {
    return {
      form: this.getForm(),
      disabled: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    getForm() {
      return {
        old_password: "",
        new_password: "",
        re_new_password: ""
      };
    },
    processChangePassword() {
      this.$axios
        .patch("/users/change-password", this.form)
        .then(res => {
          this.form = this.getForm();
          notify("Account updated successfully", "success");
        })
        .catch(err => {
          notify("Password reset not successful", "success");
        });
    }
  }
};
</script>
<style>
.text-gradient.text-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545);
}
.bg-gradient-info {
  background-image: linear-gradient(310deg, #dc3545, #dc3545 100%);
}
</style>
