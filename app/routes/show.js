import Route from "@ember/routing/route";

export default Route.extend({
  mydata: Ember.inject.service("mydata"),
  init() {
    this._super(...arguments);
    this.get("mydata");
  }
});
