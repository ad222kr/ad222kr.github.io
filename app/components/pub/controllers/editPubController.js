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
  Flash.clear();
  var vm = this;
  vm.loaded = false;
  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      vm.pub = res.pub;
      vm.loaded = true;
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
    
    vm.update = function() {
      Flash.clear();
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
        }
      };
      
      PubService.updatePub(pub, vm.pub.id)
        .then(function(res) {
          var message = "<p>You updated a pub! Congrats</p>";
          var flashId = Flash.create("success", message, 0, { class: "custom-class" }, true);
          $location.url("/pubs/" + vm.pub.id);
          console.log(res);
        })
        .catch(function(error) {
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