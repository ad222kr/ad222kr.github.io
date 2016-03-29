angular
  .module("pub-map")
  .controller("ListPubsController", ListPubsController);

ListPubsController.$inject = ["PubService"];

function ListPubsController(PubService) {
  var vm = this;


  PubService
    .get()
    .then(function(data) {
      vm.pubs = data.pubs;
    });

}
