/// <reference path="../../../typings/globals/angular/index.d.ts" />
import * as main from "../../common/main";

main.module.directive('raetTableAddRow', (() => {
    let directive = ($compile) => {
        return {
            link: ($scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: any) => {
                let directiveToBeRendered = attrs['raetTableAddRow'];
                let colSpan = attrs['colSpan'] ? attrs['colSpan'] : 1;

                let template = `
                    <tr>
                        <td colspan="${colSpan}" ${directiveToBeRendered}="item">
                        </td>
                    </tr>
                `;

                $scope.showTemporality = () => {
                    let newRowElement = $compile(angular.element(template))($scope);
                    element.after(newRowElement);
                };
            },
            restrict: 'A'
        };
    };
    directive.$inject = ['$compile'];
    return directive;
})());