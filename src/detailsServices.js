(function () {
    angular
        .module('app')
        .factory('detailsServices', detailsServices);

    detailsServices.$inject = [
        '$http'
    ];

    function detailsServices($http) {
        return {
            getDetailsPokemon: getDetailsPokemon
        }

        function getDetailsPokemon(name) {
            return $http({
                method: 'GET',
                url: 'https://pokeapi.co/api/v2/pokemon/' + name
            })
                .then(success)
                .catch(failed);

            function success(response) {
                return response;
            }

            function failed(error) {
                console.error(error);
            }

        }
    }

})()