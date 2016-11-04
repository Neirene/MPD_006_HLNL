/// <reference path="../../../typings/globals/angular/index.d.ts" />
import '../../main/index';
export var demoControls = [];
export var module = angular.module('demoApp', ['ngRoute', 'raet-ui'])
    .config(['$routeProvider',
        ($routeProvider) => {
            $routeProvider.
                when('/:control', {
                    templateUrl: (attr) => `demo/demo-pages/${attr.control}-demo/${attr.control}-demo.template.html`
                }).
                otherwise({
                    redirectTo: demoControls[0].name
                });
        }])
    .config(['raetUiTranslationServiceProvider', 'raetUiLibraryTranslations', function (raetUiTranslationServiceProvider, raetUiLibraryTranslations) {
        // If the provider isn't configured, the default language will be en-GB with translations from const('raetUiLibraryTranslations')
        // Example of overriding one translation
        raetUiLibraryTranslations['en-GB']['ToBeOverriden'] = 'The overrided translation';
        // Set the default language to English
        raetUiTranslationServiceProvider.translations = raetUiLibraryTranslations['en-GB'];
    }])
    .controller('demoController', ['$scope', '$route', function ($scope, $route) {
        $scope.$route = $route;
        $scope.controls = demoControls;
        $scope.control = () => {
            if ($route.current) {
                let name = $route.current.params.control;
                for (let i in demoControls) {
                    if (demoControls[i].name == name) {
                        return demoControls[i];
                    }
                }
            }
        };
        $scope.demoScopeProps = () => {
            let props = {};
            if ($route.current) {
                let scope = $route.current.scope.$$childHead;
                for (let prop in scope) {
                    if (prop.indexOf('vm') == 0) {
                        props[prop] = scope[prop];
                    }
                }
            }
            return props;
        };
    }]);