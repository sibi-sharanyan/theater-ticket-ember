import Component from "@ember/component";

export default Component.extend({
  mydata: Ember.inject.service("mydata"),
  init() {
    this._super(...arguments);
    this.set("seats", this.get("mydata").seats);
    this.set("arrayofseats", []);
    this.set("name", this.get("mydata").userdetails.name);
    this.set("user", this.get("mydata").userdetails);
    var seats = this.get("seats");
    var data = "";
    for (var i = 0; i < seats.length; i++) {
      data = data + seats[i];
      if (i != seats.length - 1) data = data + "-";
    }
    var skey = encodeURIComponent("seats");
    var sval = encodeURIComponent(data);

    var ukey = encodeURIComponent("user");
    var uval = encodeURIComponent(this.get("name"));
    var cost = 0;
    var postdata = skey + "=" + sval + "&" + ukey + "=" + uval;
    $.ajax({ url: "/ticketapp/booknow", method: "POST", data: postdata }).then(
      data1 => {
        // alert("done");
        $.ajax("/ticketapp/seat").then(data => {
          for (var i = 0; i < seats.length; i++) {
            for (var j = 0; j < data.data.length; j++) {
              if (data.data[j].seatId == seats[i]) {
                cost = cost + Number(data.data[j].cost);
                this.get("arrayofseats").pushObject(data.data[j]);
              }
            }
          }

          $.ajax("/ticketapp/records").then(data => {
            for (var k = 0; k < data.data.length; k++) {
              if (data.data[k].id == this.get("arrayofseats")[0].showId) {
                this.set("showobj", data.data[k]);
                break;
              }
            }
            $.ajax("/ticketapp/movie").then(data => {
              for (var t = 0; t < data.data.length; t++) {
                if (data.data[t].movieName == this.get("showobj").movieName) {
                  this.set("cost", cost);
                  this.set("movieobj", data.data[t]);
                  this.set(
                    "qrcode",
                    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                      this.get("mydata").userdetails.name +
                      this.get("mydata").userdetails.email +
                      this.get("mydata").userdetails.pass
                  );
                  break;
                }
              }
            });
          });
        });
      }
    );
  },
  actions: {
    sendmail() {
      var mail = prompt("Enter Email Id");
      var printContents = document.getElementById("printableArea").innerHTML;
      var mailkey = encodeURIComponent("mailid");
      var contentkey = encodeURIComponent("mailcont");

      var mailval = encodeURIComponent(mail);
      var contentval = encodeURIComponent(printContents);

      var postdata =
        mailkey + "=" + mailval + "&" + contentkey + "=" + contentval;
      $.ajax({
        url: "/ticketapp/sendmail",
        method: "POST",
        data: postdata
      }).then(data => {
        alert(data.data);
      });
    },
    sendsms() {
      var phno = prompt("Enter Your Phone Number");
      var msg =
        "Your Ticket Has been Booked Please show this QR code to get your tickets " +
        this.get("qrcode");

      var phnokey = encodeURIComponent("phone");
      var msgkey = encodeURIComponent("msg");

      var phnoval = encodeURIComponent(phno);
      var msgval = encodeURIComponent(msg);

      var postdata = phnokey + "=" + phnoval + "&" + msgkey + "=" + msgval;
      $.ajax({
        url: "/ticketapp/sendsms",
        method: "POST",
        data: postdata
      }).then(data => {
        alert(data.data);
      });
    }
  }
});
