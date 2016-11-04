import * as main from '../common/main';
import { IRaetUiTranslationService } from '../services/translation-service';

translateFilter.$inject = ['raetUiTranslationService'];
function translateFilter(raetUiTranslationService: IRaetUiTranslationService) {
    return (key: string) => {
        return raetUiTranslationService.getTranslation(key) || `#${key}`;
    };
}

main.module.filter('raetUiTranslate', translateFilter);
