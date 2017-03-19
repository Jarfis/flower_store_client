angular.module("flowerStore").controller("LoginController", function($rootScope, $scope, $state, UserService, OrderService) {
  var lo_ctrl = this;

  lo_ctrl.mode = "sign_in";

  //this controller will handle both logins and sign ups
  lo_ctrl.login = function(){
    UserService.login(lo_ctrl.email, lo_ctrl.password)
    .then(
      function(succ){
        //fetch in progress cart
        console.log("login success", succ);
        OrderService.fetchInProgress();
        $state.go("landing");
      },
      function(fail){

      }
    )
  }

  lo_ctrl.register = function(){
    UserService.register(lo_ctrl.su_email, lo_ctrl.su_password, lo_ctrl.su_password_conf)
    .then(
      function(succ){
        //navigate to landing i suppose
        $state.go("landing");
      },
      function(fail){

      }
    )
  }
});