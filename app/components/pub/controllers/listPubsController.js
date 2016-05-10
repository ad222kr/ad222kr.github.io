angular
  .module("pub-map")
  .controller("ListPubsController", ListPubsController);

ListPubsController.$inject = ["PubService"];

/**
 * Handles showing all the pubs
 * 
 * @param PubService - Pub factory
 */
function ListPubsController(PubService) {
  var vm = this;

  PubService
    .getPubs()
    .then(function(data) {
      console.log(data);
      vm.pubs = data.pubs;
    })
    .catch(function(error) {
      console.log("Error: " + error)
    });
}
