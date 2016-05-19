angular
  .module("pub-map")
  .controller("EditPubController", EditPubController)
  
EditPubController.$inject = [
  "PubService", 
  "AuthService", 
  "TagService",
  "$location",
  "Flash",
  "$stateParams"
];

function EditPubController(PubService, AuthService, TagService, $location, Flash, $stateParams) {
  var vm = this;
  vm.loaded = false;
  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      // vm.pub = res.pub;
      // console.log(vm.pub);
      // console.log(vm.pub.phone_number)
      vm.pub = res.pub;
      return vm.pub;
    })
    .then(function() {
      TagService.getTags()
        .then(function(res) {
          vm.tags = res.tags;
          vm.tags.forEach(function(tag) {
            vm.pub.tags.forEach(function(pubTag) {
              if (tag.id === pubTag.id) {
                console.log("Tag match!");
                tag.selected = true;
              }
            });
          });
          vm.loaded = true;
        })
        .catch(function(error) {
          console.log("Error: " + error);
        })
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
    
    vm.update = function() {
      var tags = vm.tags.filter(function(tag) {
        return tag.selected === true;
      })
      //vm.pub.tags = tags; // overwrite with newly selected tags
      console.table(vm.pub);
      var pub = {
        pub: {
          name: vm.pub.name,
          phone_number: vm.pub.phone_number,
          description: vm.pub.description,
          position: {
            address: vm.pub.position.address
          },
          tags: tags
        }
      };
      
      PubService.updatePub(pub, vm.pub.id)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
      
      
    }
  
}