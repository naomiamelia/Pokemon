(function () {
    angular
        .module('app')
        .factory('listServices', listServices);

    listServices.$inject = [
        '$http'
    ];

    function listServices($http, logger) {
        return {
            getListPokemon: getListPokemon,
            getLink: getLink
        }

        function getListPokemon() {
            return $http({
                method: 'GET',
                url: 'https://pokeapi.co/api/v2/pokemon/'
            })
                .then(success)
                .catch(failed);

            function success(response) {
                return response;
            }

            function failed(e) {
                logger.logError('Error');
            }
        }

        function getLink(currUrl) {
            return $http({
                method: 'GET',
                url: currUrl
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