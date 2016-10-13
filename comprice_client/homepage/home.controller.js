/**
 * Created by The BigBang on 25.9.2016.
 */
angular
    .module('comprice')
    .controller('homeCtrl',homeCtrl);
var product="";
$('#error').hide();
    $('#product').keypress(function(e) {
    if (e.keyCode === 13){
     product=$('#product').val();
        if(product!==""){
            window.location="#home";
        }
        else if(product===""){
            $('#error').show();
            $( "#error" ).fadeOut(2000);

        }
    }
});

function homeCtrl($scope,queryProduct,productService) {
    var vm=this;
    $scope.productId=function(id){
        productService.pushProductId(id);
        console.log(productService.getProductId());
    }


$scope.searchProduct=function(){
        $scope.$watch('queryProduct',function(){
            if($scope.queryProduct===""||$scope.queryProduct === undefined){
                queryProduct.allProducts($scope.queryProduct)
                    .success(function(data){
                        vm.data=data;
                        var image=data.image;
                        console.log("the images "+ data.image);
                        console.log("teh image lenght "+data.length)






                    })
            }
            else{
                queryProduct.queriedProducts($scope.queryProduct)
                    .success(function(data){
                        vm.data=data;

                    })
            }
        });
}

if(product===""){
    queryProduct.filterProduct("","1000")
        .success(function(data){
            vm.data=data;
            console.log(data);
            var image=data.image;
            var imageurl;




        })
}
else{
queryProduct.queriedProducts(product)
 .success(function(data){
 vm.data=data;
     var image=data.image;
     console.log("the images "+ data.image);



 })
}
    $scope.queryProduct="";




    $scope.filterProduct=function(){
        $scope.$watchCollection('category + priceRange ',function(){
            var category=$('#category option:selected').text();
            var priceRange=$scope.priceRange;
            if(priceRange===undefined){
                priceRange="800";
            }
            if (category==="All"){
                category="";
            }

            queryProduct.filterProduct(category,priceRange)
                .success(function(data){
                    vm.data=data;
                    console.log(data);
                    var image=data.image;
                    var imageurl;




                })
        },true);

    }

}

