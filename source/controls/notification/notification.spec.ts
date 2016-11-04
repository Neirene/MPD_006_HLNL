/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as notification from "./notification.directive";
declare var window: { require: (moduleName: string) => any };

describe('raet-controls-notification.', () => {

    let $compile,
        $rootScope,
        element,
        scope,
        controller;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        element = $compile(`<raet-notification></raet-notification>`)($rootScope);
        $rootScope.$digest();
        scope = element.isolateScope();
        controller = scope.vm;
    }]));

    it('module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-dropdown')).toEqual(notification);
    });

    it('exists after compile', () => {
        expect(element.length).toEqual(1);
    });

    describe('calling init', () => {
        it('icon should be check if mode success', () => {
            controller.mode = 'success';
            controller.init();
            expect(controller.icon).toBe('check');
        });

        it('icon should be exclamation if mode error', () => {
            controller.mode = 'error';
            controller.init();
            expect(controller.icon).toBe('exclamation');
        });

        it('icon should be lightbulb-o if mode notification', () => {
            controller.mode = 'notification';
            controller.init();
            expect(controller.icon).toBe('lightbulb-o');
        });

        it('icon should be lightbulb-o if mode is undefined', () => {
            controller.mode = undefined;
            controller.init();
            expect(controller.icon).toBe('lightbulb-o');
        });
    });

    describe('calling close', () => {
        it('isVisible should be empty', () => {
            controller.close();
            expect(controller.isVisible).toBe('');
        });
    });
});