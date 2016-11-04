import * as main from "../../common/main";
import "./output.template";

main.module.directive('raetOutput', () => {
    return {
        restrict: 'E',
        templateUrl: 'controls/output/output.template.html',
        scope: {
            label: "@",
            content: "@",
            multiContent: "=",
            previous: "@",
            error: "@",
            raetId: "@"
        }
    };
});