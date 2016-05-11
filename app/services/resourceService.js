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
      getAll: function (endpoint, params) {
        if (typeof params !== "object") params = null;
        var resource = $resource(API.URL + endpoint, params, {
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
        headers.Authorization = "Bearer " + AuthService.getCurrentUser().token;
        console.log(AuthService.getCurrentUser().token)
        var resource = $resource(API.URL + endpoint, null, {
          post: {
            method: "POST",
            headers: {
              'Api-Key': API.KEY,
              'Accept': API.FORMAT,
              'Authorization': 'Bearer' + AuthService.getCurrentUser().token
            }
          }
        });
        return resource.save(resource).$promise;
      }
    };

    return store;
};
