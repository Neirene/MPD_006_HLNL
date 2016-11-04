import "./translate";

describe("raet-filters-translate.", () => {
    let translate;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(angular.mock.module(['$provide', ($provide: any) => {
        $provide.service('raetUiTranslationService', () => {
            return {
                getTranslation: (key) => {
                    if (key === 'Required') {
                        return 'Verplicht';
                    }
                }
            };
        });
    }]));

    beforeEach(inject(["$filter", (_$filter_) => {
        translate = _$filter_('raetUiTranslate');
    }]));

    it('Has a translated value for key `Required`', () => {
        expect(translate('Required')).toBe('Verplicht');
    });

    it('Has a value with a # an unavailable translation', () => {
        expect(translate('NotAvailable')).toBe('#NotAvailable');
    });
});