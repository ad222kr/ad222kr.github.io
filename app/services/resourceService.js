angular
  .module("pub-map")
  .factory("ResourceService", ResourceService);

  ResourceService.$inject = ["$resource", "API", "AuthService"];

  function ResourceService($resource, API, AuthService) {
    "use strict";
    var resourceName = null;
    var headers = {
      "Accept": API.FORMAT,
      "Api-Key": API.KEY,
    };

    var store = {
      getAll: function (endpoint) {
        var resource = $resource(API.URL + endpoint, null, {
          query: {
            method: "GET",
            headers: headers
          }
        });
        return resource.query().$promise;
      },
      getSingle: function(endpoint, id) {
        var resource = $resource(API.URL + endpoint + "/:id", null, {
          get: {
            method: "GET",
            headers: headers
          }
        });

        return resource.get({id: id}).$promise;
      },
      post: function(endpoint, resource) {
        headers.Authorization = "Bearer " + AuthService.getUser().token;

        var resource = $resource(API.url + endpoint, null, {
          get: {
            method: "POST",
            headers: headers
          }
        });
        return resource.save(resource).$promise;
      }
    };

    return store;
};
