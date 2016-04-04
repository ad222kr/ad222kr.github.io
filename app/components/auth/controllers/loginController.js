angular
  .module("pub-map")
  .controller("LoginController", LoginController);

function LoginController() {
  vm = this;
  vm.login = function() {
    console.log("Hey");
    console.log(vm.username);
    console.log(vm.password);
  }
}
