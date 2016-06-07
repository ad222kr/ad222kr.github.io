angular
  .module("pub-map")
  .controller("DetailsPubController", DetailsPubController);

DetailsPubController.$inject = [
  "PubService", 
  "$stateParams", 
  "NgMap", 
  "$rootScope", 
  "FlashService"
];

/**
 * Handles showing a single pub
 * 
 * @param PubService - Pub factory
 * @param $stateParams - for retreiving the id of the pub
 */
function DetailsPubController(PubService, $stateParams, NgMap, $rootScope, FlashService) {
  var vm = this;
  vm.loaded = false;

  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      vm.pub = res.pub;
      vm.loaded = true;
      
      // broadcast an event picked up in the MapController to 
      // pan to a pub and open its marker on click in the list of pubs
      $rootScope.$broadcast("pubClicked", vm.pub);
    })
    .catch(function(error) {
      FlashService.createErrorFlash(error);
    });
}
