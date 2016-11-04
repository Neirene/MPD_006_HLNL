import * as main from "../../common/main";
import "./switch.template";

main.module.directive('raetSwitch', () => {
    return {
        restrict: 'E',
        scope: {
                disabled: "=",
                displayName: "@",
                lock: "=",
                locked: "=",
                name: "@",
                ngModel: "=",
                raetId: "@"
        },
        templateUrl: 'controls/switch/switch.template.html',
        transclude: true
    };
});