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
<<<<<<< HEAD
                    var image= 'https://s3.eu-central-1.amazonaws.com/compricebucket123/'+data.image;
                     console.log("image link is "+ image);
                   
                    
                       $('#image').append('<img src="https://s3.eu-central-1.amazonaws.com/compricebucket123/'+data.image+'>');
=======
>>>>>>> 9f48311e995ab1225a2094cbf7eb8b9c74afde6f
                    console.log("the datea"+data.shopID);




                    console.log("The array is" + prouductId);

                  productService.pushProductId(data.shopID);

<<<<<<< HEAD
                });
=======
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
>>>>>>> 9f48311e995ab1225a2094cbf7eb8b9c74afde6f



}
<<<<<<< HEAD
       
   

=======
>>>>>>> 9f48311e995ab1225a2094cbf7eb8b9c74afde6f

