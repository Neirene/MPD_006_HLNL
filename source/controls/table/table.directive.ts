import * as main from "../../common/main";
import "./table.controller";
import "./table-add-row.directive";
import "./table-content.directive";
import "./table-temporal-row.directive";
import "./table.template";

main.module.directive('raetTable', () => {
    return {
        bindToController: {
            configuration: '=configuration',
            data: '=source',
            footer: '=footer',
            raetId: "@"
        },
        controller: "RaetTableController",
        controllerAs: "vm",
        restrict: 'E',
        scope: {
            textShowAll: "@",
            textShowLess: "@"
        },
        templateUrl: 'controls/table/table.template.html'
    };
});