// (function () {
//     angular.module('app', ['ngRoute']).controller('myCtrl', function ($scope, $http) {
//         $http.get("https://pokeapi.co/api/v2/pokemon").then(function (response) {
//             $scope.data = response.data.results;
//         })
//     })
// })()

(function () {
    var app = angular.module('app', ['ngRoute']);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "list.html",
                controller: 'myCtrl'
            })
            .when('/:pokemonName', {
                templateUrl: "details.html",
                controller: 'detailsController'
            })
    })
    app.controller('myCtrl', function ($rootScope, $scope, $http) {
        var self = this;
        self.$onInit = onInit;
        function onInit() {
            $scope.previous = null;
        }
        $http({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/'
        }).then(function (response) {
            $rootScope.pokeList = response.data.results;
            $scope.next = response.data.next;
            $scope.previous = response.data.previous;
        });
        $scope.getDetail = function (currUrl) {
            $http({
                method: 'GET',
                url: currUrl
            }).then(function (response) {
                $rootScope.pokeList = response.data.results;
                $scope.next = response.data.next;
                $scope.previous = response.data.previous;
            });
        }
    });
    app.controller('detailsController', function ($rootScope, $scope, $http, $routeParams) {
        function details() {
            for (var i in $rootScope.pokeList) {
                if ($rootScope.pokeList[i].name == $routeParams.pokemonName) {
                    $http({
                        method: 'GET',
                        url: $rootScope.pokeList[i].url
                    }).then(function (response) {
                        $scope.pokeAbilities = response.data.abilities;
                        $scope.pokeHeight = response.data.height;
                        $scope.pokeWeight = response.data.weight;
                        $scope.pokeSprites = response.data.sprites;
                    })
                }
            }
        }
        if (!$rootScope.pokeList) {
            $http({
                method: 'GET',
                url: "https://pokeapi.co/api/v2/pokemon"
            }).then(function (response) {
                $rootScope.pokeList = response.data.results;
                $scope.next = response.data.next;
                $scope.previous = response.data.previous;
                details();
            });
        } else {
            details();
        }
    });
})()
