angular
  .module("pub-map")
  .controller("LoginController", LoginController);

LoginController.$inject = ["AuthService"];

function LoginController(AuthService) {
  vm = this;
  vm.login = function() {

    AuthService.authenticateUser(vm.username, vm.password)
      .then(function(res) {
        console.log("Logged in!");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  var setCurrentUser = function(user) {
    console.log(user);
  }

}
