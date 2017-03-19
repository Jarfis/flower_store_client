angular.module("flowerStore").controller("ViewFlowerController", function($rootScope, $scope, $state, $stateParams, FlowerService, OrderService) {
  var vf_ctrl = this;
  vf_ctrl.quantity = 0;

  //note to self, handle cases where the user has already added some of a flower to a cart then decides to go back and add some more
  FlowerService.fetchFlower($stateParams.id)
  .then(
    function(succ){
      console.log("get flower", succ)
      vf_ctrl.the_flower = succ.flower;
    },
    function(fail){

    }
  );

  //actions
  //add to cart
  //

  vf_ctrl.addToCart = function(){
    OrderService.addToCart($stateParams.id, vf_ctrl.quantity)
    .then(
      function(succ){
        $rootScope.cart[$stateParams.id] = {
          orders_flowers_id: succ.orders_flower.id,
          quantity: succ.orders_flower.quantity,
          cost: succ.orders_flower.cost
        }
      },
      function(fail){

      }
    )
  }

  vf_ctrl.updateItem = function(){
    if($rootScope.cart[$stateParams.id]){
      OrderService.updateItem($rootScope.cart[$stateParams.id].orders_flowers_id, vf_ctrl.quantity)
      .then(
        function(succ){
          $rootScope.cart[$stateParams.id].quantity = succ.orders_flower.quantity;
          $rootScope.cart[$stateParams.id].cost = succ.orders_flower.cost;
        },
        function(fail){

        }
      )
    }
  }

  vf_ctrl.incrementQuantity = function(){
    if(vf_ctrl.quantity < vf_ctrl.the_flower.remaining){
      vf_ctrl.quantity++;
    }
  }

  vf_ctrl.decrementQuantity = function(){
    if(vf_ctrl.quantity > 0){
      vf_ctrl.quantity--;
    }
  }
});