angular
  .module("pub-map")
  .controller("MapController", MapController);

MapController.$inject = ["NgMap", "PubService", "$scope"]
/**
 * (description)
 * 
 * @param NgMap - Angular wrapper of google maps (i think?)
 * @param PubService - Pubs factory
 */
function MapController(NgMap, PubService, $scope) {
  var vm = this;
  var markers = [];
  var infoWindow;

  NgMap
    .getMap().
    then(function(map) {
      vm.map = map;
      PubService.getPubs()
        .then(function(data) {
          initMarkers(data); 
        })
        .then(function() {
          $scope.$on("pubClicked", function(event, pub) {
            var markerObj = markers.find(function(marker) {
              return marker.lat === pub.position.latitude && marker.lng === pub.position.longitude;
            })
            var latLng = new google.maps.LatLng(markerObj.lat, markerObj.lng);
            
            map.setZoom(17);
            map.panTo(latLng);
            openInfoWindow(markerObj.marker, pub);
          });
        })
        .catch(function(error) {
          console.log("Error: " + error)
        });
    });

  /**
   * Draws the markers on the map
   * 
   * @param data - object containing a list of the pubs
   */
  function initMarkers(data) {
    infoWindow = new google.maps.InfoWindow(); // Using the same instance for info-window
    vm.map.addListener("click", closeInfoWindow);
    data.pubs.forEach(function(pub) {
      var marker = new google.maps.Marker({
        position: {
          lat: pub.position.latitude,
          lng: pub.position.longitude },
        map: vm.map});
      // marker has its own method for getting lng/lat but its stupid floating point numbers
      // makes it impossible to compare since 0.1 + 0.2 = 0.30000000000000004 problem
      markers.push({ marker: marker, lat: pub.position.latitude, lng: pub.position.longitude});
      marker.addListener("click", function() {
        openInfoWindow(marker, pub);
      });
     
    });
  }

  /**
   * Opens a markers information window
   * 
   * @param marker - the marker on which to open the window
   * @param pub - information of the pub to show
   */
  function openInfoWindow(marker, pub) {
    var latLng = marker.getPosition();
    infoWindow.setContent("<b>" + pub.name + "</b>");
    infoWindow.open(vm.map, marker);
  }

  /**
   * Closes the marker
   */
  function closeInfoWindow() {
    infoWindow.close();
  }


}
