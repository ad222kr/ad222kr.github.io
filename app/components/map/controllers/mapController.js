angular
  .module("pub-map")
  .controller("MapController", MapController);

MapController.$inject = ["NgMap", "PubService"]
function MapController(NgMap, PubService) {
  var vm = this;
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  vm.pubs = PubService.getPubs();
  


}
