angular
  .module("pub-map")
  .controller("LoginController", LoginController);

LoginController.$inject = ["AuthService"];

function LoginController(AuthService) {
  vm = this;
  vm.login = function() {

    AuthService
      .authenticateUser(vm.username, vm.password)
      .then(function(resp) {
        console.log(resp.data.jwt);
      }, function(error) {
        console.log(error);
      });
  }
}
