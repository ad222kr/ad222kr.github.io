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
     * Gets all the pubs
     * 
     * @returns {Promise} - a list of pubs on resolve
     */
    getPubs: function(paginationParams) {
      console.log("Hey I am Inside you getPubs");
      return ResourceService.getAll(endpoint + "?limit=30");
    },

    /**
     * Gets a pub by a users email
     * 
     * @param email
     * @returns {Promise} - a list of the users pubs on resolve
     */
    getPubsByEmail: function(email) {
      return ResourceService.getAll(endpoint, { email: email });
    },

    /**
     * Gets a single pub 
     * 
     * @param id 
     * @returns {Promise} - a single pub on resolve
     */
    getPubById: function(id) {
      return ResourceService.getSingle(endpoint, id);
    },
    
    addPub: function(pub) {
      return ResourceService.post(endpoint, pub);
    }
  };

  return store;
}
