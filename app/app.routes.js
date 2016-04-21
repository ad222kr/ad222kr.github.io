app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  "use strict";
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state("home", {
      // smth else later
      url: "/",
      templateUrl: "app/components/pub/views/pub-list.html",
      controller: "ListPubsController",
      controllerAs: "pubs",
    })
    .state("pubs", {
      url: "/pubs",
      templateUrl: "app/components/pub/views/pub-list.html",
      controller: "ListPubsController",
      controllerAs: "pubs",
    })
    .state("pub", {
      url: "/pubs/:id",
      templateUrl: "app/components/pub/views/pub-details.html",
      controller: "DetailsPubController",
      controllerAs: "pub",
    })
    .state("login", {
      url: "/login",
      templateUrl: "app/components/auth/views/login.html",
      controller: "LoginController",
      controllerAs: "LoginCtrl",
    })
    .state("my-pubs", {
      url: "/my-pubs",
      templateUrl: "app/components/pub/views/pub-list.html",
      controller: "MyPubsController",
      controllerAs: "pubs",
      authenticated: true,
      resolve: {
        auth: function($q, AuthService, $location) {
          var deferred = $q.defer();
          var user = AuthService.getUser();
          console.log(user);
          if (user) {
            console.log("authenticated");
            return $q.when(user);
          } else {
            console.log("I am being rejected");
            //$location.path("/login"); // works here but not in logout?????????
            return $q.reject({ authenticated: false, hehe: function() { console.log("rejected"); } });
          }

        }
      }
    })
    .state("logout", {
      url: "/logout",
      resolve: {
        logout: ["$location", "AuthService", "$state", function($location, AuthService, $state) {
          AuthService.logoutUser();
          $state.transitionTo("login");
        }]
      }
    });
});
