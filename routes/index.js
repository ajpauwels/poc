// Third-party libs
const express = require('express');

// Get the express router
const router = express.Router();

router.get('/', (req, res) => {
	const css = 'p { font-size: 18px; }';

	res.render('index', { css });
});

module.exports = router;
