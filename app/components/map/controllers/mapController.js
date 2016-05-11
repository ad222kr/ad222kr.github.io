angular
  .module("pub-map")
  .controller("MapController", MapController);

MapController.$inject = ["NgMap", "PubService"]
/**
 * (description)
 * 
 * @param NgMap - Angular wrapper of google maps (i think?)
 * @param PubService - Pubs factory
 */
function MapController(NgMap, PubService) {
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

      marker.addListener("click", function() {
        openInfoWindow(marker, pub);
      })
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
