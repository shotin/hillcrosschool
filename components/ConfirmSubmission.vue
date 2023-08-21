<template>
  <custom-button
    :name="`Submit`"
    :type="`submit`"
    :customClass="`btn bg-gradient-info w-60 mt-1`"
    :loading="loading"
    :disabled="disabled"
  />
</template>
<script>
import CustomButton from "@/components/Button.vue";
import Swal from "sweetalert2";
import { notify, handleError } from "@/assets/js/utility";

export default {
  props: {
    data: {
      required: true,
      type: Object
    },
    url: {
      required: true,
      type: String
    },
    storeItem: {
      required: true,
      type: String
    },
    want_block: {
      required: false
    }
  },
  components: {
    CustomButton
  },
  methods: {
    deleteSage() {
      Swal.fire({
        title: `Are you sure you want to remove "${this.data.name} from sage
        ?"`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#44c1c9",
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, cancel!",
        preConfirm: () => {
          return this.$axios
            .get(this.url)
            .then(res => {
              this.$store.commit(this.storeItem, this.data);
              notify(
                "Student record removed from sage successfully",
                "success"
              );
            })
            .catch(error => {
              handleError(error);
            });
        },
        allowOutsideClick: false
      });
    }
  }
};
</script>
