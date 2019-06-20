import Component from "@ember/component";

export default Component.extend({
  mydata: Ember.inject.service("mydata"),
  actions: {
    userlogin(name, mail, pass) {
      this.get("mydata").loginuser(name, mail, pass);
      var namekey = encodeURIComponent("name");
      var emailkey = encodeURIComponent("email");
      var passkey = encodeURIComponent("pass");

      var nameval = encodeURIComponent(name);
      var emailval = encodeURIComponent(mail);
      var passval = encodeURIComponent(pass);

      var postdata =
        namekey +
        "=" +
        nameval +
        "&" +
        emailkey +
        "=" +
        emailval +
        "&" +
        passkey +
        "=" +
        passval;

      $.ajax({ url: "/ticketapp/user", method: "POST", data: postdata });
    }
  }
});
