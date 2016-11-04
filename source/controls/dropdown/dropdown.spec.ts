/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as dropdown from "./dropdown.directive";
declare var window: { require: (moduleName: string) => any };

describe('raet-controls-dropdown.', () => {

    let $compile, $rootScope, $timeout, element, scope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", "$timeout", (_$compile_, _$rootScope_, $_timeout_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = $_timeout_;
        element = $compile(`<raet-dropdown data-icon="bars"></raet-dropdown>`)($rootScope);
        $rootScope.$digest();
        scope = element.isolateScope();
    }]));

    it('module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-dropdown')).toEqual(dropdown);
    });

    it('exists after compile', () => {
        expect(element.length).toEqual(1);
    });

    describe('calling open', () => {
        it('isHidden should be false', () => {
            scope.open();
            $timeout.flush();
            expect(scope.isHidden).toBeFalsy();
        });
    });

    describe('calling close', () => {
        it('active should be -1', () => {
            scope.close();
            $timeout.flush();
            expect(scope.active).toBe(-1);
        });

        it('isHidden should be true', () => {
            scope.close();
            $timeout.flush();
            expect(scope.isHidden).toBeTruthy();
        });
    });

    describe('calling setActive', () => {
        it('active should be 2', () => {
            scope.setActive(2);
            $timeout.flush();
            expect(scope.active).toBe(2);
        });
    });

    describe('calling key', () => {
        describe('pressing up key', () => {
            it('if active > 0 it should decrease in 1', () => {
                scope.active = 2;
                scope.key(scope.keys.up);
                expect(scope.active).toBe(1);
            });

            it('if active <= 0 it should have the same value', () => {
                scope.active = -1;
                scope.key(scope.keys.up);
                expect(scope.active).toBe(-1);
            });
        });

        describe('pressing down key ', () => {
            it('if active < list.length - 1 it should increase in 1', () => {
                scope.list = [
                    { text: '1' },
                    { text: '2' }
                ];
                scope.active = 0;
                scope.key(scope.keys.down);
                expect(scope.active).toBe(1);
            });

            it('if active >= list.length it should have the same value', () => {
                scope.list = [
                    { text: '1' },
                    { text: '2' }
                ];
                scope.active = 1;
                scope.key(scope.keys.down);
                expect(scope.active).toBe(1);
            });
        });

        describe('pressing enter key', () => {
            beforeEach(function () {
                let action = jasmine.createSpy('action');
                scope.active = 1;
                scope.list = [
                    { action: action },
                    { action: action }
                ];
            });

            it('should go to action', () => {
                scope.key(scope.keys.enter);
                expect(scope.list[1].action).toHaveBeenCalled();
            });

            it('should trigger scope.close', () => {
                spyOn(scope, 'close');
                scope.key(scope.keys.enter);
                expect(scope.close).toHaveBeenCalled();
            });
        });

        describe('pressing esc key', () => {
            it('should trigger scope.close', () => {
                spyOn(scope, 'close');
                scope.key(scope.keys.esc);
                expect(scope.close).toHaveBeenCalled();
            });
        });
    });

    describe('testing events', () => {
        describe('on keydown', () => {
            it('should call e.PreventDefault if key != 9', () => {
                let dropdown = angular.element(element).children().eq(0);
                let e = <any>{
                    type: 'keydown',
                    keyCode: 10,
                    preventDefault: function () { }
                };

                spyOn(e, 'preventDefault');
                dropdown.triggerHandler(e);
                expect(e.preventDefault).toHaveBeenCalled();
            });
        });

        describe('on focus', () => {
            it('should call open', () => {
                let dropdown = angular.element(element).children().eq(0);
                spyOn(scope, 'open');
                dropdown.triggerHandler('focus');
                expect(scope.open).toHaveBeenCalled();
            });

            it('should not have any offset classes', () => {
                let dropdown = angular.element(element).children().eq(0);
                let list = dropdown.find('ul');
                expect(list.hasClass('off-left')).toBeFalsy();
                expect(list.hasClass('off-right')).toBeFalsy();
            });
        });
    });

});