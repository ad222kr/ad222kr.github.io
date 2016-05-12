angular
  .module("pub-map")
  .factory("AuthService", AuthService);

  AuthService.$inject = ["$http", "$q", "API", "$rootScope", "$window"];

  /**
   * The factory/service for logging in/out users 
   * from the API knock/auth_token endpoint
   * 
   * @param $http 
   * @param $q 
   * @param API - Constant object with API-stuf, declared in app.constants.js
   * @param $rootScope 
   * @returns - The factory
   */
  function AuthService($http, $q, API, $rootScope) {
    var url = API.URL + "knock/auth_token";
    var currentUser = null;
    var storageKey = "currentUser";
    var store = {

      /**
       * Authenticates a user
       * 
       * @param email 
       * @param password 
       * @returns {Promise} - wheter the user was authenticated or not
       */
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
        
        return $http(request);
      },

      /**
       * logs in a user
       * 
       * @param {Object} - User object, example: { email: smt@smt.com, token: xasdasda } 
       */
      loginUser: function(user) {
        currentUser = user;
        $rootScope.loggedIn = true;
        localStorage.setItem(storageKey, JSON.stringify(currentUser));
      },

      /**
       * logs out user
       */
      logoutUser: function() {
        currentUser = null;
        $rootScope.loggedIn = false;
        localStorage.removeItem(storageKey);
      },

      /**
       * gets current user
       * 
       * @returns {Object} - the current user, example { email: lol@heh.com, token: axaxaxa }
       */
      getCurrentUser: function() {
        return currentUser || JSON.parse(localStorage.getItem(storageKey));
      },

      /**
       * checks if the user is authenticated
       * 
       * @returns {boolean}
       */
      isAuthenticated: function() {
        console.log("isAuthenticated() called, returned: " + store.getcurrentUser());
        return store.getcurrentUser() !== null;
      },

      /**
       * Initiates the singleton store, to get the user and try to sign in 
       * on a page reload (to retain logged in state)
       */
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
