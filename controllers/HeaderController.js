angular.module("flowerStore").controller("HeaderController", function($rootScope, $scope, $state, UserService) {
  var h_ctrl = this;

  // h_ctrl.viewCart = function(){
  //   $state.go("checkout");
  // }

  // //login page is for logging in and for signing up
  // h_ctrl.logIn = function(){
  //   $state.go("login");
  // }

  // h_ctrl.browse = function(){
  //   $state.go("browse");
  // }

  // h_ctrl.settings = function(){
  //   $state.go("settings");
  // }

  h_ctrl.quickLogin = function(){
    UserService.login("bob@bob.bob", "password")
  }

  h_ctrl.logout = function(){
    UserService.logout();
  }
});