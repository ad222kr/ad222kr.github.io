angular
  .module("pub-map")
  .controller("LoginController", LoginController);

LoginController.$inject = ["AuthService", "$location"];

function LoginController(AuthService, $location) {
  vm = this;
  vm.login = function() {

    AuthService.authenticateUser(vm.username, vm.password)
      .then(function(res) {
        $location.url("/pubs");
        console.log("Logged in!");
      })
      .catch(function(error) {
        $location.url("/login");
        console.log(error);
      });
  }
}
