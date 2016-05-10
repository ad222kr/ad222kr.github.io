angular
  .module("pub-map")
  .factory("AuthService", AuthService);

  AuthService.$inject = ["$http", "$q", "API", "$rootScope", "$window"];

  function AuthService($http, $q, API, $rootScope) {
    var url = API.URL + "knock/auth_token";
    var currentUser = null;
    var storageKey = "currentUser";
    var store = {

      authenticateUser: function(email, password) {
        // var deferred = $q.defer();
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
        
        return $http(request);
      },

      loginUser: function(user) {
        currentUser = user;
        $rootScope.loggedIn = true;
        localStorage.setItem(storageKey, JSON.stringify(currentUser));
      },

      logoutUser: function() {
        currentUser = null;
        $rootScope.loggedIn = false;
        localStorage.removeItem(storageKey);
      },

      getCurrentUser: function() {
        return currentUser || JSON.parse(localStorage.getItem(storageKey));
      },

      isAuthenticated: function() {
        console.log("isAuthenticated() called, returned: " + store.getcurrentUser());
        return store.getcurrentUser() !== null;
      },

      init: function() {
        if (store.getCurrentUser()) {
          currentUser = JSON.parse(localStorage.getItem(storageKey));
          $rootScope.loggedIn = true;
        }
      }

    }
    store.init(); // run this on page reload to get currentUser from localStorage
    return store;
  }
