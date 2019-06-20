import Component from "@ember/component";

export default Component.extend({
  mydata: Ember.inject.service("mydata"),
  init() {
    this._super(...arguments);
    this.get("mydata");
    $.ajax("/ticketapp/records").then(data => {
      var movie = this.get("mydata").movie;

      var shows = [];
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].movieName == movie) {
          shows.push({
            showName: data.data[i].showName,
            theaterName: data.data[i].theaterName,
            showTime: data.data[i].showTime,
            showid: data.data[i].id
          });
        }
      }

      $.ajax("/ticketapp/movie").then(data => {
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].movieName == movie) {
            this.set("movieobj", data.data[i]);
            break;
          }
        }
        this.set("arrayOfShows", shows);
      });
    });
  },
  actions: {
    testAction(showid) {
      this.get("mydata").setshowid(showid);
    }
  }
});
