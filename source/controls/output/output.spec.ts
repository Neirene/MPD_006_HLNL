/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as output from "./output.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-output.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('output module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-output')).toEqual(output);
    });

    it('exists after compile', () => {
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile(`<raet-output></raet-output>`)($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
    });
});