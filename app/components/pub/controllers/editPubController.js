angular
  .module("pub-map")
  .controller("EditPubController", EditPubController)
  
EditPubController.$inject = [
  "PubService", 
  "AuthService", 
  "TagService",
  "$location",
  "FlashService",
  "$stateParams"
];

function EditPubController(PubService, AuthService, TagService, $location, FlashService, $stateParams) {
  FlashService.clear();
  var vm = this;
  vm.loaded = false;
  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      vm.pub = res.pub;
      vm.loaded = true;
    })
    .catch(function(error) {
      FlashService.createErrorFlash(error);
    });
    
    vm.update = function() {
      FlashService.clear();
      var pub = {
        pub: {
          name: vm.pub.name,
          phone_number: vm.pub.phone_number,
          description: vm.pub.description,
        }
      };
      
      PubService.updatePub(pub, vm.pub.id)
        .then(function(res) {
          var message = "<p>You updated a pub! Congrats</p>";
          FlashService.createSuccessFlash(message);
          $location.url("/pubs/" + vm.pub.id);
        })
        .catch(function(error) {
          FlashService.createErrorFlash(error);
        });
    }
  
}