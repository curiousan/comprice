/**
 * Created by The BigBang on 25.9.2016.
 */
angular
    .module('comprice')
    .controller('homeCtrl',homeCtrl);



function homeCtrl($scope,queryProduct) {
    $scope.productId=function(id){
        console.log("The item id"+ id);
    }
    var vm=this;
    $scope.$watch('queryProduct',function(){
        if($scope.queryProduct!==""){
            queryProduct.queriedProducts($scope.queryProduct)
            .success(function(data){
                vm.data=data;

                console.log($scope.queryProduct);

            })
        }
    });
    $scope.queryProduct="jeans";

}

