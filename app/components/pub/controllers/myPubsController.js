/************************************
 * THIS CONTROLLER IS NOT IN USE ****
 ************************************/

angular
  .module("pub-map")
  .controller("MyPubsController", MyPubsController);

  MyPubsController.$inject = [
    "PubService", 
    "AuthService", 
    "FlashService"
  ];

  /**
   * Handles showing the current users pubs (creted by the current user)
   * 
   * @param PubService - Pub factory
   * @param AuthService - Authentication factory
   */
  function MyPubsController(PubService, AuthService, FlashService) {
    FlashService.clear();
    var vm = this;
    vm.title = "Mina pubar"
    vm.loaded = false;
    
    
    var email = AuthService.getCurrentUser().email;

    PubService
      .getPubsByEmail(email)
      .then(function(res) {
        vm.pubs = res.pubs;
        vm.loaded = true;
      })
      .catch(function(error) {
        FlashService.createErrorFlash(error);
      });
  }
