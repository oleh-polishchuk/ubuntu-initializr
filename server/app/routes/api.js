const express = require('express'),
    router = express.Router();

const ScriptService = require('../services/script.service'),
    InstallerService = require('../services/installer.service');

router.get('/installer', (req, res) => {
    InstallerService.getAll((err, installers) => {
        if (err) {
            console.error(err);
            res.status(500).send(err)
        }

        res.send({
            success: true,
            data: {
                installers: installers
            }
        })
    })
});

router.post('/installer', (req, res) => {
    if (!req.body || !req.body.name || !req.body.script) {
        console.error('Installer or field name or script not exist.');
        return res
            .status(500)
            .send('Installer or field name or script not exist.')
    }

    InstallerService.save(req.body, (err, installer) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .send(err);
        }

        res.send({
            success: true,
            data: {
                installer: installer
            }
        })
    })
});

router.get('/script/generate', (req, res) => {
    let ids = Array.isArray(req.query.id) ? req.query.id : [req.query.id];

    InstallerService.getByIds(ids, (err, installers) => {
        let content = ScriptService.generateScript(installers);

        res.header('Content-Disposition', `attachment; filename="${req.query.fileName}.sh"`);
        res.header('Content-Type', 'text/plain');
        res.send(content);
    });
});

module.exports = router;
