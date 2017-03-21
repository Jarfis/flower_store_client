angular.module("flowerStore").service("UserService", function($http, $q, $timeout, $rootScope, stripe, $auth){
  var serv = this;

  serv.login = function(email, pw){
    return $auth.submitLogin({
      email: email,
      password: pw
    })
    .then(
      function(res){
        console.log("user login", res);
        return res;
      }
    );
  }

  serv.logout = function(){
    return $auth.signOut()
    .then(function(res){return res.data;});
  }

  serv.register = function(email, pw, pw_conf){
    return $auth.submitRegistration({
      email: email,
      password: pw,
      password_confirmation: pw_conf
    })
    .then(
      function(res){
        console.log("register user", res);
        serv.login(email, pw);
        return res;
      }
    );
  }

  serv.addCard = function(card_params){
    // card_params = {
    //   number:,
    //   cvc:,
    //   exp_month:,
    //   exp_year:
    // }
    //send out a request to stripe. its possible this step will be handled by the form
    //send stripe token to server
    return stripe.card.createToken(card_params)
    .then(
      function (succ) {
        console.log('token created for card ending in ', succ.card.last4);
        
        return $http.post(
          $rootScope.api_url + "/cards",
          {
            stripe_token: succ.id
          }
        )
        .then(function(res){return res.data;});
      },
      function(fail){
        console.log("stripe card failed")
      }
    )
  }

  serv.removeCard = function(card_id){

  }

  serv.getCards = function(){
    return $http.get($rootScope.api_url + "/cards")
    .then(function(res){return res.data;});
  }

  serv.addContact = function(contact_params){
    return $http.post(
      $rootScope.api_url + "/contacts",
      contact_params
    )
    .then(function(res){return res.data;});
  }

  serv.getContacts = function(){
    return $http.get($rootScope.api_url + "/contacts")
    .then(function(res){return res.data;});
  }
});