app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  "use strict";
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state("pubs", {
      url: "/pubs",
      templateUrl: "app/components/pub/views/pub-list.html",
      controller: "ListPubsController",
      controllerAs: "pubs"
    })
    .state("pub", {
      url: "/pubs/:id",
      templateUrl: "app/components/pub/views/pub-details.html",
      controller: "DetailsPubController",
      controllerAs: "pub"
    });

  $locationProvider.html5Mode(true);

});
