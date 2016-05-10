angular
  .module("pub-map")
  .controller("LoginController", LoginController);

LoginController.$inject = ["AuthService", "$location"];

function LoginController(AuthService, $location) {
  vm = this;
  vm.login = function() {

    AuthService
      .authenticateUser(vm.username, vm.password)
      .then(function(res) {
        console.log("200 user found");
        var user = { email: vm.username, token: res.data.jwt };
        AuthService.loginUser(user);
      })
      .then(function(res) {
        $location.url("/pubs");
        console.log("Logged in!");
      })
      .catch(function(error) {
        console.error("404 currentUser not found");
        $location.url("/login");
        console.log(error);
      });
  }
}
