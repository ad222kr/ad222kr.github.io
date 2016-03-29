angular
  .module("pub-map")
  .controller("DetailsPubController", DetailsPubController);

DetailsPubController.$inject = ["PubService", "$stateParams"];

function DetailsPubController(PubService, $stateParams) {
  var vm = this;


  PubService
    .getSingle($stateParams.id)
    .then(function(data) {
      vm.pub = data.pub;
    })


}
