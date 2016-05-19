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
    .state("new-pub", {
      url: "/pubs/new",
      templateUrl: "app/components/pub/views/new-pub.html",
      controller: "AddPubController",
      controllerAs: "pub",
      resolve: {
        // DRY here
        auth: authenicate
        
      }
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
      resolve: {
        auth: authenicate
      }
    })
    .state("edit-pub", {
      url: "/pubs/:id/edit",
      templateUrl: "app/components/pub/views/edit-pub.html",
      controller: "EditPubController",
      controllerAs: "EditCtrl",
      resolve: {
        auth: authenicate
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

function authenicate($q, AuthService, $location) {
  var deffered = $q.defer();
  var user = AuthService.getCurrentUser();
  if (user) { return $q.when(user); }
  else {
    $location.path("/login");
    return $q.reject({ authenticated: false })
  }
}
