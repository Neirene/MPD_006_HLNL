/// <reference path="../../../typings/globals/angular/index.d.ts" />
import * as main from "../../common/main";
import { ISelectOption } from "./ISelectOption";
import "./select.template";

main.module.directive('raetSelect', () => {
  return {
    link: ($scope: any) => {
      $scope.onChange = function () {
        // If there is a ngChange function associated, it should call it and pass the ngModel
        if ($scope.ngChange) {
          $scope.ngChange({ model: $scope.ngModel });
        }

        // When changing an option, error should be cleared
        $scope.error = undefined;
      };
    },
    restrict: 'E',
    scope: {
      defaultText: "@",
      displayName: "@",
      isDisabled: "=",
      isRequired: "=",
      locked: "=",
      ngModel: "=",
      optionsList: "=",
      error: "@",
      raetId: "@",
      ngChange: "&?"
    },
    templateUrl: 'controls/select/select.template.html'
  };
});
