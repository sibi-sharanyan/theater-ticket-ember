import Component from "@ember/component";

export default Component.extend({
  mydata: Ember.inject.service("mydata"),
  init() {
    this._super(...arguments);
    $.ajax("/ticketapp/movie").then(data => {
      var movies = [];
      for (var i = 0; i < data.data.length; i++) {
        movies.push(data.data[i]);
      }

      this.set("arrayOfMovies", movies);
    });
  },
  actions: {
    testAction(name) {
      this.get("mydata").setMovie(name);
      //   alert(this.get("mydata").movie);
    }
  }
});
