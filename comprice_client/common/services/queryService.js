/**
 * Created by The BigBang on 25.9.2016.
 */
angular
    .module("comprice")
    .service('queryProduct',queryProduct);

function queryProduct($http){
    function queriedProducts(productName){
        return $http.get('api/products/searchItem?search='+productName);
    };
    function allProducts(){
        return $http.get('api/products');
    };
    return {
        queriedProducts:queriedProducts,
        allProducts:allProducts
    };




}

