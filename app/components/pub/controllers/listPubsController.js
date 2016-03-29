angular
  .module("pub-map")
  .controller("ListPubsController", ListPubsController);

ListPubsController.$inject = ["PubService"];

function ListPubsController(PubService) {
  var vm = this;


  PubService
    .getAll()
    .then(function(data) {
      vm.pubs = data.pubs;
    });

}
