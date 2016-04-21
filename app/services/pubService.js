angular
  .module("pub-map")
  .factory("PubService", PubService);

PubService.$inject = ["API", "ResourceService", "$q"];

function PubService(API, ResourceService, $q) {
  var endpoint = "api/pubs";
  var store = {
    getPubs: function() {
      var deferred = $q.defer();

      ResourceService
        .getAll(endpoint)
        .then(function(response) {
          deferred.resolve(response);
        })
        .catch(function(error) {
          deferred.reject(error);
        });
        return deferred.promise;
    },

    getPubsByEmail: function(email) {
      var deferred = $q.defer();
      ResourceService
        .getAll(endpoint, { email: email })
        .then(function(response) {
          deferred.resolve(response);
        })
        .catch(function(error) {
          deferred.reject(error);
        });
      return deferred.promise;
    },

    getPubById: function(id) {
      var deferred = $q.defer();

      ResourceService
       .getSingle(endpoint, id)
       .then(function(data) {
         deferred.resolve(data);
       })
       .catch(function(error) {
         deferred.reject(error);
       })
       return deferred.promise;
    }
  };

  return store;
}
