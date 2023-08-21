<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    id="navbarBlur"
    navbar-scroll="true"
  >
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li class="breadcrumb-item text-sm">
            <nuxt-link class="opacity-5 text-dark" to="/">Home</nuxt-link>
          </li>
          <li
            class="breadcrumb-item text-sm text-dark active"
            aria-current="page"
          >
            {{title}}
          </li>
        </ol>
        <h6 class="font-weight-bolder mb-0">{{title}}</h6>
      </nav>
      <div
        class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar"
      >
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <div class="input-group">
            <!-- <span class="input-group-text text-body"
              ><i class="fas fa-search" aria-hidden="true"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Type here..."
            /> -->
          </div>
        </div>
        <ul class="navbar-nav  justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <a
              href="javascript:;"
              @click="logout"
              class="nav-link text-body font-weight-bold px-0"
            >
              <i class="fa fa-user me-sm-1"></i>
              <span class="d-sm-inline d-none">Sign Out</span>
            </a>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="javascript:;"
              class="nav-link text-body p-0"
              id="iconNavbarSidenav"
              @click="openSideBar"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "auth/user",
      title: "app/pageTitle"
    })
  },
  methods: {
    ...mapActions({
      logout: "auth/logout"
    }),
    openSideBar() {
      const iconNavbarSidenav = document.getElementById("iconNavbarSidenav");
      const iconSidenav = document.getElementById("iconSidenav");
      const sidenav = document.getElementById("sidenav-main");
      let body = document.getElementById("toggle-side-menu");
      let className = "g-sidenav-pinned";
      if (iconNavbarSidenav) {
        iconNavbarSidenav.addEventListener(
          "click",
          this.toggleSidenav(body, sidenav, iconSidenav, className)
        );
      }
    },
    toggleSidenav(body, sidenav, iconSidenav, className) {
      if (body.classList.contains(className)) {
        body.classList.remove(className);
        setTimeout(function() {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
      } else {
        body.classList.add(className);
        // sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        iconSidenav.classList.remove("d-none");
      }
    }
  }
};
</script>
