angular
  .module("pub-map")
  .controller("AddPubController", AddPubController);

AddPubController.$inject = ["PubService", "AuthService", "TagService"];

function AddPubController(PubService, AuthService, TagService) {
  console.log("hehehe add pub");
  var vm = this;
  TagService.getTags()
    .then(function(response) {
      vm.tags = response.tags;
      console.log(vm.tags);
    })
    .catch(function(error) {
      console.log(error);
    })
  
  vm.create = function() {

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
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}