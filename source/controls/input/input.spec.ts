/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as input from "./input.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-input.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('input module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-input')).toEqual(input);
    });

    it('input element contains the appropriate content', () => {
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile("<raet-input ng-model=\"sample\"></raet-input>")($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
        // Check that the compiled element contains the templated content
        expect(element[0].querySelectorAll("input[type=text]").length).toEqual(1);
    });
});
