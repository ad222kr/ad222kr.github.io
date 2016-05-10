angular
  .module("pub-map")
  .controller("MainController", MainController);

MainController.$inject = ["$rootScope", "$location"];

/**
 * Main controller of the application
 * 
 * @param $rootScope 
 * @param $location 
 */
function MainController($rootScope, $location) {
  console.log("HAI GUYS I AM MAIN CTONRLERR");

}
