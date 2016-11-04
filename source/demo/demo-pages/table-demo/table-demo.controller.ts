import * as main from "../../common/main";
import "./table-demo.template";

main.demoControls.push({
    name: "table",
    title: "Table",
    description: "Table control"
});

main.module.controller('raetTableDemo', ['$scope', ($scope) => {

    $scope.vmConfiguration = {
        columnDefinition: [{
            displayName: 'index',
            field: 'index'
        }, {
            displayName: 'name',
            field: 'name'
        }],
        emptyTableMessage: 'There are no items yet.',
        pageSize: 3,
        initialSort: 'name'
    };

    $scope.vmFooter = ['Totals', 4];

    let data = Array(10);
    let vmData = $scope.vmData = [];
    for (let i = 1; i < data.length + 1; i++) {
        vmData.push({
            index: i,
            name: `Item #${i}`
        });
    }

    $scope.vmEmpty = [];
}]);