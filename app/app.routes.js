app.config(function($routeProvider, $locationProvider) {
  "use strict";
  var indexRoute = {
    controller: "MyController"
  };

  $routeProvider
  .when("/", indexRoute);



  $locationProvider.html5Mode(true);
});
