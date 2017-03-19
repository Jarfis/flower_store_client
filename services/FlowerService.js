angular.module("flowerStore").service("FlowerService", function($http, $q, $timeout, $rootScope){
  var serv = this;

  serv.fetchFlowers = function(){
    return $http.get($rootScope.api_url + "/flowers")
    .then(function(res){return res.data;});
  }

  serv.fetchFlower = function(id){
    return $http.get($rootScope.api_url + "/flowers/" + id)
    .then(function(res){return res.data;});
  }

  serv.randomFlowers = function(){
    return $http.get($rootScope.api_url + "/random_flowers/")
    .then(function(res){return res.data;});
  }
});