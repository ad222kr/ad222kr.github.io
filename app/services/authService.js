angular
  .module("pub-map")
  .factory("AuthService", AuthService);

  AuthService.$inject = ["$http", "$q", "API"];

  function AuthService($http, $q, API) {
    var endpoint = "knock/auth_token";
    var store = {
      getUserByEmail: function(email) {
        var deferred = $q.defer();

        // TODO: fix api to find a creator by email/username
        ResourceService
          .getSingle("creators", email)
          .then(function(data) {
            deferred.resolve(data)
          }, function(error) {
            console.log("Error: ", error);
          })
      },

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
        })
          .then(function(response) {
            if (typeof response.data === "object") {
              return response.data;
            } else {
              return $q.reject(response.data);
            }
        }, function(response) {
          return $q.reject;
        });
      }
    }

    return store;
  }
