import * as main from "../../common/main";
import "./autocomplete-demo.template";

main.demoControls.push(
{
    name: "autocomplete",
    title: "Autocomplete",
    description: "Autocomplete control"
});

main.module.controller('raetAutocompleteDemo', ['$scope', ($scope) => {

    let vmOptions = $scope.vmOptions = [
            { name: 'Option A', id: 'a' },
            { name: 'Option B', id: 'b' },
            { name: 'Option C', id: 'c' },
            { name: 'Option D', id: 'd' },
            { name: 'Option E', id: 'e' },
            { name: 'Option F', id: 'f' },
            { name: 'Option G', id: 'g' },
            { name: 'Option H', id: 'h' },
            { name: 'Option I', id: 'i' }
        ];
    $scope.vmOption = vmOptions[1].id;
    $scope.vmOptionError = vmOptions[5].id;
    $scope.errorMessage = 'You really screwed up this time.';
}]);