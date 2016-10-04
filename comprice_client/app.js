/**
 * Created by The BigBang on 25.9.2016.
 */
angular.module('comprice',['ngRoute']);


function config($routeProvider){


    $routeProvider
        .when('/',{
            templateUrl:'homepage/base_layout.html',
            controller:'homeCtrl',
            controllerAs:'vm'

    })
        .when('/productDetail',{
            templateUrl:'productDetails/results.html',
            controller:'detailCtrl',
            controllerAs:'vm'

        })
        .otherwise({redirectTo:'/'})

}
angular
    .module('comprice')
    .config(['$routeProvider',config]);
