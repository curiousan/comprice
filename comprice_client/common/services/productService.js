/**
 * Created by The BigBang on 4.10.2016.
 */
angular
    .module("comprice")
    .service('productService',productService);


function productService($http){
    var productId=[];
    function queriedProduct(productId){
        return $http.get('api/products/getSpecificProduct/'+productId);
    };
    function getImage(name){
        return $http.get('api/products/image?name='+name);
    };

    var pushProductId=function(id){
        productId.push(id);
    }

    var getProductId=function(){
        return productId;
    }
    return {
        queriedProduct:queriedProduct,
        getProductId:getProductId,
        pushProductId:pushProductId,
        getImage:getImage
    };




}