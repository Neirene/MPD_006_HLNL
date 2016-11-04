import * as main from "../../common/main";
import "./dropdown-demo.template";

main.demoControls.push(
    {
        name: "dropdown",
        title: "Dropdown",
        description: "Dropdown control"
    });

export class RaetDropdownDemo {
    private list: any;

    constructor() {
        this.list = [
            { text: 'Option 1', action: this.test },
            { text: 'Option 2', action: this.test },
            { text: 'Options with a lot of text will move to the next line to always be visible', action: this.test },
            { text: 'Option 4', action: this.test },
            { text: 'Option with a different action', action: this.test1 },
            { text: 'Option 6', action: this.test }
        ];
    }

    private test() {
        alert('This is a possible action!');
    }
    private test1() {
        confirm('Do you like this component? :)');
    }
}

main.module.controller('raetDropdownDemo', RaetDropdownDemo);