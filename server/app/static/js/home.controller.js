(function () {

    'use strict';

    angular
        .module('app', ['ui.bootstrap'])
        .controller('HomeController', HomeControllerClass);

    HomeControllerClass.$inject = ['$http', '$window'];

    function HomeControllerClass($http, $window) {
        var vm = this;

        vm.fileName = 'install';
        vm.installers = [];
        vm.newInstaller = {};

        vm.getInstallers = getInstallers;
        vm.generateScript = generateScript;
        vm.checkFirst = checkFirst;
        vm.uncheck = uncheck;
        vm.getChecked = getChecked;
        vm.isSomeChecked = isSomeChecked;
        vm.checkDependencies = checkDependencies;
        vm.addScript = addScript;
        vm.isValidInstaller = isValidInstaller;

        activate();

        ////

        function activate() {
            vm.getInstallers(function () {
                vm.checkFirst(vm.installers);
            });
        }

        /**
         * Installers
         */
        function getInstallers(next) {
            $http.get('/api/installer/all').then(function (res) {
                vm.installers = res.data;
                next()
            })
        }

        /**
         * Script
         */
        function generateScript() {
            $window.open('/api/script/generate?fileName=' + vm.fileName + getIDs(), '_blank');
        }

        function getIDs() {
            return vm.getChecked(vm.installers).reduce(function (ids, elem) {
                return ids + '&id=' + elem._id
            }, '');
        }

        ////

        function checkFirst(list) {
            if (Array.isArray(list) && list.length) {
                list[0].checked = true;
            }
        }

        function uncheck(installer) {
            installer.checked = false;
        }

        function getChecked(list) {
            if (!Array.isArray(list)) return false;

            return list.filter(function (elem) {
                return elem.checked
            })
        }

        function isSomeChecked(list) {
            if (!Array.isArray(list)) return false;

            return list.filter(function (elem) {
                return elem.checked
            }).length;
        }

        function checkDependencies(installer, installers) {
            if (installer.dependencies && Array.isArray(installer.dependencies)) {
                installer.dependencies.forEach(function (dependency) {
                    var dependencyInstaller = findDependencyById(dependency._id, installers);
                    if (dependencyInstaller && !dependencyInstaller.checked) {
                        dependencyInstaller.checked = true;
                        checkDependencies(dependencyInstaller, installers);
                    }
                });
            }
        }

        function findDependencyById(id, installers) {
            return installers.find(function (elem) {
                return elem.id === id
            })
        }

        function addScript(newInstaller) {
            $http.post('/api/installer', newInstaller).then((res) => {
                if (res && res.data && res.data.success) {
                    vm.newInstaller = {}
                }
            })
        }

        function isValidInstaller(newInstaller) {
            return newInstaller && newInstaller.name && newInstaller.name.length
                && newInstaller.script && newInstaller.script.length;
        }

    }

})();
