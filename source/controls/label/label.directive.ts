import * as main from "../../common/main";
import "./label.template";

main.module.directive('raetLabel', () => {
    return {
        restrict: 'E',
        scope: {
            label: "@",
            isRequired: "=",
            locked: "=",
            raetId: "@"
        },
        templateUrl: 'controls/label/label.template.html'
    };
});