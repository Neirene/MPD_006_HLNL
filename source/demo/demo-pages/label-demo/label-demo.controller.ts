import * as main from "../../common/main";
import "./label-demo.template";

main.demoControls.push(
{
    name: "label",
    title: "Label",
    description: "Label control"
});

main.module.controller('raetLabelDemo', ['$scope', ($scope) => {
    $scope.vmText = "Label text:";
}]);