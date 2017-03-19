angular.module("flowerStore").controller("BrowseController", function($rootScope, $scope, $state, FlowerService) {
  var bro_ctrl = this;

  FlowerService.fetchFlowers()
  .then(
    function(succ){
      bro_ctrl.the_flowers = succ.flowers;
    },
    function(fail){

    }
  );

  bro_ctrl.viewFlower = function(id){
    $state.go("view_flower", {id: id});
  }

  bro_ctrl.filtered = function(flower_name){
    var filter_regex = new RegExp((bro_ctrl.filter || "").replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "i")

    return filter_regex.test(flower_name);
  }



  function regexEscape(str) {
      return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  function reg(input) {
      var flags;
      //could be any combination of 'g', 'i', and 'm'
      flags = 'g';
      input = input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      return new RegExp('ReGeX' + input + 'ReGeX', flags);
  }
});