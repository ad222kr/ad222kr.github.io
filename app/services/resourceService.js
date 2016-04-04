angular
  .module("pub-map")
  .factory("ResourceService", ResourceService);

  ResourceService.$inject = ["$resource", "API"];

  function ResourceService($resource, API) {
    "use strict";
    var resourceName = null;
    var headers = {
      "Accept": API.format,
      "Api-Key": API.key,
      "Authorization": ""
    };

    var store = {
      getAll: function (endpoint) {
        var resource = $resource(API.url + endpoint, null, {
          query: {
            method: "GET",
            headers: headers
          }
        });
        return resource.query().$promise;
      },
      getSingle: function(endpoint, id) {
        var resource = $resource(API.url + endpoint + "/:id", null, {
          get: {
            method: "GET",
            headers: headers
          }
        });
        return resource.get({id: id}).$promise;
      },
      post: function(endpoint, resource, token=null) {
        if (token) headers.Authorization = "Bearer " + token;
        console.log(headers);
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
