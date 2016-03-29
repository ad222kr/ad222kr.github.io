angular
  .module("pub-map")
  .controller("ListPubsController", ListPubsController);

ListPubsController.$inject = ["PubService"];

function ListPubsController(PubService) {
  var vm = this;

  var pubPromise = PubService.getPubs();

  pubPromise
    .then(function(data) {
      console.log(data);
      vm.pubs = data.pubs;
    })
    .catch(function(error) {
      console.log("Error: " + error)
    })


}
