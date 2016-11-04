import * as main from "../../common/main";
import * as controller from "./autocomplete.controller";
import "./autocomplete.template";
import "./autocomplete.controller";

main.module.directive("raetAutocomplete", () => {
    return {
        restrict: 'E',
        templateUrl: "controls/autocomplete/autocomplete.template.html",
        controller: "RaetAutocompleteController",
        controllerAs: "vm",
        link: function (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: controller.AutocompleteController) {
            scope.setFocus = function () {
                element.find('input')[0].focus();
            };

            scope.$watch('vm.ngModel + vm.optionsList', () => {
                controller.init();
            });

            scope.$watch('vm.val', (a, b) => {
                if (a != b) {
                    scope.vm.change();
                }
            });

            element.bind('keypress', function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                }
            });
        },
        scope: {
            ngModel: "=",
            optionsList: "=",
            displayName: "@",
            isRequired: "=",
            isDisabled: "=",
            buttonAfter: "@",
            buttonAction: "&",
            raetId: "@",
            locked: "=",
            error: "@"
        },
        bindToController: true
    };
});