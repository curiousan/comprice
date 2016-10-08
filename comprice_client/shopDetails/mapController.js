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
        var shop=productService.getProductId();
        queryProduct.getShop(shop[1])
            .success(function(data){
                var codr=data.coords;
                latitude=codr[0];
                longitude=codr[1];
                console.log("The data"+ latitude+ " "+ longitude);

            })


}





