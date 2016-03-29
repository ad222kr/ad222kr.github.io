angular
  .module("pub-map")
  .controller("MapController", MapController);

MapController.$inject = ["NgMap"]
function MapController(NgMap) {
  var vm = this;
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  vm.showDetails = function() {
    console.log("marker clicked!");
    alert("HELLO");
  }
}
