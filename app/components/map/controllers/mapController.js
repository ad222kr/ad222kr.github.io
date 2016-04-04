angular
  .module("pub-map")
  .controller("MapController", MapController);

MapController.$inject = ["NgMap", "PubService", "$scope"]
function MapController(NgMap, PubService, $scope) {
  var vm = this;
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  var pubPromise = PubService.getPubs();

  pubPromise
    .then(function(data) {
      console.log(data.pubs);
      vm.pubs = data.pubs;
    })
    .catch(function(error) {
      console.log("Error: " + error)
    });

  $scope.$on("mapInitialized", function(evt, evtMap) {
    vm.showInfo = function(e) {
      console.log(e.latLng);
      console.log("YEEEAH BABY")
    }
  });
  return vm;

}
