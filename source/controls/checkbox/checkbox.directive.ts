import * as main from "../../common/main";
import "./checkbox.template";

main.module.directive('raetCheckbox', () => {
    return {
        controller : () => {},
        restrict: 'E',
        scope: {
            displayName: "@",
            isDisabled: "=",
            isRequired: "=",
            labelText: "@",
            locked: "=",
            name: "@",
            ngModel: "=",
            error: "@",
            raetId: "@"
        },
        templateUrl: 'controls/checkbox/checkbox.template.html'
    };
});