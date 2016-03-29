app.config(function($stateProvider, $urlRouterProvider) {
  "use strict";
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state("pubs", {
      url: "/",
      templateUrl: "app/components/pub/views/pub-list.html",
      controller: "ListPubsController",
      controllerAs: "pubs"
    });

});
