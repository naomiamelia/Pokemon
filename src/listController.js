(function () {
    angular
        .module('app')
        .controller('listController', listController)

    listController.$inject = [
        '$rootScope',
        'listServices',
        '$scope'
    ];

    function listController($rootScope, listServices, $scope) {
        var vm = this;
        vm.$onInit = onInit;
        vm.getListPokemon = getListPokemon;
        vm.getListPokemon();

        $scope.name = 'World';

        $scope.onTourReady = function (tour) {

            tour.start();

        };

        $scope.startTour = function () {
            console.log('start tour');

            this.tour.start();

        };

        function onInit() {
            vm.previous = null;
        }

        function getListPokemon() {
            listServices.getListPokemon().then(function (response) {
                $rootScope.pokeList = response.data.results;
                vm.next = response.data.next;
                vm.previous = response.data.previous;
            })

        }

        vm.getLink = function (currUrl) {
            listServices.getLink(currUrl).then(function (response) {
                $rootScope.pokeList = response.data.results;
                vm.next = response.data.next;
                vm.previous = response.data.previous;
            });
        }
    }
})();