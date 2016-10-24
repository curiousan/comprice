/**
 * Created by The BigBang on 7.10.2016.
 */
angular
    .module('comprice')
    .controller('mapContoller',mapController)

var map;
var latitude;
var longitude;
function mapController($scope,productService,queryProduct){
    var vm=this;
        var shop=productService.getProductId();
        queryProduct.getShop(shop[shop.length-1])
            .success(function(data){
                vm.data=data;
                vm.weekhours=data.openingTime[1];
                vm.weekendhours=data.openingTime[2];
                console.log(vm.weekhours+ " "+ vm.weekendhours);
                var codr=data.coords;
                latitude=codr[1];
                longitude=codr[0];
                console.log("The data"+ latitude+ " "+ longitude);
                    $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=********&callback=initMap" async defer></script>')
                shop.pop();

            })


}





