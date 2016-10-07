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
    function filterProduct(catergory,maxPrice){
        return $http.get('api/products/filterItems?category='+catergory+'&maxPrice='+maxPrice+'&minPrice=0');
    };
    function allProducts(){
        return $http.get('api/products');
    };
    return {
        queriedProducts:queriedProducts,
        allProducts:allProducts,
        filterProduct:filterProduct
    };




}

