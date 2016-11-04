import * as main from "../../common/main";
import "./textarea-demo.template";

main.demoControls.push(
{
    name: "textarea",
    title: "Textarea",
    description: "Textarea control"
});

main.module.controller('raetTextareaDemo', ['$scope', ($scope) => {
    $scope.vmText = '<text>';
    $scope.vmTextError = '';
    $scope.errorMessage = 'This is an error message.';
}]);