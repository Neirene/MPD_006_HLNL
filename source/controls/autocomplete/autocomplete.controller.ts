import {IAutocompleteOption} from "./IAutocompleteOption";
import * as main from "../../common/main";

export class AutocompleteController {

    static $inject = ["$scope", "$sce"];

    ngModel: any;
    error: string;
    val: string;
    optionsList: IAutocompleteOption[];
    tmpList: IAutocompleteOption[];
    lastActive: number;
    isHidden: string;
    keys: any;
    raetId: any;

    constructor(private $scope: any, private $sce: any) {

        this.val = "";
        this.tmpList = [];
        this.lastActive = -1;
        this.isHidden = "is-hidden";
        this.keys = {
            up: 38,
            down: 40,
            enter: 13,
            esc: 27
        };
    }

    init() {
        if (this.ngModel && this.optionsList) {
            let filteredSrc = this.optionsList.filter((option: IAutocompleteOption) => option.id == this.ngModel);
            if (filteredSrc) {
                this.select(filteredSrc[0]);
            }
        }
    }

    open() {
        this.isHidden = "";
        this.search();
    }

    close() {
        this.isHidden = "is-hidden";
        this.deactivate(this.lastActive);
    }

    change() {
        this.error = undefined;
        let filteredName = this.tmpList.filter((option: IAutocompleteOption) => option.name.toLowerCase() == this.val.toLowerCase());
        if (filteredName.length > 0) {
            this.val = filteredName[0].name;
            this.ngModel = filteredName[0].id;
        }
    }

    key(keyPressed: number) {
        switch (keyPressed) {
            case (this.keys.up):
                this.activate(this.lastActive - 1);
                break;
            case (this.keys.down):
                this.activate(this.lastActive + 1);
                break;
            case (this.keys.enter):
                if (this.tmpList[this.lastActive]) {
                    this.select(this.tmpList[this.lastActive]);
                }
                break;
            case (this.keys.esc):
                this.reset();
                this.close();
                break;
            default:
                this.open();
                this.search();
        }
    }

    search() {
        this.deactivate(this.lastActive);
        this.tmpList = [];

        for (let i in this.optionsList) {
            let obj = this.optionsList[i];
            let name = obj.name;
            let input = this.val || '';

            if (name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                if (input.length > 0) {
                    input = input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                    let re = new RegExp(input, 'ig');
                    let match = name.match(re);
                    let highlight: string;

                    for (let y in match) {
                        let found = match[y];
                        highlight = name.replace(found, "<em>" + found + "</em>");
                    }

                    obj.highlight = this.$sce.trustAsHtml(highlight);
                } else {
                    obj.highlight = this.$sce.trustAsHtml(name);
                }

                this.tmpList.push(obj);
            }
        }
    }

    select(obj) {
        this.ngModel = obj.id;
        this.val = obj.name;
        this.close();
    }

    activate(idx: number) {
        if (idx >= 0 && idx < this.tmpList.length) {
            this.deactivate(this.lastActive);
            this.tmpList[idx].active = "active";
            this.lastActive = idx;
        }
    }

    deactivate(idx: number) {
        this.lastActive = -1;

        if (this.tmpList[idx]) {
            this.tmpList[idx].active = "";
        }
    }

    reset() {
        this.ngModel = undefined;
        this.val = "";
        this.change();
        this.$scope.setFocus();
    }
}

main.module.controller("RaetAutocompleteController", AutocompleteController);
