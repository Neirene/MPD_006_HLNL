/// <reference path='../../typings/globals/jasmine/index.d.ts' />

import * as main from './main';

describe('raet-common-main.', () => {

    it('Angular module name is "raet-ui"', () => {
        let module = main.module;
        expect(module.name).toEqual('raet-ui');
    });
});