import * as main from "../../common/main";
import "./menu.template";

main.module.directive('raetMenu', () => {
    return {
        restrict: 'E',
        templateUrl: 'controls/menu/menu.template.html'
    };
});