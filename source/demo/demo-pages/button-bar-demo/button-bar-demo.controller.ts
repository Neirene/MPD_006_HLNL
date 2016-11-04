import * as main from "../../common/main";
import "./button-bar-demo.template";

main.demoControls.push(
{
    name: "button-bar",
    title: "Button bar",
    description: "Button bar control"
});

main.module.controller('raetButtonBarDemo', ['$scope', ($scope) => {

    let vmOptions = $scope.vmOptions = [
            { icon: 'male', val: 'male' },
            { icon: 'female', val: 'female' },
            { icon: 'child', val: 'child' }
        ];
    $scope.vmOption = vmOptions[vmOptions.length - 1].val;
}]);