angular
  .module("pub-map")
  .controller("AddPubController", AddPubController);

AddPubController.$inject = ["PubService", "AuthService", "TagService", "$location", "Flash"];

function AddPubController(PubService, AuthService, TagService, $location, Flash) {
  
  var vm = this;
  TagService.getTags()
    .then(function(response) {
      Flash.clear();
      vm.tags = response.tags;
      console.log(vm.tags);
    })
    .catch(function(error) {
      Flash.clear();
      var message = "<p>Something went wrong when getting the tags...</p>";
      var flashId = Flash.create("danger", message, 0, {class: "custom-class"}, true);
      console.log(error);
    })
  
  vm.create = function() {
    Flash.clear();
    var tags = vm.tags.filter(function(tag) {
      return tag.selected === true;
    });
    
    var pub = {
      pub: {
        name: vm.name,
        phone_number: vm.phone,
        description: vm.description,
        position: {
          address: vm.address
        },
        tags: tags
      }
    };
    
    PubService.addPub(pub)
      .then(function(response) {
        
        var message = "<p>You created a pub! Congrats</p>";
        var flashId = Flash.create("success", message, 0, {class: "custom-class"}, true);
        var id = response.data.pub.id;
        
        $location.url("/pubs/" + id);
      })
      .catch(function(error) {
        
        //console.log(error);
        var message = "";
        if (typeof error.data.errors === "object") {
          message = "<p>"
          Object.keys(error.data.errors).forEach(function(key) {
            message += key + " " + error.data.errors[key];
          });
          message += "</p>";
        } else {
          message = "<p>" + error.data.errors + "</p>";
        }
        
        var flashId = Flash.create("danger", message, 0, {class: "custom-class"}, true);

      });
  }
}