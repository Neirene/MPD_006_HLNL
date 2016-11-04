/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as types from "./IselectOption";
import * as select from "./select.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-select.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('select module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-select')).toEqual(select);
    });

});