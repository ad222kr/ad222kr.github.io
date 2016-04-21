angular
  .module("pub-map")
  .factory("AuthService", AuthService);

  AuthService.$inject = ["$http", "$q", "API", "$rootScope", "$window"];

  function AuthService($http, $q, API, $rootScope) {
    var url = API.URL + "knock/auth_token";
    var user = null;
    var storageKey = "user";
    var store = {

      authenticateUser: function(email, password) {
        var deferred = $q.defer();
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
                 user = { email: email, token: response.data.jwt };
                 store.loginUser();
                 deferred.resolve(user);
               })
               .catch(function(error) {
                 console.error("404 user not found");
                 deferred.reject(error);
               });
      },

      loginUser: function() {
        $rootScope.loggedIn = true;
        localStorage.setItem(storageKey, JSON.stringify(user));
      },

      logoutUser: function() {
        user = null;
        $rootScope.loggedIn = false;
        localStorage.removeItem(storageKey);
      },

      getUser: function() {
        return user || JSON.parse(localStorage.getItem(storageKey));
      },

      init: function() {
        console.log(store.getUser());
        if (store.getUser()) {
          user = JSON.parse(localStorage.getItem(storageKey));
          $rootScope.loggedIn = true;
        }
      }

    }
    store.init(); // run this on page reload to get user from localStorage
    return store;
  }
