angular
  .module("pub-map")
  .controller("ListPubsController", ListPubsController);

ListPubsController.$inject = [
  "PubService", 
  "FlashService"
];

/**
 * Handles showing all the pubs
 * 
 * @param PubService - Pub factory
 */
function ListPubsController(PubService, FlashService) {
  var vm = this;
  vm.title = "Alla pubar";
  vm.loaded = false;
  
  FlashService.clear();
  PubService
    .getPubs()
    .then(function(data) {
      console.log(data);
      vm.pubs = data.pubs;
      vm.loaded = true;
    })
    .catch(function(error) {
      FlashService.createErrorFlash(error);
    });
}
