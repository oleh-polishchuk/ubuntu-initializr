(() => {

    'use strict';

    angular
        .module('app')
        .service('InstallerService', InstallerService);

    InstallerService.$inject = [ '$http' ];

    function InstallerService($http) {

        function get() {
            console.log('Getting installer list...');
            return $http.get('/api/installer');
        }

        function save(installer) {
            console.log(`Saving installer with name: ${installer.name} and script: ${installer.script}`);
            return $http.post('/api/installer', installer)
        }

        return {
            get: get,
            save: save
        }

    }

})();
