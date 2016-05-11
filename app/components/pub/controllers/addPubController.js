angular
  .module("pub-map")
  .controller("AddPubController", AddPubController);

AddPubController.$inject = ["PubService", "AuthService"];

function AddPubController(PubService, AuthService) {
  console.log("hehehe add pub");
  var vm = this;
  
  vm.create = function() {
    console.log(vm.name);
    console.log(vm.phone);
    console.log(vm.address);
    console.log(vm.description);
  }
}