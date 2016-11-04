/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import {IRadioGroupOption} from "./IRadioGroupOption";
import * as radiogroup from "./radio-group.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-radiogroup.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('radiogroup module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-radio-group')).toEqual(radiogroup);
    });

    it('radiogroup element contains the appropriate content', () => {
        $rootScope.options = <IRadioGroupOption[]>[
            {
                text: "Option A",
                val: false
            },
            {
                text: "Option B",
                val: true
            },
            {
                text: "Option C",
                val: "c"
            }];
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile("<raet-radio-group data-options='options'></raet-radio-group>")($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
        // Check that the compiled element contains the templated content
        expect(element[0].querySelectorAll("input[type=radio]").length).toEqual($rootScope.options.length);
    });
});