/// <reference path='../../typings/globals/jasmine/index.d.ts' />

import * as main from '../common/main';
declare let window: { require: (moduleName: string) => any };

describe('raet-main-index.', () => {

    it('Require existing module succeeds', () => {
        expect(window.require('raet-common-main')).toEqual(main);
    });

    it('Require non-existing module fails', () => {
        expect(() => { window.require('nonexisting-test-module'); }).toThrow();
    });
});