const { Router } = require('express');
const router = Router();

const { renderIndex } = require('../controllers/pages.controller');

router.get('/', renderIndex);

module.exports = router;