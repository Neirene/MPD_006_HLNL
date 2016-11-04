import * as main from "../../common/main";
import * as controller from "./notification.controller";
import "./notification.controller";
import "./notification.template";

main.module.directive('raetNotification', () => {
    return {
        restrict: 'E',
        templateUrl: 'controls/notification/notification.template.html',
        controller: 'RaetNotificationController',
        controllerAs: 'vm',
        scope: {
            mode: "@",
            text: "@",
            list: "=",
            closable: "=",
            raetId: "@"
        },
        bindToController: true
    };
});