app.config(function($routeProvider, $locationProvider) {
  "use strict";
  var indexRoute = {
    controller: "ListPubsController",
    controllerAs: "pubs",
    templateUrl: "app/components/pub/views/pub-list.html"
  };

  $routeProvider
  .when("/", indexRoute)
  .otherwise("/");



  $locationProvider.html5Mode(true);
});
