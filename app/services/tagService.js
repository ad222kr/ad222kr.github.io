angular
  .module("pub-map")
  .factory("TagService", TagService);
  
TagService.$inject = ["API", "ResourceService"];


/**
 * Handles the tag endpoint of the api
 * 
 * @param API (description)
 * @param ResourceService (description)
 * @returns (description)
 */
function TagService(API, ResourceService) {
  var endpoint = "api/tags";
  var store = {
    getTags: function() {
      return ResourceService.getAll(endpoint);
    }
  }
  
  return store;
}