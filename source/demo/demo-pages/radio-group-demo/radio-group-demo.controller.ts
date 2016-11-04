import * as main from "../../common/main";
import "./radio-group-demo.template";

main.demoControls.push(
{
    name: "radio-group",
    title: "Radio Group",
    description: "Radio Group control"
});

main.module.controller('raetRadioGroupDemo', ['$scope', ($scope) => {
    let vmOptions = $scope.vmOptions = [
            { text: 'Option A', val: 'a' },
            { text: 'Option B', val: 'b' },
            { text: 'Option C', val: 'c' }
        ];

    $scope.myChangeFunction = (model) => console.log('New value:', model);
}]);