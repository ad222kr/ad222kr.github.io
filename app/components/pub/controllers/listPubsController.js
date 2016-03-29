angular
  .module("pub-map")
  .controller("ListPubsController", ListPubsController);

ListPubsController.$inject = ["PubService"];

function ListPubsController(PubService) {
  var vm = this;
  pubs = PubService;
  console.log(pubs.get());


  vm.pubs = "PUBS";

}
