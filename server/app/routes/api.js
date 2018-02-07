const express = require('express'),
    router = express.Router();

const ScriptService = require('../services/script.service'),
    ErrorConstants = require('../constants/error.constats'),
    InstallerService = require('../services/installer.service'),
    ResponseService = require('../services/response.service');

router.get('/installer', (req, res) => {
    InstallerService.getAll((err, installers) => {
        if (err) {
            return ResponseService.error(res, err);
        }

        ResponseService.success(res, {
            installers: installers
        });
    })
});

router.post('/installer', (req, res) => {
    if (!req.body || !req.body.name || !req.body.script) {
        return ResponseService.error(res, ErrorConstants.INSTALLER_SAVE_ERROR_MESSAGE);
    }

    InstallerService.save(req.body, (err, installer) => {
        if (err) {
            return ResponseService.error(res, err);
        }

        ResponseService.success(res, {
            installer: installer
        });
    })
});

router.get('/script/download', (req, res) => {
    if (!req.query.id) {
        return ResponseService.error(res, ErrorConstants.SCRIPT_DOWNLOAD_ERROR_MESSAGE);
    }

    let ids = Array.isArray(req.query.id) ? req.query.id : [ req.query.id ];

    InstallerService.getByIds(ids, (err, installers) => {
        let content = ScriptService.generateScript(installers);

        res.header('Content-Disposition', `attachment; filename="${req.query.fileName}.sh"`);
        res.header('Content-Type', 'text/plain');
        res.send(content);
    });
});

module.exports = router;
