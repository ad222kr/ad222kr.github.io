angular
  .module("pub-map")
  .controller("DetailsPubController", DetailsPubController);

DetailsPubController.$inject = ["PubService", "$stateParams"];

function DetailsPubController(PubService, $stateParams) {
  var vm = this;

  console.log($stateParams);

  PubService
    .getSingle($stateParams.id)
    .then(function(data) {
      vm.pub = data.pub;
      console.log(data.pub);
    })


}
