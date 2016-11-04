/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as textarea from "./textarea.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-textarea.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('Textarea module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-textarea')).toEqual(textarea);
    });

    it('Textarea element contains the appropriate content', () => {
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile("<raet-textarea></raet-textarea>")($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
        // Check that the compiled element contains the templated content
        expect(element[0].getElementsByTagName("textarea").length).toEqual(1);

        let countElements = element[0].getElementsByTagName("em");
        expect(countElements.length).toEqual(0);
    });

    it('Textarea element with attributes contains the appropriate content', () => {
        // Compile a piece of HTML containing the component
        let max = '5';
        let element: HTMLElement[] = $compile(`<raet-textarea max='${max}'\
            text-characters="{0} *chars*">\</raet-textarea>`)($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
        // Check that the compiled element contains the templated content
        expect(element[0].getElementsByTagName("textarea").length).toEqual(1);

        let countElements = element[0].getElementsByClassName("textarea__max");
        expect(countElements.length).toEqual(1);
        expect(countElements[0].innerHTML).toEqual(`<em>${max}</em> *chars*`);
    });
});