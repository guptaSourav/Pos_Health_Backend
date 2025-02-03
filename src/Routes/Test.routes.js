const {
    getPopularTests,
    getAllTest
} = require('../Controllers/Test/Test.controller');

const express = require('express');
const router = express.Router();

router.get('/get-popular-test', getPopularTests);
router.get('/get-all-test', getAllTest);

module.exports = router;