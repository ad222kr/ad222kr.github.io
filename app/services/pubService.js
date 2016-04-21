angular
  .module("pub-map")
  .factory("PubService", PubService);

PubService.$inject = ["API", "ResourceService", "$q"];

function PubService(API, ResourceService, $q) {
  var url  = API.URL + "api/pubs";
  var store = {
    getPubs: function() {
      var deferred = $q.defer();

      ResourceService
        .getAll("pubs")
        .then(function(data) {
          console.log(data);
          return deferred.resolve(data);
        });
        console.log(deferred.promise);
        return deferred.promise;
    },
    getPubById: function(id) {
      var deferred = $q.defer();

      ResourceService
       .getSingle(endpoint, id)
       .then(function(data) {
         deferred.resolve(data);
       })
       return deferred.promise;
    }
  };

  return store;
}
