import * as main from "../../common/main";
import "./checkbox-demo.template";

main.demoControls.push(
{
    name: "checkbox",
    title: "Checkbox",
    description: "Checkbox control"
});

main.module.controller('raetCheckboxDemo', ['$scope', ($scope) => {
    $scope.vmFlag = true;
}]);