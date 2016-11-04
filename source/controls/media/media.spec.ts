/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as input from "./media.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-media.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-media')).toEqual(input);
    });

    it('exists after compile', () => {
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile("<raet-media></raet-media>")($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
    });
});