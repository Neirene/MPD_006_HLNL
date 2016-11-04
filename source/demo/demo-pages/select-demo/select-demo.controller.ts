import * as main from "../../common/main";
import "./select-demo.template";

main.demoControls.push(
    {
        name: "select",
        title: "Select",
        description: "Select control"
    });

main.module.controller('raetSelectDemo', ['$scope', ($scope) => {

    $scope.vmOptions = [
        { name: 'A', id: 'a' },
        { name: 'B', id: 'b' },
        { name: 'C', id: 'c' },
        { name: 'D', id: 'd' },
        { name: 'E', id: 'e' },
        { name: 'F', id: 'f' },
        { name: 'G', id: 'g' },
        { name: 'H', id: 'h' },
        { name: 'I', id: 'i' }
    ];

    $scope.vmGroupedOptions = [
        { name: 'A', group: 'Group 1', id: 'a' },
        { name: 'B', group: 'Group 1', id: 'b' },
        { name: 'C', group: 'Group 1', id: 'c' },
        { name: 'D', group: 'Group 1', id: 'd' },
        { name: 'E', group: 'Group 2', id: 'e' },
        { name: 'F', group: 'Group 2', id: 'f' },
        { name: 'G', group: 'Group 2', id: 'g' },
        { name: 'H', group: 'Group 3', id: 'h' },
        { name: 'I', group: 'Group 3', id: 'i' }
    ];

    $scope.myChangeFunction = (model) => console.log('New value:', model);

}]);
