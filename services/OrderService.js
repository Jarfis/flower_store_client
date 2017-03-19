angular.module("flowerStore").service("OrderService", function($http, $q, $timeout, $rootScope){
  var serv = this;

  serv.fetchInProgress = function(){
    return $http.get($rootScope.api_url + "/get_in_progress")
    .then(
      function(succ){
        console.log("fetch in progress", succ)
        //succ.data.cart should look like this:
        // [
        //   {
        //     order_id,
        //     flower_id,
        //     image,
        //     orders_flowers_id,
        //     quantity,
        //     cost
        //   },
        //   ...
        // ]
        if(succ.data.cart.length > 0){
          $rootScope.cart = {};
          
          angular.forEach(succ.data.cart, function(v,k){
            $rootScope.cart[v.flower_id] = {
              orders_flowers_id: v.orders_flowers_id,
              quantity: v.quantity,
              cost: v.cost
            }
          });
        }
      },
      function(fail){

      }
    );
  }

  serv.addToCart = function(flower_id, quantity){
    return $http.post(
      $rootScope.api_url + "/orders_flowers",
      {
        flower_id: flower_id,
        quantity: quantity
      }
    )
    .then(function(res){return res.data;});
  }

  serv.removeFromCart = function(orders_flowers_id){
    return $http.delete($rootScope.api_url + "/orders_flowers/" + orders_flowers_id)
    .then(function(res){return res.data;});
  }

  serv.updateItem = function(orders_flowers_id, quantity){
    return $http.put(
      $rootScope.api_url + "/orders_flowers/" + orders_flowers_id,
      {
        quantity: quantity
      }
    )
    .then(function(res){return res.data;});
  }

  //this will be for the checkout page, after modifying all the quantities it'll call this when the proceed button is hit
  serv.updateCart = function(params){
    // params will be {
    //   <orders_flowers_id>:<quantity>,
    //   ...
    // }
    return $http.post(
      $rootScope.api_url + "/order",
      {
        orders_flowers: params
      }
    )
    .then(function(res){return res.data;});
  }

  serv.purchase = function(card_id, contact_id){
    return $http.post(
      $rootScope.api_url + "/purchase",
      {
        card_id: card_id,
        contact_id: contact_id
      }
    )
    .then(function(res){return res.data;});
  }
});