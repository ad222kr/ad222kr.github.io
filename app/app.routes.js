app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  "use strict";
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state("home", {
      // smth else later
      url: "/",
      templateUrl: "app/components/pub/views/pub-list.html",
      controller: "ListPubsController",
      controllerAs: "pubs"
    })
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
    })
    .state("login", {
      url: "/login",
      templateUrl: "app/components/auth/views/login.html",
      controller: "LoginController",
      controllerAs: "LoginCtrl"
    })
    .state("logout", {
      url: "/logout",
      resolve: {
        logout: ["$location", "AuthService", function($location, AuthService) {
          AuthService.logoutUser();
          $location.url("/login");
        }]
      }
    });

  app.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.on("$routeChangeSuccess", function(user) {
      console.log(user);
    });

    $rootScope.on("$routeChangeError", function(event, current, previous, eventObj) {
      if (!eventObj.authenticated) {
        $location.path("/login");
      }
    });
  }]);

});
