import * as main from "../../common/main";
import "./input-demo.template";

main.demoControls.push(
  {
    name: "input",
    title: "Input",
    description: "Input control"
  });

main.module.controller('raetInputDemo', ['$scope', ($scope) => {
  $scope.vmText = '<text>';
  $scope.vmTextError = '';
  $scope.errorMessage = 'This is an error message.';
  $scope.textError = function () {
    $scope.errorMessage = 'Another message';
  };
  $scope.myChangeFunction = (model) => console.log('New value:', model);
}]);
