import * as main from "../../common/main";
import "./media.template";

main.module.directive('raetMedia', () => {
    return {
        restrict: 'E',
        scope: {
            img: "@",
            imgSize: "@"
        },
        templateUrl: 'controls/media/media.template.html',
        transclude: true
    };
});