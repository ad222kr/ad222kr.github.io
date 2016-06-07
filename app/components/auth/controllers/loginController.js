angular
  .module("pub-map")
  .controller("LoginController", LoginController);

LoginController.$inject = ["AuthService", "$location"];

/**
 * Handles signin in users in the application
 * 
 * @param AuthService - Authentication Factory
 * @param $location - Angular location module
 */
function LoginController(AuthService, $location) {
  vm = this;
  vm.login = function() {

    AuthService
      .authenticateUser(vm.username, vm.password)
      .then(function(res) {
        var user = { email: vm.username, token: res.data.jwt };
        AuthService.loginUser(user);
      })
      .then(function(res) {
        $location.url("/pubs");
      })
      .catch(function(error) {
        console.error("404 currentUser not found");
        $location.url("/login");
      });
  }
}
