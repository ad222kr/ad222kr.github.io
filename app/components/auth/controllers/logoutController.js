angular
  .module("pub-map")
  .controller("LogoutController", LogoutController);

LogoutController.$inject = ["AuthService", "$location"];

/**
 * Handles signin out the user
 * 
 * @param $location - Angular location module
 */
function LogoutController($location) {
  AuthService.logoutUser();
  $location.path("/login");
}
