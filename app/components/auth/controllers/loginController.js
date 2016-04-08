angular
  .module("pub-map")
  .controller("LoginController", LoginController);

LoginController.$inject = ["AuthService"];

function LoginController(AuthService) {
  vm = this;
  vm.login = function() {

    AuthService.authenticateUser(vm.username, vm.password)
      .then(function(resp) {
        var token = resp.jwt;
        console.log(resp);
        AuthService.getUserByEmail(vm.username)
          .then(function(resp) {
            setCurrentUser({
              username: vm.username,
              id: resp.data.id,
              token: token
            });
          }, function(error) {
            console.log("Error: " + error);
          })

        // LOGIN USAH HERE
      }, function(error) {
        // FLASHSHSHS MESHASHHGE
        console.log(error);
      });
  }

  var setCurrentUser = function(user) {
    console.log(user);
  }

}
