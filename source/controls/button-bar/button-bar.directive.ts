import * as main from "../../common/main";
import "./button-bar.template";

main.module.directive("raetButtonBar", () => {
        return {
            restrict: 'E',
            templateUrl: "controls/button-bar/button-bar.template.html",
            link: function (scope: any) {
                if (!scope.ngModel) scope.ngModel = true;
            },
            scope: {
                isDisabled: "=",
                ngModel: "=?",
                options: "=",
                raetId: "@"
            }
        };
    });