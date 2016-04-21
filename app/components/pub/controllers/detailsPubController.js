angular
  .module("pub-map")
  .controller("DetailsPubController", DetailsPubController);

DetailsPubController.$inject = ["PubService", "$stateParams"];

function DetailsPubController(PubService, $stateParams) {
  var vm = this;

  PubService.getPubById($stateParams.id)
    .then(function(res) {
      vm.pub = res.pub;
    })
    .catch(function(error) {
      console.log("Error: ", error);
    });
}
