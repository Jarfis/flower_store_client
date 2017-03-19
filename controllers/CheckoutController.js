angular.module("flowerStore").controller("CheckoutController", function($rootScope, $scope, $state, OrderService, FlowerService, UserService) {
  var co_ctrl = this;

  co_ctrl.step = 0;

  co_ctrl.params = {};

  co_ctrl.params.contact = {
    name: null,
    province: null,
    city: null,
    postal_code: null,
    address: null,
    phone: null
  }

  co_ctrl.params.card = {
    number: null,
    cvc: null,
    exp_month: null,
    exp_year: null
  }

  OrderService.fetchInProgress();

  FlowerService.fetchFlowers()
  .then(
    function(succ){
      co_ctrl.the_flowers = {};

      //note to self, switch this over to a for loop
      angular.forEach(succ.flowers, function(v,k){
        co_ctrl.the_flowers[v.id] = {
          name: v.name,
          description: v.description,
          price: v.price,
          image: v.image,
          remaining:v.remaining
        }
      });
    },
    function(fail){

    }
  )

  //lets show a list of the products on the right. you'll be able to scroll it up and down
  //mousing over one them will popup an image in the left side of the screen for that flower

  // the list on the right will show the flowers in a round cornered cell with the current quantity and plus and minus over and under it and the price to the right of that

  //im thinking that i'll not update the orders_flowers until a submit or proceed button is hit

  co_ctrl.incrementItem = function(flower_id){
    if($rootScope.cart[flower_id].quantity < co_ctrl.the_flowers[flower_id].remaining){
      $rootScope.cart[flower_id].quantity ++;
    }
  }

  co_ctrl.decrementItem = function(flower_id){
    if($rootScope.cart[flower_id].quantity > 0){
      $rootScope.cart[flower_id].quantity --;
    }
  }

  co_ctrl.getTotal = function(){
    var total = 0;

    for(var k in $rootScope.cart){
      total += $rootScope.cart[k].cost;
    }

    return total;
  }

  co_ctrl.removeItem = function(flower_id){
    OrderService.removeFromCart($rootScope.cart[flower_id].orders_flowers_id)
    .then(
      function(succ){
        delete $rootScope.cart[flower_id];
      },
      function(fail){

      }
    )
  }

  co_ctrl.proceedToCards = function(){
    var params = {}

    angular.forEach($rootScope.cart, function(v,k){
      params[v.orders_flowers_id] = v.quantity;
    });

    OrderService.updateCart(params)
    .then(
      function(succ){
        //go to next step
        co_ctrl.step = 1;
      },
      function(fail){
        //show error, remain on the first step
      }
    )
  }

  co_ctrl.getCards = function(){
    UserService.getCards()
    .then(
      function(succ){
        co_ctrl.the_cards = succ.cards;

        co_ctrl.chosen_card = co_ctrl.the_cards.filter(function(card){
          return card.default == true;
        })[0]
      },
      function(fail){

      }
    )
  }

  co_ctrl.addCard = function(){
    UserService.addCard(
      co_ctrl.params.card
    )
    .then(
      function(succ){
        //add card to list of card, mark it as the selected one
        co_ctrl.the_cards.push(succ.the_card);
        co_ctrl.chosen_card = Object.assign({}, succ.the_card);
      },
      function(fail){

      }
    )
  }

  co_ctrl.getCardLogo = function(brand){
    //only covering visa and mastercard atm
    switch(brand){
      case "Visa":
        return "assets/images/credit_card_icons/visa.png";
      case "MasterCard":
        return "assets/images/credit_card_icons/mastercard.png";
    }
  }

  co_ctrl.getContacts = function(){
    UserService.getContacts()
    .then(
      function(succ){
        co_ctrl.the_contacts = succ.contacts;
        
        co_ctrl.chosen_contact = co_ctrl.the_contacts.filter(function(contact){
          return contact.default == true;
        })[0]
      },
      function(fail){

      }
    )
  }

  co_ctrl.addContact = function(){
    UserService.addContact(co_ctrl.params.contact)
    .then(
      function(succ){
        //add contact to list
        co_ctrl.the_contacts.push(succ.contact)
      },
      function(fail){

      }
    )
  }

  co_ctrl.purchase = function(){
    //the user will select a card from those provided
    //user will select a contact from those provided (ostensibly a shipping address)
    OrderService.purchase(co_ctrl.chosen_card.id, co_ctrl.chosen_contact.id)
    .then(
      function(succ){
        co_ctrl.step = 3;
        $rootScope.cart = {}
      },
      function(fail){

      }
    )
  }

  co_ctrl.getCards();

  co_ctrl.getContacts();
});