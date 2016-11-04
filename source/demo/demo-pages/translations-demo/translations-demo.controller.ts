import * as main from '../../common/main';
import './translations-demo.template';

main.demoControls.push({
    name: 'translations',
    title: 'Translations',
    description: 'Translations',
    hideHtml: true,
    hideScope: true
});

main.module.controller('raetTranslationsDemo', ['$scope', 'raetUiLibraryTranslations',
    ($scope, libraryTranslations: { [language: string]: { [key: string]: string } }) => {
        // define the headers
        let headers = ['Key'];

        let keys: Array<string> = [];
        let languages: Array<string> = [];

        // Every row of the translations table
        $scope.translations = [];

        // collect the languages and keys that are in the library
        for (let libraryLanguage in libraryTranslations) {
            headers.push(libraryLanguage);
            languages.push(libraryLanguage);

            for (let libraryKey in libraryTranslations[libraryLanguage]) {
                if (keys.indexOf(libraryKey) < 0) {
                    keys.push(libraryKey);
                }
            }
        }

        // add each key with translations to the translations table array
        keys.forEach(key => {
            let translationRow = [key];
            languages.forEach(language => {
                if (libraryTranslations[language][key]) {
                    translationRow.push(libraryTranslations[language][key]);
                } else {
                    translationRow.push('');
                }
            });
            $scope.translations.push(translationRow);
        });

        // Define configuration for table
        $scope.configuration = {
            columnDefinition: headers.map((header, index) => {
                return { displayName: header, field: index };
            }),
            emptyTableMessage: 'No translations available in the library',
            pageSize: 100
        };
    }
]);

