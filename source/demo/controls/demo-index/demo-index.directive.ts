import * as main from "../../common/main";
import "./demo-index.template";


main.module.directive('raetDemoIndex', () => {
    return {
        restrict: 'E',
        templateUrl: 'demo/controls/demo-index/demo-index.template.html'
    };
});