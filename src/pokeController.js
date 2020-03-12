// (function () {
//     angular.module('app', ['ngRoute']).controller('myCtrl', function ($scope, $http) {
//         $http.get("https://pokeapi.co/api/v2/pokemon").then(function (response) {
//             $scope.data = response.data.results;
//         })
//     })
// })()

(function () {
    angular
        .module('app', ['ngRoute'])
        .controller('listController', listController)
        .controller('detailsController', detailsController)

    listController.$inject = [
        '$http',
        '$scope',
        '$rootScope',
        'pokeServices'
    ];

    detailsController.$inject = [
        '$http',
        '$scope',
        '$rootScope',
        '$routeParams',
        'pokeServices'
    ];

    function listController($rootScope, $scope, $http, pokeServices) {
        var self = this;
        self.$onInit = onInit;
        $scope.getListPokemon = getListPokemon;
        $scope.getListPokemon();

        function onInit() {
            $scope.previous = null;
        }

        function getListPokemon() {
            pokeServices.getListPokemon().then(function (response) {
                $rootScope.pokeList = response.data.results;
                $scope.next = response.data.next;
                $scope.previous = response.data.previous;
            })

        }

        $scope.getLink = function (currUrl) {
            $http({
                method: 'GET',
                url: currUrl
            }).then(function (response) {
                $rootScope.pokeList = response.data.results;
                $scope.next = response.data.next;
                $scope.previous = response.data.previous;
            });
        }
    }

    function detailsController($rootScope, $scope, $http, $routeParams, pokeServices) {
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
            pokeServices.getListPokemon().then(function (response) {
                $rootScope.pokeList = response.data.results;
                $scope.next = response.data.next;
                $scope.previous = response.data.previous;
                details();
            });
        } else {
            details();
        }
    }
})()
