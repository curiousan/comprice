/**
 * Created by The BigBang on 4.10.2016.
 */


angular
    .module('comprice')
    .controller('detailCtrl',detailCtrl);
function detailCtrl($scope,productService,queryProduct) {
    var prouductId=productService.getProductId();
    var vm=this;
    var shopId;
    var length=prouductId.length;
    console.log("The length of array"+ length);


    productService.queriedProduct(prouductId[length-1])
                .success(function(data){
                    vm.data=data;
                    console.log("the datea"+data.shopID);




                    console.log("The array is" + prouductId);

                  productService.pushProductId(data.shopID);


                    var shop=productService.getProductId();
                    queryProduct.getShop(shop[shop[shop.length-1]])
                        .success(function(data){
                            var codr=data.coords;
                            latitude=codr[1];
                            longitude=codr[0];
                            console.log("The data"+ latitude+ " "+ longitude);
                            $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvRnqDJdIoDSfHGmyRakdUR2TRQ4j1d2w&callback=initMap" async defer></script>')



                        })


                })




}


