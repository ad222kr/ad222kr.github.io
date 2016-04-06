angular
  .module("pub-map")
  .factory("AuthService", AuthService);

  AuthService.$inject = ["$http", "$q", "API"];

  function AuthService($http, $q, API) {
    var endpoint = "knock/auth_token";
    var store = {
      authenticateUser: function(username, password) {
        var requestBody = {
          auth: {
            email: username,
            password: password
          }
        }


        return $http.post(API.url.substring(0, API.url.length - 4) + endpoint, requestBody,
        {
          headers: {
            "Accept": API.format,
            "Api-Key": API.key
          }
        });
      }
    }

    return store;
  }
