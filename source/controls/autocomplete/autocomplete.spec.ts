/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as autocomplete from "./autocomplete.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-autocomplete.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('Autocomplete module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-autocomplete')).toEqual(autocomplete);
    });

    it('Autocomplete element contains the appropriate content', () => {
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile("<raet-autocomplete></raet-autocomplete>")($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
        // Check that the compiled element contains the templated content
        expect(element[0].getElementsByTagName("input").length).toEqual(1);
    });

    it('Autocomplete element with attributes contains the appropriate content', () => {
        // Compile a piece of HTML containing the component
        let vmValue1 = "value_1";
        let vmText1 = "text 1";
        let vmValue2 = "value_2";
        let vmText2 = "text 2";

        $rootScope.vmValue = vmValue2;

        let element: HTMLElement[] = $compile(`<raet-autocomplete data-ng-model="vmValue"
            data-options-list="[
                    {id: '${vmValue1}', name: '${vmText1}'},
                    {id: '${vmValue2}', name: '${vmText2}'}]"></raet-autocomplete>`)($rootScope);
        $rootScope.$digest();

        // Check that there is one compiled element
        expect(element.length).toEqual(1);

        // Check that the compiled element contains the templated content
        let inputs: NodeListOf<HTMLInputElement> = element[0].getElementsByTagName("input");
        expect(inputs.length).toEqual(1);

        let input = inputs[0];
        expect(input.value).toEqual(vmText2);

        // Check that the input gets updated with a change in the model
        $rootScope.vmValue = vmValue1;
        $rootScope.$digest();
        expect(input.value).toEqual(vmText1);
    });
});

describe("raet-controls-autocomplete-controller.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    let vmValue1 = "value_1";
    let vmText1 = "1 text";
    let vmValue2 = "value_2";
    let vmText2 = "2 text";

    let element: HTMLElement;
    let $element: JQuery;
    let $input: JQuery;
    let $controller: ng.IComponentController;

    beforeEach(() => {
        let elements: HTMLElement[] = $compile(`<raet-autocomplete data-ng-model="vmValue"
            data-options-list="[
                    {id: '${vmValue1}', name: '${vmText1}'},
                    {id: '${vmValue2}', name: '${vmText2}'}]"></raet-autocomplete>`)($rootScope);
        $rootScope.$digest();

        // Check that there is one compiled element
        expect(elements.length).toEqual(1);

        element = elements[0];
        $element = angular.element(element);

        // Check that the compiled element contains the templated content
        let inputs: NodeListOf<HTMLInputElement> = element.getElementsByTagName("input");
        expect(inputs.length).toEqual(1);
        $input = angular.element(inputs[0]);
        let $scope = $input.scope();
        $controller = $scope['vm'];
        expect($controller).toBeDefined();
    });


    it('Autocomplete list open/close', () => {
        spyOn($controller, "open").and.callThrough();
        spyOn($controller, "close").and.callThrough();

        $input.triggerHandler('focus');
        expect($controller['open']).toHaveBeenCalled();
        expect($controller['open'].calls.count()).toEqual(1);
        expect($controller['close'].calls.count()).toEqual(0);
        $rootScope.$digest();
        expect($controller['isHidden']).toBeFalsy();

        $input.triggerHandler('blur');
        expect($controller['open'].calls.count()).toEqual(1);
        expect($controller['close'].calls.count()).toEqual(1);
        $rootScope.$digest();
        expect($controller['isHidden']).toBeTruthy();

        $input.triggerHandler('focus');
        expect($controller['open'].calls.count()).toEqual(2);
        expect($controller['close'].calls.count()).toEqual(1);
        $rootScope.$digest();
        expect($controller['isHidden']).toBeFalsy();

        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 27});  // ESC
        expect($controller['open'].calls.count()).toEqual(2);
        expect($controller['close'].calls.count()).toEqual(2);
        $rootScope.$digest();
        expect($controller['isHidden']).toBeTruthy();
    });

it('Autocomplete list navigate/select/reset', () => {
        $input.triggerHandler('focus');
        $rootScope.$digest();
        expect($controller['isHidden']).toBeFalsy();
        expect($controller['lastActive']).toBe(-1);

        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 38});  // UP
        $rootScope.$digest();
        expect($controller['lastActive']).toBe(-1);

        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 40});  // DOWN
        $rootScope.$digest();
        expect($controller['lastActive']).toBe(0);

        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 40});  // DOWN
        $rootScope.$digest();
        expect($controller['lastActive']).toBe(1);

        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 38});  // UP
        $rootScope.$digest();
        expect($controller['lastActive']).toBe(0);

        expect($controller['tmpList'].length).toBe(2);
        $controller['val'] = '2';
        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 50});  // '2'
        $rootScope.$digest();
        expect($controller['tmpList'].length).toBe(1);

        // ENTER without a selection
        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 13});  // ENTER
        $element.triggerHandler(<any>{ type: 'keypress', keyCode: 13 });
        $rootScope.$digest();
        expect($controller['isHidden']).toBeFalsy();
        expect($controller['val']).toBe('2');
        expect($controller['ngModel']).not.toBe(vmValue2);

        // select
        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 40});  // DOWN
        $element.triggerHandler(<any>{ type: 'keypress', keyCode: 40 });
        $rootScope.$digest();
        expect($controller['lastActive']).toBe(0);

        // ENTER with a selection
        $input.triggerHandler(<any>{ type: 'keyup', keyCode: 13});  // ENTER
        $element.triggerHandler(<any>{ type: 'keypress', keyCode: 13 });
        $rootScope.$digest();
        expect($controller['isHidden']).toBeTruthy();
        expect($controller['val']).toBe(vmText2);
        expect($controller['ngModel']).toBe(vmValue2);

        let reset = element.querySelector('.raet-autocomplete__reset');
        angular.element(reset).triggerHandler('click');
        $rootScope.$digest();
        expect($controller['val']).toBe('');
    });
});