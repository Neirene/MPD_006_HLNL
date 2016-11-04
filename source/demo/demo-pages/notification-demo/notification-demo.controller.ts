import * as main from "../../common/main";
import "./notification-demo.template";

main.demoControls.push(
{
    name: "notification",
    title: "Notification",
    description: "Notification control"
});

main.module.controller('raetNotificationDemo', ['$scope', ($scope) => {
    $scope.errors = [
        'Something went wrong',
        'This is a possible error',
        'This is another possible error',
        'You can have any number of errors'
    ];
}]);