import * as main from "../../common/main";
import "./input.template";

main.module.directive('raetInput', () => {

  return {
    controller: () => { },
    restrict: 'E',
    require: "ngModel",
    scope: {
      customPattern: "@",
      disabled: "=",
      displayName: "@",
      iconAfter: "@",
      iconBefore: "@",
      isRequired: "=",
      locked: "=",
      maxLength: "=",
      name: "@",
      ngModel: "=",
      placeholder: "@",
      raetId: "@",
      textAfter: "@",
      textBefore: "@",
      error: "@",
      ngChange: "&?",
      autofocus: "=?"
    },
    link: function ($scope: any, element) {

      // Autofocus input
      if ($scope.autofocus) {
        element.find('input')[0].focus();
      }

      $scope.onChange = function () {
        // If there is a ngChange function associated, it should call it and pass the ngModel
        if ($scope.ngChange) {
          $scope.ngChange({ model: $scope.ngModel });
        }

        // When changing, error should be cleared
        $scope.error = undefined;
      };
    },
    templateUrl: 'controls/input/input.template.html'
  };
});