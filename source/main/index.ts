"use strict";

import * as main from "../common/main";
import * as format from "../filters/format";
import * as autocomplete from "../controls/autocomplete/autocomplete.directive";
import * as buttonbar from "../controls/button-bar/button-bar.directive";
import * as checkbox from "../controls/checkbox/checkbox.directive";
import * as dropdown from "../controls/dropdown/dropdown.directive";
import * as input from "../controls/input/input.directive";
import * as label from "../controls/label/label.directive";
import * as media from "../controls/media/media.directive";
import * as notification from "../controls/notification/notification.directive";
import * as output from "../controls/output/output.directive";
import * as radiogroup from "../controls/radio-group/radio-group.directive";
import * as select from "../controls/select/select.directive";
import * as _switch from "../controls/switch/switch.directive";
import * as table from "../controls/table/table.directive";
import * as textarea from "../controls/textarea/textarea.directive";

import '../services/library-translations';
import '../services/translation-service';
import '../filters/translate';

let index = {
    "raet-common-main": main,
    "raet-filters-format": format,
    "raet-controls-autocomplete": autocomplete,
    "raet-controls-button-bar": buttonbar,
    "raet-controls-checkbox": checkbox,
    "raet-controls-dropdown": dropdown,
    "raet-controls-input": input,
    "raet-controls-label": label,
    "raet-controls-media": media,
    "raet-controls-notification": notification,
    "raet-controls-output": output,
    "raet-controls-radio-group": radiogroup,
    "raet-controls-select": select,
    "raet-controls-switch": _switch,
    "raet-controls-table": table,
    "raet-controls-textarea": textarea
};

declare let window: { require: (moduleName: string) => any };
window.require = ((_orig_require_) => {
    return (moduleName: string) => {
        if (index && (moduleName in index)) {
            return index[moduleName];
        } else if (_orig_require_) {
            return _orig_require_(moduleName);
        } else {
            throw new Error(`Module ${moduleName} not found.`);
        }
    };
})(window.require);

export = index;