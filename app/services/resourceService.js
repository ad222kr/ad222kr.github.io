angular
  .module("pub-map")
  .factory("ResourceService", ResourceService);

  ResourceService.$inject = ["$resource", "API", "AuthService", "$http", "$cacheFactory"];

  function ResourceService($resource, API, AuthService, $http, $cacheFactory) {
    "use strict";
    var resourceName = null;
    var headers = {
      "Accept": API.FORMAT,
      "Api-Key": API.KEY,
    };

    var store = {
      getAll: function (endpoint, params) {
        if (typeof params !== "object") params = null;
        var $httpDefaultCache = $cacheFactory.get("$http");
        console.log($httpDefaultCache);
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
        // $http used for post since $resource does not send the
        // token, so I get 401 unauthorized.. cba rewriting the other ones
        headers.Authorization = "Bearer " + AuthService.getCurrentUser().token;
        var url = API.URL + endpoint;
        var config = {
          method: "POST",
          headers: headers
        };
        $cacheFactory.get("$http").removeAll(); // remove everything cus Im lazy
        return $http.post(url, resource, config);
      },
      
      put: function(endpoint, id, resource) {
        headers.Authorization = "Bearer " + AuthService.getCurrentUser().token;
        var url = API.URL + endpoint + "/" + id;
        var config = {
          method: "PUT",
          headers: headers
        };
        $cacheFactory.get("$http").removeAll();
        return $http.put(url, resource, config);
      }
    };

    return store;
};
