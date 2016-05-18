angular
  .module("pub-map")
  .controller("EditPubController", EditPubController)
  
EditPubController.$inject = [
  "PubService", 
  "AuthService", 
  "TagService",
  "$location",
  "Flash",
  "$stateParams"
];

function EditPubController(PubService, AuthService, TagService, $location, Flash, $stateParams) {
  var vm = this;
  vm.loaded = false;
  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      
      vm.loaded = true;
      vm.pub = {
        name: res.pub.name
      }
      console.log(res.pub);
      vm.pub.name = res.pub.name;
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
  
}