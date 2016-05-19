angular
  .module("pub-map")
  .controller("ListPubsController", ListPubsController);

ListPubsController.$inject = ["PubService", "Flash"];

/**
 * Handles showing all the pubs
 * 
 * @param PubService - Pub factory
 */
function ListPubsController(PubService, Flash) {
  var vm = this;
  vm.title = "Alla pubar";
  vm.loaded = false;
  
  Flash.clear();
  PubService
    .getPubs()
    .then(function(data) {
      console.log(data);
      vm.pubs = data.pubs;
      vm.loaded = true;
    })
    .catch(function(error) {
      console.log("Error: " + error)
    });
}
