angular
  .module("pub-map")
  .controller("LogoutController", LogoutController);

LogoutController.$inject = ["AuthService", "$location"];

function LogoutController($location) {
  AuthService.logoutUser();
  $location.path("/login");
}
