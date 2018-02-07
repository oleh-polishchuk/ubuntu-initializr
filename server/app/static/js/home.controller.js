(function () {

    'use strict';

    angular
        .module('app', [ 'ui.bootstrap' ])
        .controller('HomeController', HomeControllerClass);

    HomeControllerClass.$inject = [ '$http', '$window', 'InstallerService' ];

    function HomeControllerClass($http, $window, InstallerService) {
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
        vm.save = save;
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
            InstallerService.get().then(res => {
                if (res && res.data && res.data.success) {
                    const response = res.data.data;
                    console.log(`Successfully received ${response.installers.length} installers`);
                    vm.installers = res.data.data.installers;
                    next();
                }
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
                list[ 0 ].checked = true;
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

        function save(installer) {
            InstallerService.save(installer)
                .then(res => {
                    if (res && res.data && res.data.success) {
                        console.log(`Successfully saved installer with id: ${res.data.data.installer._id}`);
                        vm.newInstaller = {};
                        vm.getInstallers(() => {
                            vm.checkFirst(vm.installers);
                        });
                    }
                })
                .catch(err => console.error(err));
        }

        function isValidInstaller(newInstaller) {
            return newInstaller && newInstaller.name && newInstaller.name.length
                && newInstaller.script && newInstaller.script.length;
        }

    }

})();
