/**
 * Created by The BigBang on 25.9.2016.
 */
var product;
    $('#product').keypress(function(e) {
    if (e.keyCode === 13){
    product=$('#product').val();
        if(product!==""){
            window.location="#home";
        }
    }
});
angular
    .module('comprice')
    .controller('homeCtrl',homeCtrl);



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

queryProduct.queriedProducts(product)
 .success(function(data){
 vm.data=data;
     console.log(data);

 })
    $scope.queryProduct="";

}

