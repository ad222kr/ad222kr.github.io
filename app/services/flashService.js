angular
  .module("pub-map")
  .factory("FlashService", FlashService);
  
FlashService.$inject = ["Flash"];

function FlashService(Flash) {
  var store = {
    createErrorFlash: function(errorObj) {
      var message = "";
      if (typeof errorObj.data.errors === "object") {
        message = "<p>"
        Object.keys(errorObj.data.errors).forEach(function(key) {
          message += key + " " + errorObj.data.errors[key];
        });
        message += "</p>";
      } else {
        message = "<p>" + errorObj.data.error + "</p>";
      }
      
      var flashId = Flash.create("danger", message, 0, {class: "custom-class"}, true);
    },
    
    createSuccessFlash: function(message) {
      var flashId = Flash.create("success", message, 0, {class: "custom-class"}, true);
    },
    
    clear: function() {
      Flash.clear();
    }
  }
  
  return store;
}
