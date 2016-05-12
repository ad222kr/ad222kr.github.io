angular
  .module("pub-map")
  .controller("MyPubsController", MyPubsController);

  MyPubsController.$inject = ["PubService", "AuthService", "Flash"];

  /**
   * Handles showing the current users pubs (creted by the current user)
   * 
   * @param PubService - Pub factory
   * @param AuthService - Authentication factory
   */
  function MyPubsController(PubService, AuthService, Flash) {
    Flash.clear();
    var vm = this;
    vm.title = "Mina pubar"
    
    
    var email = AuthService.getCurrentUser().email;

    PubService
      .getPubsByEmail(email)
      .then(function(res) {
        console.log(res);
        vm.pubs = res.pubs;
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  }
