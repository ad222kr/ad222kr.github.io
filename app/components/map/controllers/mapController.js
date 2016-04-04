angular
  .module("pub-map")
  .controller("MapController", MapController);

MapController.$inject = ["NgMap", "PubService", "$scope"]
function MapController(NgMap, PubService, $scope) {
  var vm = this;
  var markers = [];
  var infoWindow;

  NgMap.getMap().then(function(map) {
    vm.map = map;
    PubService.getPubs()
      .then(function(data) {
        infoWindow = new google.maps.InfoWindow();
        map.addListener("click", closeInfoWindow);
        data.pubs.forEach(function(pub) {
          var marker = new google.maps.Marker({position: { lat: pub.position.latitude, lng: pub.position.longitude }, map: map})
          marker.addListener("click", function() {
            openInfoWindow(marker, pub);
          })
        });
      })
      .catch(function(error) {
        console.log("Error: " + error)
      });
  });

  function openInfoWindow(marker, pub) {
    var latLng = marker.getPosition();
    infoWindow.setContent("<b>" + pub.name + "</b>");
    infoWindow.open(vm.map, marker);

  }

  function closeInfoWindow() {
    infoWindow.close();
  }


}
