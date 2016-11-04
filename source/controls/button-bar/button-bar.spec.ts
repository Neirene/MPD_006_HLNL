/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as buttonbar from "./button-bar.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-buttonbar.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('buttonbar module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-button-bar')).toEqual(buttonbar);
    });

    it('buttonbar element contains the appropriate content', () => {
        $rootScope.options = [
            {
                icon: "male",
                val: "a"
            },
            {
                icon: "female",
                val: "b"
            },
            {
                icon: "child",
                val: "c"
            }];
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile("<raet-button-bar data-options='options'></raet-button-bar>")($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
        // Check that the compiled element contains the templated content
        expect(element[0].querySelectorAll("input[type=radio]").length).toEqual($rootScope.options.length);
    });
});