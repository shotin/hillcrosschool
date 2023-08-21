export default ({ store, redirect, query, route }) => {
  if (store.getters["auth/check"]) {
    let user = store.getters["auth/user"];
    if (route.name === "index" && user.registered_stages.includes("end")) {
      console.log(user.registered_stages.includes("end"));
      // return redirect("/");
    } else if (
      route.name === "personal-details" &&
      user.registered_stages &&
      user.registered_stages.includes("personal_details")
    ) {
      console.log(user.registered_stages.includes("personal_details"));
      // return redirect("/personal-details");
    } else if (
      route.name === "contact-details" &&
      user.registered_stages &&
      user.registered_stages.includes("contact_details")
    ) {
      console.log(user.registered_stages.includes("contact_details"));
      // return redirect("/contact-details");
    } else if (
      route.name === "sponsor-information" &&
      user.registered_stages &&
      user.registered_stages.includes("sponsor_information")
    ) {
      console.log(user.registered_stages.includes("sponsor_information"));
      // return redirect("/sponsor-information");
    } else if (
      route.name === "education-history" &&
      user.registered_stages &&
      user.registered_stages.includes("education_history")
    ) {
      console.log(user.registered_stages.includes("education_history"));
      // return redirect("/education-history");
    } else if (
      route.name === "qualification-information" &&
      user.registered_stages &&
      user.registered_stages.includes("qualification_information")
    ) {
      console.log(user.registered_stages.includes("qualification_information"));
      // return redirect("/qualification-information");
    } else if (
      route.name === "document-upload" &&
      user.registered_stages &&
      user.registered_stages.includes("document_upload")
    ) {
      console.log(user.registered_stages.includes("document_upload"));
      // return redirect("/document-uploads");
    } else {
        return redirect("/personal-details");
    }
  }
};
