/// <reference path="../../../typings/globals/angular/index.d.ts" />
import * as main from "../../common/main";
import "./table-content.template";

main.module.directive('raetTableContent', (() => {
    let directive: ng.IDirectiveFactory = ($compile, $templateRequest) => {
        return {
            link: ($scope: any, element: ng.IAugmentedJQuery) => {
                let newElement;
                if ($scope.template) {
                    newElement = $compile(angular.element($scope.template))($scope);
                    element.append(newElement);
                } else {
                    $templateRequest('controls/table/table-content.template.html').then((html) => {
                        html = html.replace('#filter#', $scope.filter ? ` | ${$scope.filter}` : '');
                        newElement = angular.element(html);
                        element.append($compile(newElement)($scope));
                    });
                }
            },
            restrict: 'E',
            scope: {
                definition: '=raetTableContentDefinition',
                externalBehavior: '=raetTableContentExternalBehavior',
                filter: '=raetTableContentFilter',
                index: '@raetTableContentIndex',
                item: '=raetTableContentItem',
                raetId: "@",
                sort: '=raetTableContentSort',
                template: '=raetTableContentTemplate',
                text: '=raetTableContentText'
            }
        };
    };
    directive.$inject = ['$compile', '$templateRequest'];
    return directive;
})());