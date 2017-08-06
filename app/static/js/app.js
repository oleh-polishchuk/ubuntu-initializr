(function () {

    'use strict';

    angular
        .module('app', [])
        .controller('HomeController', HomeControllerClass);

    HomeControllerClass.$inject = ['$http', '$window'];
    function HomeControllerClass($http, $window) {
        let vm = this;

        vm.fileName = 'install';
        vm.installers = [];

        vm.getInstallers = getInstallers;
        vm.generateScript = generateScript;
        vm.checkFirst = checkFirst;
        vm.uncheck = uncheck;
        vm.getChecked = getChecked;
        vm.isSomeChecked = isSomeChecked;

        activate();

        ////

        function activate() {
            vm.getInstallers(() => {
                vm.checkFirst(vm.installers);
            });
        }

        /**
         * Installers
         */
        function getInstallers(next) {
            $http.get('/api/installer/all').then((res) => {
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
            return vm.getChecked(vm.installers).reduce((ids, elem) => {
                return ids + '&id=' + elem.id
            }, '');
        }

        ////

        function checkFirst(list) {
            list[0].checked = true;
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

            return list.filter((elem) => {
                return elem.checked
            }).length;
        }
    }

})();
