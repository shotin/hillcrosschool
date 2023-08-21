module.exports = [
  {
    name: "login",
    path: "/auth/login",
    component: "./pages/auth/login.vue"
  },
  {
    name: "register",
    path: "/auth/register",
    component: "./pages/auth/register.vue"
  },
  {
    name: 'idverify',
    path: "/auth/idverify/:student_id",
    component: "./pages/auth/idverify.vue"
  },  
  {
    name: "verify",
    path: "/auth/verify/:id",
    component: "./pages/auth/verify.vue"
  },
  {
    name: "forget",
    path: "/auth/password/forget",
    component: "./pages/auth/forget.vue"
  },
  {
    name: "reset",
    path: "/auth/password/reset",
    component: "./pages/auth/reset.vue"
  },
  {
    name: "dashboard",
    path: "/",
    component: "./pages/index.vue"
  },
  {
    name: "profile",
    path: "/accounts/profile",
    component: "./pages/user/profile.vue"
  },
  {
    name: "personal-details",
    path: "/personal-details",
    component: "./pages/registration/personal.vue"
  },
  {
    name: "contact-details",
    path: "/contact-details",
    component: "./pages/registration/contact.vue"
  },
  {
    name: "sponsor-information",
    path: "/sponsor-information",
    component: "./pages/registration/sponsor.vue"
  },
  {
    name: "education-history",
    path: "/education-history",
    component: "./pages/registration/education.vue"
  },
  {
    name: "qualification-information",
    path: "/qualification-information",
    component: "./pages/registration/qualification.vue"
  },
  {
    name: "document-uploads",
    path: "/document-uploads",
    component: "./pages/registration/document.vue"
  },
  {
    name: "acknowledgement",
    path: "/acknowledgement",
    component: "./pages/registration/acknowledgement.vue"
  }
];
