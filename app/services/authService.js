angular
  .module("pub-map")
  .factory("AuthService", AuthService);

  AuthService.$inject = ["$http", "$q", "API", "$rootScope"];

  function AuthService($http, $q, API, $rootScope) {
    var url = API.URL + "knock/auth_token";
    var storageKey = "user";
    var store = {

      authenticateUser: function(email, password) {
        var request = {
          method: "POST",
          url: url,
          headers: {
            "Api-Key": API.KEY,
            Accept: API.ACCEPT
          },
          data: {
            auth: {
              email: email,
              password: password
            }
          }
        };

        return $http(request)
               .then(function(response) {
                 console.log("200 user found!");
                 var user = { email: email, token: response.data.jwt };
                 store.loginUser(user);
               })
               .catch(function(error) {
                 console.error("404 user not found");
                 return $q.reject(error);
               });
      },

      loginUser: function(user) {
        $rootScope.loggedIn = true;
        localStorage.setItem(storageKey, JSON.stringify(user));
      },

      logoutUser: function() {
        $rootScope.loggedIn = false;
        localStorage.removeItem(storageKey);
      }

      getUser: function() {
        return JSON.parse(localStorage.getItem(storageKey));
      }
    }

    return store;
  }
