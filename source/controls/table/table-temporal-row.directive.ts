import * as main from "../../common/main";

main.module.directive('raetTemporalRow', () => {
    return {
        restrict: 'A',
        scope: {
            data: "=raetTemporalDataRowDirective"
        },
        template: `
            <div style="width: 100%; background: #b1c6e8; padding: 30px; text-align: center;">
                TEMPORAL -> {{data.shortName}}
            </div>                                                    
        `
    };
});