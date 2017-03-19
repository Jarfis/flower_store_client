angular.module("flowerStore").controller("LandingController", function($rootScope, $scope, $state, FlowerService) {
  var la_ctrl = this;

  FlowerService.randomFlowers()
  .then(
    function(succ){
      la_ctrl.flowers = succ.flowers;
    },
    function(fails){

    }
  )

  la_ctrl.viewFlower = function(id){
    $state.go("view_flower", {id: id});
  }
});