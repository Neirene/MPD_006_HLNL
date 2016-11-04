/// <reference path="../../../typings/globals/angular/index.d.ts" />
import * as main from "../../common/main";
import "./radio-group.template";

main.module.directive('raetRadioGroup', () => {
  return {
    link: ($scope: any) => {
      if (angular.isUndefined($scope.ngModel)) {
        $scope.ngModel = $scope.options && $scope.options.length
          ? $scope.options[0].val
          : undefined;
      }

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
      inline: "=",
      isDisabled: "=",
      label: "@",
      ngModel: "=?",
      ngChange: "&?",
      options: "=",
      locked: "=",
      error: "@",
      raetId: "@"
    },
    templateUrl: 'controls/radio-group/radio-group.template.html'
  };
});
