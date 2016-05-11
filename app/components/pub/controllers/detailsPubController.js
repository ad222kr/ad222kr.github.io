angular
  .module("pub-map")
  .controller("DetailsPubController", DetailsPubController);

DetailsPubController.$inject = ["PubService", "$stateParams", "NgMap", "$rootScope"];

/**
 * Handles showing a single pub
 * 
 * @param PubService - Pub factory
 * @param $stateParams - for retreiving the id of the pub
 */
function DetailsPubController(PubService, $stateParams, NgMap, $rootScope) {
  var vm = this;

  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      vm.pub = res.pub;
      
      $rootScope.$broadcast("pubClicked", vm.pub);
      
      // NgMap
      //   .getMap()
      //   .then(function(map) {
      //     map.setZoom(17);
      //     var latLng = new google.maps.LatLng(vm.pub.position.latitude, vm.pub.position.longitude);
      //     map.panTo(latLng);
      //   })
    })
    .catch(function(error) {
      console.log("Error: ", error);
    });
}
