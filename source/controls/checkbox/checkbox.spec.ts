/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as checkbox from "./checkbox.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-checkbox.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('checkbox module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-checkbox')).toEqual(checkbox);
    });

    it('checkbox element contains the appropriate content', () => {
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile("<raet-checkbox></raet-checkbox>")($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
        // Check that the compiled element contains the templated content
        expect(element[0].querySelectorAll("input[type=checkbox]").length).toEqual(1);
    });
});