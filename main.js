var flowerStore = angular.module("flowerStore", [
  "ui.router",
  "ui.bootstrap",
  "oc.lazyLoad",
  "ng-token-auth",
  "angular-stripe"
]);

flowerStore.constant("apiUrl", "http://flowerstore.com:3000");

flowerStore.config(["$authProvider", "apiUrl", function($authProvider, apiUrl) {
  console.log("test", apiUrl);
  //hmm, looks like the constant cant be used in the config
  $authProvider.configure(
    {
      apiUrl: apiUrl,
      cookieOps: {
        domain: "flowerstore.com",
        expires: 30,
        path: "/",
        expirationUnit: "days",
        secure: false
      }
    }
  );
}]);

flowerStore.config(function (stripeProvider) {
  stripeProvider.setPublishableKey("pk_test_C8LhRd4jAWzHSUWbxmSt2q2w");
});

flowerStore.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider

  .state("landing", {
    url: "/",
    templateUrl: "views/landing.html",
    data: {pageTitle: "Flower Store"},
    controller: "LandingController",
    controllerAs:"la_ctrl",
    resolve: {
      deps: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          insertBefore: "#lazyload_plugins",
          files: [
            "controllers/LandingController.js",
            "services/FlowerService.js",
            "assets/css/landing.css"
          ] 
        });
      }]
    }

  })

  //login/sign up page
  .state("login", {
    url: "/login",
    templateUrl: "views/login.html",
    data: {pageTitle: "Flower Store Login"},
    controller: "LoginController",
    controllerAs: "lo_ctrl",
    resolve: {
      deps: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          insertBefore: "#lazyload_plugins",
          files: [
            "services/UserService.js",
            "services/OrderService.js",
            "controllers/LoginController.js",
            "assets/css/login.css"
          ] 
        });
      }]
    }
  })

  // browse flowers
  .state("browse", {
    url: "/browse",
    templateUrl: "views/browse.html",    
    data: {pageTitle: "Browse Flowers"},
    controller: "BrowseController",
    controllerAs: "bro_ctrl",
    resolve: {
      deps: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          insertBefore: "#lazyload_plugins",
          files: [
            "services/FlowerService.js",
            "controllers/BrowseController.js",
            "assets/css/browse.css"
          ] 
        });
      }]
    }
  })

  // view flowers
  .state("view_flower", {
    url: "/flower/:id",
    templateUrl: "views/view_flower.html",    
    data: {pageTitle: "Flower Details"},
    controller: "ViewFlowerController",
    controllerAs: "vf_ctrl",
    resolve: {
      deps: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          insertBefore: "#lazyload_plugins",
          files: [
            "services/FlowerService.js",
            "services/OrderService.js",
            "controllers/ViewFlowerController.js",
            "assets/css/view_flower.css"
          ] 
        });
      }]
    }
  })

  // checkout
  .state("checkout", {
    url: "/checkout",
    templateUrl: "views/checkout.html",    
    data: {pageTitle: "Checkout"},
    controller: "CheckoutController",
    controllerAs: "co_ctrl",
    resolve: {
      deps: ["$ocLazyLoad", function($ocLazyLoad) {
        return $ocLazyLoad.load({
          insertBefore: "#lazyload_plugins",
          files: [
            "services/FlowerService.js",
            "services/OrderService.js",
            "services/UserService.js",
            "controllers/CheckoutController.js",
            "assets/css/checkout.css"
          ] 
        });
      }]
    }
  })
}]);

flowerStore.run(["$rootScope", "$state", "apiUrl", function($rootScope, $state, apiUrl) {
  $rootScope.$state = $state;

  $rootScope.api_url = apiUrl;

  //im thinking the cart will be like this
  //actually, i'm torn as to whether it should use the flower_id as the key or the orders_flowers_id
  // {
  //   <flower_id>: {
  //     order_flowers_id:,
  //     quantity:,
  //     cost:
  //   },
  //   <flower_id>: {
  //     order_flowers_id:,
  //     quantity:,
  //     cost:
  //   }
  // }
  $rootScope.cart = {}
}]);