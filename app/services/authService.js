angular
  .module("pub-map")
  .factory("AuthService", AuthService);

  AuthService.$inject = ["ResourceService"];

  function AuthService(ResourceService) {
    var endpoint = "knock/auth_token";
    var store = {
      authenticateUser: function(username, password) {

      }
    }

    return store;
  }
