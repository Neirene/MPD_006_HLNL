import * as main from "../../common/main";
import { ISelectOption } from "../select/ISelectOption";

export enum ColumnDefinitionActionTypes {
    Add = <any>'add',
    Remove = <any>'remove'
}

export interface ITableCustomActionDefinition {
    displayName: string;
    callback: () => {};
}

export interface ITableColumnDefinition {
    field: string;
    displayName: string;
    hideColumn: boolean;
    disableSorting: boolean;
    textBefore: string;
    textAfter: string;
    headerFilter: string;
    cellFilter: string;
    cellTemplate: string;

    // The next two attributes will add a new column at the end of the table to add a '+' or 'x' buttons with the custom behaviour
    // posible values for action are ColumnDefinitionActionTypes
    action: ColumnDefinitionActionTypes;
    actionCallback: any;

    // Add behaviours that are needed inside the custom templates
    customCallbacks: any;
}

export interface ITableConfiguration {
    pageSize: number;
    systemSort: string[];
    initialSort: string;
    emptyTableMessage: string;
    columnDefinition: ITableColumnDefinition[];
    clickOnRowCallback: any;
    footerActions: ITableCustomActionDefinition[];
}

export class TableController {

    public static SORT_ASSCENDING = 'ascending';
    public static SORT_DESCENDING = 'descending';
    public static SORT_NONE = 'none';

    static $inject = ['$scope'];

    configuration: ITableConfiguration;
    data: any[];
    footer: any[];

    ariaSortCriteriaDictionary: any;

    orderByFieldsOptions: ISelectOption[];
    orderedByFields: string[];
    pageSize: number;
    visibleRows: number;

    hasClickOnRowCallback: boolean;

    constructor(private $scope) {

        this.visibleRows = this.configuration.pageSize;

        this.listenForConfigurationChanges();

        this.listenForOrderFieldsChanges();

        this.listenForDataChanges();
    }

    private listenForConfigurationChanges() {
        this.$scope.$watch(() => this.configuration, (newConfiguration: ITableConfiguration) => {
            this.hasClickOnRowCallback = (newConfiguration.clickOnRowCallback) ? true : false;
            this.initOrderByDropdownOptions();
            this.initAriaSortCriteriaDictionary();
            this.initOrderByFields();
        }, true);
    }

    private listenForOrderFieldsChanges() {
        this.$scope.$watch(() => this.orderedByFields[0], (newValue, oldValue) => {
            if (newValue !== oldValue) {

                let field: string,
                    ascending: boolean;

                if (!newValue) {
                    field = '';
                } else if (newValue[0] === '-') {
                    field = this.cleanSortingPrefix(newValue);
                    ascending = false;
                } else {
                    field = newValue;
                    ascending = true;
                }

                this.setAriaSortAttribute(field, ascending);
            }
        }, true);
    }

    private listenForDataChanges() {
        this.$scope.$watch(() => this.data, () => {

            if (this.isShowLessButtonDisplayed()) {
                this.visibleRows = this.data.length;
            }

        }, true);
    }

    private initOrderByFields() {
        this.orderedByFields = [];

        if (this.configuration.initialSort) {
            this.orderBy(this.configuration.initialSort);
            this.setAriaSortAttribute(this.configuration.initialSort, true);
        }

        if (this.configuration.systemSort && this.configuration.systemSort.length) {
            this.orderedByFields = this.orderedByFields.concat(this.configuration.systemSort);
        }
    }

    private setAriaSortAttribute(field: string, ascending?: boolean) {

        field = this.cleanSortingPrefix(field);

        Object.getOwnPropertyNames(this.ariaSortCriteriaDictionary).forEach((name: string) => {
            if (name !== field) {
                this.ariaSortCriteriaDictionary[name] = TableController.SORT_NONE;
            } else {
                if (ascending === true) {
                    this.ariaSortCriteriaDictionary[name] = TableController.SORT_ASSCENDING;
                } else if (ascending === false) {
                    this.ariaSortCriteriaDictionary[name] = TableController.SORT_DESCENDING;
                }
            }
        });
    }

    getDisplayedColumnDefinitions(): ITableColumnDefinition[] {
        return this.configuration.columnDefinition.filter((item: ITableColumnDefinition) => {
            return !item.hideColumn;
        });
    }

    orderBy(field: string): void {
        if (!this.orderedByFields.length) {
            this.orderedByFields.push(field);
        } else {

            if (this.orderedByFields[0] === field) {
                this.orderedByFields[0] = this.transformToDescendingField(field);
            } else {
                this.orderedByFields[0] = field;
            }
        }
    }

    generateUniqueId(customId: string): string {
        return this.$scope.$id + customId;
    }

    initOrderByDropdownOptions() {
        this.orderByFieldsOptions = [];

        this.getDisplayedColumnDefinitions()
            .filter((columnDef: ITableColumnDefinition) => {
                return !columnDef.disableSorting;
            })
            .forEach((columnDef: ITableColumnDefinition) => {
                this.orderByFieldsOptions.push(<ISelectOption>{
                    id: columnDef.field,
                    name: columnDef.displayName
                });
                this.orderByFieldsOptions.push(<ISelectOption>{
                    id: this.transformToDescendingField(columnDef.field),
                    name: `${columnDef.displayName} Desc`
                });
            });
    }

    initAriaSortCriteriaDictionary() {
        this.ariaSortCriteriaDictionary = {};

        this.getDisplayedColumnDefinitions().forEach((columnDef: ITableColumnDefinition) => {
            if (!columnDef.disableSorting) {
                this.ariaSortCriteriaDictionary[columnDef.field] = TableController.SORT_NONE;
            }
        });
    }

    isTableEmpty(): boolean {
        return !this.data || this.data.length <= 0;
    }

    isShowAllButtonDiplayed() {
        if (!this.data) return false;

        return (this.visibleRows < this.data.length && !this.isShowLessButtonDisplayed()) ? true : false;
    }

    isShowLessButtonDisplayed() {
        if (!this.data) return false;

        return (this.visibleRows > this.configuration.pageSize && this.configuration.pageSize < this.data.length) ? true : false;
    }

    isFooterDisplayed() {
        if (this.isTableEmpty()) return false;

        return !!this.footer;
    }

    private transformToDescendingField(field: string) {
        return `-${field}`;
    }

    private cleanSortingPrefix(field: string) {
        return (field[0] === '-') ? field.substr(1) : field;
    }
}

main.module.controller("RaetTableController", TableController);