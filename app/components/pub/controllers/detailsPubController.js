angular
  .module("pub-map")
  .controller("DetailsPubController", DetailsPubController);

DetailsPubController.$inject = ["PubService", "$stateParams"];

/**
 * Handles showing a single pub
 * 
 * @param PubService - Pub factory
 * @param $stateParams - for retreiving the id of the pub
 */
function DetailsPubController(PubService, $stateParams) {
  var vm = this;

  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      vm.pub = res.pub;
    })
    .catch(function(error) {
      console.log("Error: ", error);
    });
}
