const fs = require('fs');
const express = require('express');
const router = express.Router();
const Installers = require('../db/installers');
const ScriptService = require('../services/script');

router.get('/installer/all', (req, res) => {
    res.send(Installers.getAll())
});

router.get('/script/generate', (req, res) => {
    let installers;
    if (Array.isArray(req.query.id)) {
        installers = Installers.getByIds(req.query.id);
    } else {
        installers = [Installers.getById(req.query.id)];
    }

    let content = ScriptService.generateScript(installers);

    res.header('Content-Disposition', `attachment; filename="${req.query.fileName}.sh"`);
    res.header('Content-Type', 'text/plain');
    res.send(content);
});

module.exports = router;
