angular
  .module("pub-map")
  .controller("MyPubsController", MyPubsController);

  ListPubsController.$inject = ["PubService", "AuthService"];

  function MyPubsController(PubService, AuthService) {
    var vm = this;
    var email = AuthService.getCurrenUser().email;

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
