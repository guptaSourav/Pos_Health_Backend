const {
    getPopularTests
} = require('../Controllers/Test/Test.controller');

const express = require('express');
const router = express.Router();

router.get('/get-popular-test', getPopularTests);


module.exports = router;