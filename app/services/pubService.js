angular
  .module("pub-map")
  .factory("PubService", PubService);

PubService.$inject = ["$resource", "API"];


function PubService($resource, API) {
  "use strict";
  var headers = {
    "Accept" : API.format,
    "Api-Key": API.key
  }
  var store = {


    api: $resource(API.url + "pubs/:id", null, {
      update: {
        method   : "PUT",
        headers: headers
      },
      query: {
        method: "GET",
        headers: headers

      },
      get: {
        method: "GET",
        headers: headers
      }
    }),

    getAll: function () {

      return store.api.query().$promise;
    },
    getSingle: function(pubId) {
      return store.api.get({id: pubId}).$promise;
    }
  };


  return store;

  //vblablablabla
}
