/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
/// <reference path="../../../typings/globals/angular-mocks/index.d.ts" />

import * as table from "./table.directive";
declare var window: { require: (moduleName: string) => any };

describe("raet-controls-table.", () => {
    let $compile, $rootScope;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$compile", "$rootScope", (_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }]));

    it('table module is included in the bundle (exposed with window.require)', () => {
        expect(window.require('raet-controls-table')).toEqual(table);
    });

    it('table element contains the appropriate content', () => {
        let configuration = $rootScope.configuration = {
            columnDefinition: [{
                displayName: 'index',
                field: 'index'
            }, {
                displayName: 'name',
                field: 'name'
            }],
            emptyTableMessage: 'No items to show',
            pageSize: 3,
            initialSort: 'name'
        };
        let source = $rootScope.source = [];
        let data = Array(50);
        for (let i = 1; i < data.length + 1; i++) {
            source.push({
                    index: i,
                    name: `Item #${i}`
                });
        }
        // Compile a piece of HTML containing the component
        let element: HTMLElement[] = $compile("<raet-table data-configuration='configuration' data-source='source'></raet-table>")($rootScope);
        $rootScope.$digest();
        // Check that there is one compiled element
        expect(element.length).toEqual(1);
        // Check that the compiled element contains the templated content
        expect(element[0].querySelectorAll("tbody td").length).toEqual(data.length * configuration.columnDefinition.length);

        let $colHeader = angular.element(element[0].querySelectorAll("thead th:first-child raet-table-content"));
        $colHeader.triggerHandler("click");
        $rootScope.$digest();
        expect(angular.element(element[0].querySelectorAll("tbody tr:first-child td")[0]).text().trim())
            .toEqual(source[0].index.toString());

        $colHeader.triggerHandler("click");
        $rootScope.$digest();
        expect(angular.element(element[0].querySelectorAll("tbody tr:first-child td")[0]).text().trim())
            .toEqual(source[source.length - 1].index.toString());

        expect(element[0].querySelectorAll("tfoot td").length).toEqual(1);  // 'show all' button
        $rootScope.source.splice(5);
        $rootScope.configuration.pageSize = 5;
        $rootScope.$digest();
        expect(element[0].querySelectorAll("tfoot td").length).toEqual(0);  // no 'show all' button
        $rootScope.configuration.pageSize = 3;
        $rootScope.$digest();
        expect(element[0].querySelectorAll("tfoot td").length).toEqual(1);  // 'show all' button

        (<any>angular.element(element[0].querySelectorAll("tbody tr:first-child")[0]).scope()).showTemporality();
        $rootScope.$digest();
    });
});