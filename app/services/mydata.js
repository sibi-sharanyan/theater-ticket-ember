import Service from "@ember/service";

export default Service.extend({
  items: null,
  movie: null,
  showid: null,
  init() {
    this._super(...arguments);
    this.set("items", []);
    this.set("seats", []);
  },

  add(item) {
    this.get("items").pushObject(item);
  },
  setMovie(movie) {
    this.set("movie", movie);
  },
  setshowid(showid) {
    this.set("showid", showid);
  },
  addSeat(seat) {
    this.get("seats").pushObject(seat);
  },
  removeSeat(seat) {
    this.get("seats").removeObject(seat);
  },
  loginuser(name, email, pass) {
    this.set("userdetails", { name: name, email: email, pass: pass });
  }
});
