import * as main from "../../common/main";
import "./dropdown.template";

main.module.directive('raetDropdown', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'controls/dropdown/dropdown.template.html',
        scope: {
            icon: "@",
            text: "@",
            list: "=",
            raetId: "@"
        },
        link: function (scope: any, element, attr) {
            let dropdown = element.children().eq(0);
            let list = dropdown.find('ul');

            scope.isHidden = true;
            scope.active = -1;
            scope.keys = {
                up: 38,
                down: 40,
                enter: 13,
                esc: 27,
                tab: 9
            };

            scope.open = () => {
                $timeout(function () {
                    scope.isHidden = false;
                }, 0);
            };

            scope.close = () => {
                let d = <any>document.activeElement;
                d.blur();
                $timeout(function () {
                    scope.active = -1;
                    scope.isHidden = true;
                }, 0);
            };

            scope.setActive = (index) => {
                scope.active = index;
            };

            scope.key = (keyPressed: number) => {
                switch (keyPressed) {
                    case (scope.keys.up):
                        if (scope.active > 0) {
                            scope.active -= 1;
                        }
                        break;
                    case (scope.keys.down):
                        if (scope.active < scope.list.length - 1) {
                            scope.active += 1;
                        }
                        break;
                    case (scope.keys.enter):
                        if (scope.list[scope.active]) {
                            scope.list[scope.active].action();
                        }
                        scope.close();
                        break;
                    case (scope.keys.esc):
                        scope.close();
                        break;
                }
            };

            dropdown.bind('keydown', function (e) {
                // Prevent scrolling (exception for tab key to allow blur)
                if (e.keyCode != 9) {
                    e.preventDefault();
                }
            });

            dropdown.bind('focus', function (e) {
                // On focus open the dropdown
                scope.open();

                // Clear offsets
                list.removeClass('off-left');
                list.removeClass('off-right');

                // Align based on screen position
                if (list[0].getBoundingClientRect().right >= window.innerWidth) {
                    list.addClass('off-right');
                }

                if (list[0].getBoundingClientRect().left <= 0) {
                    list.addClass('off-left');
                }

                // This is a workaround for touch devices since blur doesn't fire
                angular.element(document).find('html').one('touchstart', function (e) {
                    $timeout(function () {
                        scope.close();
                    }, 300);
                });
            });

            // On blur close the dropdown
            dropdown.bind('blur', scope.close);
        }
    };
}]);