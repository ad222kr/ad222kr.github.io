angular
  .module("pub-map")
  .controller("DeletePubController", DeletePubController);
  
DeletePubController.$inject = [
  "PubService",
  "AuthService",
  "$location",
  "Flash",
  "$stateParams"
];

function DeletePubController(PubService, AuthService, $location, Flash, $stateParams) {
  Flash.clear();
  var vm = this;
  vm.loaded = false;
  
  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      vm.pub = res.pub;
      console.log(vm.pub);
      vm.loaded = true;
    })
    .catch(function(error) {
      
    });
  
  vm.confirmDelete = function() {
    console.log("YEAH DELETE IT BABY");
  }
  
  vm.cancelDelete = function() {
    console.log("Hell no");
  }
    
  
}