import * as main from '../common/main';
import { IRaetUiLibraryTranslations } from './library-translations';

export interface IRaetUiTranslationService {
    getTranslation(key: string): string;
}

export class RaetUiTranslationService implements ng.IServiceProvider {
    public language: 'en-GB';
    public translations: { [key: string]: string };

    static $inject = ['raetUiLibraryTranslations'];
    constructor(raetUiLibraryTranslations: IRaetUiLibraryTranslations) {
        this.translations = raetUiLibraryTranslations['en-GB'];
    }

    $get(): IRaetUiTranslationService {
        let service = {
            getTranslation: (key): string => {
                return this.translations[key];
            }
        };
        return service;
    };
}

main.module.provider('raetUiTranslationService', RaetUiTranslationService);
