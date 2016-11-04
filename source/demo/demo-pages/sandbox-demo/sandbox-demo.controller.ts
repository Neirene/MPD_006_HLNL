import * as main from "../../common/main";
import "./sandbox-demo.template";

main.demoControls.push(
    {
        name: "sandbox",
        title: "Sandbox",
        description: "Testing how components work together :)"
    });

main.module.controller('raetSandboxDemo', ['$scope', ($scope) => {

    $scope.prefixOptions = [
        { id: 1, name: 'Sr' },
        { id: 2, name: 'Mr' },
        { id: 3, name: 'Mrs' }
    ];

    $scope.genderOptions = [
        { text: 'Male', val: 'male' },
        { text: 'Female', val: 'female' }
    ];

    $scope.countryList = [
        { id: 1, name: 'Portugal' },
        { id: 2, name: 'Spain' },
        { id: 3, name: 'England' }
    ];

    $scope.postal = true;
}]);