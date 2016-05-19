angular
  .module("pub-map")
  .controller("AddPubController", AddPubController);

AddPubController.$inject = [
  "PubService", 
  "AuthService", 
  "TagService", 
  "$location", 
  "FlashService"
];

function AddPubController(PubService, AuthService, TagService, $location, FlashService, $rootScope) {
  
  var vm = this;
  TagService.getTags()
    .then(function(response) {
      FlashService.clear();
      vm.tags = response.tags;
      console.log(vm.tags);
    })
    .catch(function(error) {
      FlashService.clear();
      var message = "<p>Something went wrong when getting the tags...</p>";
      var flashId = Flash.create("danger", message, 0, {class: "custom-class"}, true);
      console.log(error);
    })
  
  vm.create = function() {
    FlashService.clear();
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
        FlashService.createSuccessFlash(message);
        var id = response.data.pub.id;
        
        $location.url("/pubs/" + id);
      })
      .catch(function(error) {
        FlashService.createErrorFlash(error);
      });
  }
}