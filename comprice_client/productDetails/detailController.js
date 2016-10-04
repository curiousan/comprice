/**
 * Created by The BigBang on 4.10.2016.
 */
angular
    .module('comprice')
    .controller('detailCtrl',detailCtrl);
function detailCtrl(productService) {
    var vm=this;
    productService.queriedProduct("57f2981cedb9cf04a6a5e4ee")
                .success(function(data){
                    vm.data=data;
                    console.log("the datea"+data);
                })



}