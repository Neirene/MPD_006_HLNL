import * as main from "../../common/main";

export class RaetNotificationController {

    static $inject = ["$scope"];

    mode: string;
    icon: string;
    isVisible: string;

    constructor(private $scope) {
        this.init();
    }

    private init() {
        if (!this.mode) {
            this.mode = 'notification';
        }

        switch (this.mode) {
            case 'success':
                this.icon = 'check';
                break;
            case 'error':
                this.icon = 'exclamation';
                break;
            case 'notification':
            default:
                this.icon = 'lightbulb-o';
                break;
        }

        this.isVisible = 'is-visible';
    }

    private close() {
        this.isVisible = '';
    }
}

main.module.controller("RaetNotificationController", RaetNotificationController);
