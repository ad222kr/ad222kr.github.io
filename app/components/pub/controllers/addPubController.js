angular
  .module("pub-map")
  .controller("AddPubController", AddPubController);

AddPubController.$inject = ["PubService", "AuthService", "TagService", "$location"];

function AddPubController(PubService, AuthService, TagService, $location) {
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
        var id = response.data.pub.id;
        $location.url("/pubs/" + id);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}