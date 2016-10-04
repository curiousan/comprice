/**
 * Created by The BigBang on 4.10.2016.
 */
angular
    .module("comprice")
    .service('productService',productService);

function productService($http){
    function queriedProduct(productId){
        return $http.get('api/products/getSpecificProduct/'+productId);
    };
    return {
        queriedProduct:queriedProduct
    };




}