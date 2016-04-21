var app = angular.module('pub-map', ["ui.router", "ngMap", "ngResource"]);

app.config(function($httpProvider) {
  $httpProvider.defaults.cache = true;
});
app.config(function($logProvider){
  $logProvider.debugEnabled(true);
});

app.run(function($rootScope, $state, AuthService) {

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    // THIS DOES NOT FIRE ON A STATE CHANGE SUCCESS GOD WHY
    console.log("$stateChangeSuccess");
  });

  $rootScope.$on("$stateChangeError", function(event, toState, fromState, fromParams, error) {
    console.log("yayayaya");
    if (error.authenticated === false) {
      // this does not fire, why? :(
      console.log("$routeChangeError");
      $state.transitionTo("/login");
    }
  });
})
