angular
  .module("pub-map")
  .factory("PubService", PubService);

PubService.$inject = ["API", "ResourceService", "$q"];

function PubService(API, ResourceService, $q) {
  var endpoint = "api/pubs";
  var store = {
    getPubs: function() {
      // var deferred = $q.defer();
      // ResourceService
      //   .getAll(endpoint)
      //   .then(function(response) {
      //     deferred.resolve(response);
      //   })
      //   .catch(function(error) {
      //     deferred.reject(error);
      //   });
      //   return deferred.promise;
      console.log("Hey I am Inside you getPubs");
      return ResourceService.getAll(endpoint);
    },

    getPubsByEmail: function(email) {
      // var deferred = $q.defer();
      // ResourceService
      //   .getAll(endpoint, { email: email })
      //   .then(function(response) {
      //     deferred.resolve(response);
      //   })
      //   .catch(function(error) {
      //     deferred.reject(error);
      //   });
      // return deferred.promise;
      return ResourceService.getAll(endpoint, { email: email });
    },

    getPubById: function(id) {
      // var deferred = $q.defer();

      // ResourceService
      //  .getSingle(endpoint, id)
      //  .then(function(data) {
      //    deferred.resolve(data);
      //  })
      //  .catch(function(error) {
      //    deferred.reject(error);
      //  })
      //  return deferred.promise;
      return ResourceService.getSingle(endpoint, id);
    }
  };

  return store;
}
