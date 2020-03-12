(function () {
    angular
        .module('app')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'list.html',
                controller: 'listController',
                controllerAs: 'vm'
            })
            .when('/:pokemonName', {
                templateUrl: 'details.html',
                controller: 'detailsController',
                controllerAs: 'vm'
            })
    }

})()