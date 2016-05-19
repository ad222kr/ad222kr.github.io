angular
  .module("pub-map")
  .factory("PubService", PubService);

PubService.$inject = ["API", "ResourceService", "$q"];

/**
 * Handles RESTful calls to the api/pubs endpoint
 * 
 * @param API - Constant object with API-stuf, declared in app.constants.js
 * @param ResourceService - Resource factory
 * @param $q 
 * @returns - The factory
 */
function PubService(API, ResourceService, $q) {
  var endpoint = "api/pubs";
  var store = {
    /**
     * @returns {Promise} - a list of pubs on resolve
     */
    getPubs: function(paginationParams) {
      return ResourceService.getAll(endpoint + "?limit=30");
    },

    /**
     * @param {String} email
     * @returns {Promise} - a list of the users pubs on resolve
     */
    getPubsByEmail: function(email) {
      return ResourceService.getAll(endpoint, { email: email });
    },

    /**
     * @param id 
     * @returns {Promise} - a single pub on resolve
     */
    getPubById: function(id) {
      return ResourceService.getSingle(endpoint, id);
    },
    
    /**
     * @param pub (description)
     * @returns (description)
     */
    addPub: function(pub) {
      return ResourceService.post(endpoint, pub);
    },
    
    updatePub: function(pub, id) {
      return ResourceService.put(endpoint, id, pub);
    }
  };

  return store;
}
