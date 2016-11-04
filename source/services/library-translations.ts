import * as main from '../common/main';

export interface IRaetUiLibraryTranslations {
    [language: string]: { [key: string]: string };
}

main.module.constant('raetUiLibraryTranslations', {
    'en-GB': {
        'NotSpecified': 'Not specified',
        'Previous': 'Previous',
        'ShowAll': 'Show All',
        'ShowLess': 'Show Less',
        'characterCount': '{0} character',
        'charactersCount': '{0} characters'
    },
    'nl-NL': {
        'NotSpecified': 'Niet gespecificeerd',
        'Previous': 'Vorige',
        'ShowAll': 'Toon alles',
        'ShowLess': 'Toon minder',
        'characterCount': '{0} karakter',
        'charactersCount': '{0} karakters'
    }
});
