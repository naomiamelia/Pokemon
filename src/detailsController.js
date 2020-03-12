(function () {
    angular
        .module('app')
        .controller('detailsController', detailsController)

    detailsController.$inject = [
        '$routeParams',
        'detailsServices'
    ];

    function detailsController($routeParams, detailsServices) {
        var vm = this;

        detailsServices.getDetailsPokemon($routeParams.pokemonName).then(function (response) {
            vm.pokeAbilities = response.data.abilities;
            vm.pokeHeight = response.data.height;
            vm.pokeWeight = response.data.weight;
            vm.pokeSprites = response.data.sprites;
        });
    }


})();