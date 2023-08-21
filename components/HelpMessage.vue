<template>
  <div class="fixed-plugin">
    <img src="../static/assets/img/help-button.png" style="border-radius: 0px;" alt="Need Help" @click="showOption()" class="fixed-plugin-button text-dark position-fixed">
    <div class="card shadow-lg">
      <span class="text-center pt-10" style="color: #006b5d" v-if="showSuccess">
        <svg
          width="81"
          height="80"
          viewBox="0 0 92 91"
          style="margin-bottom: 8px"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M62.6183 31.3701H58.4504C57.544 31.3701 56.682 31.8056 56.1488 32.552L42.1789 51.9251L35.8515 43.145C35.3183 42.4074 34.4652 41.9631 33.5499 41.9631H29.382C28.8043 41.9631 28.4667 42.6207 28.8043 43.0917L39.8772 58.448C40.1388 58.813 40.4836 59.1105 40.8831 59.3158C41.2826 59.521 41.7253 59.628 42.1744 59.628C42.6236 59.628 43.0662 59.521 43.4657 59.3158C43.8652 59.1105 44.2101 58.813 44.4716 58.448L63.1871 32.4987C63.5336 32.0277 63.1959 31.3701 62.6183 31.3701Z"
            fill="#006B5D"
          />
          <path
            d="M46 5.6875C24.0143 5.6875 6.1875 23.5143 6.1875 45.5C6.1875 67.4857 24.0143 85.3125 46 85.3125C67.9857 85.3125 85.8125 67.4857 85.8125 45.5C85.8125 23.5143 67.9857 5.6875 46 5.6875ZM46 78.5586C27.7467 78.5586 12.9414 63.7533 12.9414 45.5C12.9414 27.2467 27.7467 12.4414 46 12.4414C64.2533 12.4414 79.0586 27.2467 79.0586 45.5C79.0586 63.7533 64.2533 78.5586 46 78.5586Z"
            fill="#006B5D"
          />
        </svg>

        <h4 style="color: #006b5d">Form Submitted</h4>
        <p>
          You have successfully submitted <br />
          your callback form.
        </p>
        <p>We would be in touch.</p>
        <div class="text-left w-200">
          <button
            type="button"
            @click="closeSlide()"
            class="btn custom-link fixed-plugin-close-button"
            style="background-color: #006b5d; color: #ffffff"
          >
            Close
          </button>
        </div>
      </span>
      <span v-else>
        <div class="card-header pb-0 pt-4">
          <div class="float-start">
            <h5 class="mt-3 mb-0" style="color: #006b5d">
              Your Contact Information
            </h5>
            <p style="font-size: 11px; color: #dc3545">
              Please fill your personal information, we'll be in touch.
            </p>
          </div>
          <div class="float-end mt-4">
            <button
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i class="fa fa-close"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>
        <hr class="horizontal dark my-1" />
        <div class="card-body pt-sm-3 pt-0">
          <form role="form" @submit.prevent="processHelp()">
            <label>First Name <span class="text-danger">*</span></label>
            <div class="mb-3">
              <input
                type="text"
                v-model="form.first_name"
                class="form-control"
                placeholder="Enter Your First Name"
                aria-label="fname"
                required
                aria-describedby="fname-addon"
              />
            </div>
            <validation-error
              :message="validationKeys.first_name.message"
              :showError="validationKeys.first_name.error"
            />
            <label>Last Name <span class="text-danger">*</span></label>
            <div class="mb-3">
              <input
                type="text"
                v-model="form.last_name"
                class="form-control"
                placeholder="Enter Your Last Name"
                aria-label="lname"
                required
                aria-describedby="lname-addon"
              />
            </div>
            <validation-error
              :message="validationKeys.last_name.message"
              :showError="validationKeys.last_name.error"
            />
            <div class="mb-3">
              <label for=""
                >Phone Number <span class="text-danger">*</span></label
              >
              <vue-phone-number-input
                v-model="telephone"
                :default-country-code="`ZA`"
                :required="true"
                @update="phoneResult = $event"
              />
              <validation-error
                :message="validationKeys.phone_number.message"
                :showError="validationKeys.phone_number.error"
              />
            </div>
            <label>Email <span class="text-danger">*</span></label>
            <div class="mb-3">
              <input
                type="email"
                v-model="form.email"
                class="form-control"
                placeholder="Enter Your Email"
                aria-label="email"
                required
                aria-describedby="email-addon"
              />
            </div>
            <validation-error
              :message="validationKeys.email.message"
              :showError="validationKeys.email.error"
            />
            <label>Message <span class="text-danger">*</span></label>
            <div class="mb-3">
              <textarea
                v-model="form.message"
                class="form-control"
                placeholder="Enter Your Message"
                aria-label="message"
                required
                aria-describedby="message-addon"
              ></textarea>
            </div>
            <validation-error
              :message="validationKeys.message.message"
              :showError="validationKeys.message.error"
            />
            <div class="text-center">
              <custom-button
                :name="`SUBMIT`"
                :type="`submit`"
                :loading="loading"
                :disabled="disabled"
              />
            </div>
          </form>
        </div>
      </span>
    </div>
  </div>
</template>
<script>
import CustomButton from "../components/Button.vue";
import { handleError, notify } from "../assets/js/utility";
import ValidationError from "../components/ValidationError.vue";
export default {
  components: { CustomButton, ValidationError },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      showSuccess: false,
      hasMessage: false,
      stage: false,
      phoneResult: "",
      telephone: "",
      validationKeys: {
        first_name: {
          error: false,
          message: "",
        },
        last_name: {
          error: false,
          message: "",
        },
        email: {
          error: false,
          message: "",
        },
        phone_number: {
          error: false,
          message: "",
        },
        message: {
          error: false,
          message: "",
        },
      },
    };
  },
  methods: {
    showOption() {
      if (document.querySelector(".fixed-plugin")) {
        var fixedPlugin = document.querySelector(".fixed-plugin");
        var fixedPluginButton = document.querySelector(".fixed-plugin-button");
        var fixedPluginButtonNav = document.querySelector(
          ".fixed-plugin-button-nav"
        );
        var fixedPluginCard = document.querySelector(".fixed-plugin .card");
        var fixedPluginCloseButton = document.querySelectorAll(
          ".fixed-plugin-close-button"
        );
        var navbar = document.getElementById("navbarBlur");
        var buttonNavbarFixed = document.getElementById("navbarFixed");
        
        if (fixedPluginButton) {
          if (!fixedPlugin.classList.contains("show")) {
            fixedPlugin.classList.add("show");
            console.log(fixedPlugin)
          } else {
            fixedPlugin.classList.remove("show");
          }
        }

        if (fixedPluginButtonNav) {
          fixedPluginButtonNav.onclick = function () {
            if (!fixedPlugin.classList.contains("show")) {
              fixedPlugin.classList.add("show");
            } else {
              fixedPlugin.classList.remove("show");
            }
          };
        }

        fixedPluginCloseButton.forEach(function (el) {
          el.onclick = function () {
            fixedPlugin.classList.remove("show");
          };
        });

        document.querySelector("body").onclick = function (e) {
          if (
            e.target != fixedPluginButton &&
            e.target != fixedPluginButtonNav &&
            e.target.closest(".fixed-plugin .card") != fixedPluginCard
          ) {
            fixedPlugin.classList.remove("show");
          }
        };

        if (navbar) {
          if (navbar.getAttribute("navbar-scroll") == "true") {
            buttonNavbarFixed?.setAttribute("checked", "true");
          }
        }
      }
    },
    async processHelp() {
      this.loading = true;
      this.disabled = true;
      if (this.phoneResult) {
        this.form.phone_number = `${this.phoneResult.countryCode} ${this.telephone}`;
      }
      await this.$axios
        .post("/help/message", this.form)
        .then((res) => {
          this.stopLoader();
          // notify("Form submitted successfully", "success");
          this.form = this.getForm();
          this.showSuccess = true;
          this.phoneResult = "";
          this.telephone = "";
        })
        .catch((error) => {
          this.stopLoader();
          if (error.response.status === 422) {
            this.hasMessage = true;
            for (var validationKey in error.response.data.errors) {
              error.response.data.errors[validationKey].forEach(
                (validationElement) => {
                  for (var key in this.validationKeys) {
                    if (key == validationKey) {
                      this.validationKeys[validationKey].error = true;
                      this.validationKeys[validationKey].message =
                        validationElement;
                    }
                  }
                }
              );
            }
          } else {
            handleError(error);
          }
        });
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    getForm() {
      return {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        message: "",
      };
    },
    closeSlide() {
      this.showSuccess = false;
    },
  },
};
</script>
