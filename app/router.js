import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('show');
  this.route('seat');
  this.route('home');
  this.route('ticket');
  this.route('login');
});

export default Router;
