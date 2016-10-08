/**
 * Created by The BigBang on 4.10.2016.
 */
angular
    .module('comprice')
    .controller('detailCtrl',detailCtrl);
function detailCtrl($scope,productService) {
    var prouductId=productService.getProductId();
    var vm=this;
    var shopId;
    productService.queriedProduct(prouductId[0])
                .success(function(data){
                    vm.data=data;
                    console.log("the datea"+data.shopID);
                  productService.pushProductId(data.shopID);

                })



}
