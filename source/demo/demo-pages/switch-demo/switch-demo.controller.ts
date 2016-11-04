import * as main from "../../common/main";
import "./switch-demo.template";

main.demoControls.push(
{
    name: "switch",
    title: "Switch",
    description: "Switch control"
});

main.module.controller('raetSwitchDemo', ['$scope', ($scope) => {
    $scope.vmFlag = true;
}]);