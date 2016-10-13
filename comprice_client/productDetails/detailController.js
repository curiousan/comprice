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
                    var image= 'https://s3.eu-central-1.amazonaws.com/compricebucket123/'+data.image;
                     console.log("image link is "+ image);
                   
                    
                       $('#image').append('<img src="https://s3.eu-central-1.amazonaws.com/compricebucket123/'+data.image+'>');
                    console.log("the datea"+data.shopID);
                  productService.pushProductId(data.shopID);

                });



}
       
   


