angular
  .module("pub-map")
  .controller("DetailsPubController", DetailsPubController);

DetailsPubController.$inject = ["PubService", "$stateParams"];

function DetailsPubController(PubService, $stateParams) {
  var vm = this;

  PubService.getPubById($stateParams.id)
    .then(function(data) {
      console.log(data);
      vm.pub = data.pub;
    })
    .catch(function(error) {
      console.log("Error: ", error);
    });





}
