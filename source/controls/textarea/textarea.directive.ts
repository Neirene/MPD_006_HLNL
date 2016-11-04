import * as main from "../../common/main";
import "../../filters/format";
import "./textarea.template";

main.module.directive('raetTextarea', () => {
    return {
        restrict: 'E',
        scope: {
            label: "@",
            max: "=",
            ngModel: "=",
            rows: "=",
            textCharacter: "@",
            textCharacters: "@",
            isDisabled: "=",
            isRequired: "=",
            locked: "=",
            raetId: "@",
            error: "@"
        },
        templateUrl: 'controls/textarea/textarea.template.html',
        transclude: true
    };
});